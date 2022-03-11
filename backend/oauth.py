from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlmodel import Session

from auth_token import verify_token
from database import get_session


oauth2_scheme = OAuth2PasswordBearer(tokenUrl='user/login')


def get_current_user(token: str = Depends(oauth2_scheme), session: Session = Depends(get_session)) -> None:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail='Could not validate credentials',
        headers={'WWW-Authenticate': 'Bearer'},
    )
    return verify_token(token, credentials_exception, session)
