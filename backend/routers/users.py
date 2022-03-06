from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlmodel import Session, select

from database import UserCreate, UserRead, User, get_session, engine
from auth_token import create_access_token
from hashing import Hash


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
    with Session(engine) as session:
        statement = select(User).where(User.name == request.username)
        results = session.exec(statement)
        user = results.first()
        # print(user.password)
        if not Hash.verify(user.password, request.password):
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail='Incorrect password')
        access_token = create_access_token(data={"sub": user.email})
        return {'access_token': access_token, 'token_type': 'bearer'}
