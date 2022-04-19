from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session

from database import UserRead, UserCreate, get_session
from auth_token import create_access_token, Token
from hashing import Hash
from crud.users import create_user_db, get_user


router = APIRouter(
    tags=["authentication"],
)


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(*, session: Session = Depends(get_session), user: UserCreate):
    try:
        _ = get_user(session, user.email)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    user.password = Hash.bcrypt(user.password)
    try:
        user = create_user_db(session, user)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return user


@router.post(
    "/login",
    response_description="Login into API",
    status_code=status.HTTP_202_ACCEPTED,
    response_model=Token,
)
async def login(
    *,
    session: Session = Depends(get_session),
    request: OAuth2PasswordRequestForm = Depends()
):
    try:
        user = get_user(session, request.username)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    if not Hash.verify(user.password, request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect password"
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
