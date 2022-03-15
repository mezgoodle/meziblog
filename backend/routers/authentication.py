from fastapi import APIRouter, HTTPException, Depends, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select, Session

from database import User, UserRead, UserCreate, get_session
from auth_token import create_access_token, Token
from hashing import Hash

from datetime import datetime

router = APIRouter(
    tags=["authentication"],
)


@router.post("/register", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(*, session: Session = Depends(get_session), user: UserCreate):
    statement = select(User).where(User.email == user.email)
    results = session.exec(statement)
    user_db = results.first()
    if user_db:
        raise HTTPException(
            status_code=404, detail="User with the email is already registred"
        )
    user.password = Hash.bcrypt(user.password)
    db_user = User.from_orm(user)
    setattr(db_user, "created_at", datetime.utcnow())
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


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
    statement = select(User).where(User.email == request.username)
    results = session.exec(statement)
    user = results.first()
    if not user:
        raise HTTPException(status_code=404, detail="User has not found")
    if not Hash.verify(user.password, request.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Incorrect password"
        )
    access_token = create_access_token(data={"sub": user.email})
    return {"access_token": access_token, "token_type": "bearer"}
