from fastapi import APIRouter, HTTPException, Depends, Query, status
from sqlmodel import Session
from pydantic import EmailStr

from database import UserRead, UserUpdate, get_session
from config import ADMINS_EMAILS

from oauth import get_current_user
from crud.users import get_users, get_user, patch_user, delete_user_db

from typing import List


router = APIRouter(
    prefix="/user", tags=["users"]
)


@router.get("s", response_model=List[UserRead], status_code=status.HTTP_200_OK)
async def read_users(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, lte=100),
    _=Depends(get_current_user)
):
    try:
        users = get_users(session, offset, limit)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return users


@router.get("/me", response_model=UserRead, status_code=status.HTTP_200_OK)
async def read_current_user(current_user=Depends(get_current_user)):
    return current_user


@router.get("/{user_email}", response_model=UserRead, status_code=status.HTTP_200_OK)
async def read_user(*, session: Session = Depends(get_session), user_email: EmailStr, _=Depends(get_current_user)):
    try:
        user = get_user(session, user_email)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return user


@router.patch(
    "/{user_email}", response_model=UserRead, status_code=status.HTTP_202_ACCEPTED
)
async def update_user(
    *, session: Session = Depends(get_session), user_email: EmailStr, user: UserUpdate, current_user=Depends(get_current_user)
):
    if current_user.email not in ADMINS_EMAILS:
        raise HTTPException(status_code=403, detail="Not allowed")
    try:
        user = get_user(session, user_email)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    user_data = user.dict(exclude_unset=True)
    try:
        updated_user = patch_user(session, user, user_data)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return updated_user
    


@router.delete("/{user_email}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_user(
    *,
    session: Session = Depends(get_session),
    user_email: EmailStr,
    current_user=Depends(get_current_user)
):
    if current_user.email not in ADMINS_EMAILS:
        raise HTTPException(status_code=403, detail="Not allowed")
    try:
        user = get_user(session, user_email)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    try:
        result = delete_user_db(session, user)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return result
