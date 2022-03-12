from fastapi import APIRouter, HTTPException, Depends, status, Query
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import select, Session

from database import User, get_session
from auth_token import create_access_token, Token
from hashing import Hash

router = APIRouter(
    tags=['authentication'],
)


@router.post('/login', response_description='Login into API',
             status_code=status.HTTP_202_ACCEPTED, response_model=Token)
async def login(*, session: Session = Depends(get_session), request: OAuth2PasswordRequestForm = Depends()):
    statement = select(User).where(User.email == request.username)
    results = session.exec(statement)
    user = results.first()
    if not Hash.verify(user.password, request.password):
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Incorrect password')
    access_token = create_access_token(data={"sub": user.email})
    return {'access_token': access_token, 'token_type': 'bearer'}
