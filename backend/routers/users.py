from fastapi import APIRouter, HTTPException, Depends, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select
from pydantic import EmailStr

from database import UserCreate, UserRead, User, UserUpdate, get_session
from auth_token import create_access_token
from hashing import Hash

from typing import List


router = APIRouter(
    prefix='/user',
    tags=['users'],
)


@router.post('/register', response_model=UserRead)
def create_user(*, session: Session = Depends(get_session), user: UserCreate):
    user.password = Hash.bcrypt(user.password)
    db_user = User.from_orm(user)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@router.post('/login', response_description='Login into API',
             status_code=status.HTTP_202_ACCEPTED)
async def login(*, session: Session = Depends(get_session), request: OAuth2PasswordRequestForm = Depends()):
    statement = select(User).where(User.name == request.username)
    results = session.exec(statement)
    user = results.first()
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Incorrect password')
    access_token = create_access_token(data={"sub": user.email})
    return {'access_token': access_token, 'token_type': 'bearer', 'email': user.email}


@router.get("s", response_model=List[UserRead])
async def read_users(*, session: Session = Depends(get_session), offset: int = 0, limit: int = Query(default=100, lte=100)):
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users


@router.get("/{user_email}", response_model=UserRead)
async def read_user(*, session: Session = Depends(get_session), user_email: EmailStr):
    statement = select(User).where(User.email == user_email)
    results = session.exec(statement)
    user = results.first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user


@router.patch("/{user_email}", response_model=UserRead)
async def update_post(*, session: Session = Depends(get_session), user_email: EmailStr, user: UserUpdate):
    statement = select(User).where(User.email == user_email)
    results = session.exec(statement)
    db_user = results.first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    user_data = user.dict(exclude_unset=True)
    for key, value in user_data.items():
        setattr(db_user, key, value)
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


@router.delete("/{user_email}")
async def delete_post(*, session: Session = Depends(get_session), user_email: EmailStr):
    statement = select(User).where(User.email == user_email)
    results = session.exec(statement)
    user = results.first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    session.delete(user)
    session.commit()
    return {"ok": True}
