from sqlmodel import Session, select

from database import User, UserCreate

from datetime import datetime


def create_user_db(session: Session, user: UserCreate) -> User:
    db_user = User.from_orm(user)
    setattr(db_user, "created_at", datetime.utcnow())
    session.add(db_user)
    session.commit()
    session.refresh(db_user)
    return db_user


def get_users(session: Session, offset: int, limit: int) -> list:
    users = session.exec(select(User).offset(offset).limit(limit)).all()
    return users

def get_user(session: Session, user_email: str) -> User:
    statement = select(User).where(User.email == user_email)
    results = session.exec(statement)
    user = results.first()
    if not user:
        raise Exception("User not found")
    return user


def patch_user(session: Session, user: User, user_data: dict) -> User:
    for key, value in user_data.items():
        setattr(user, key, value)
    session.add(user)
    session.commit()
    session.refresh(user)
    return user


def delete_user_db(session: Session, user: User) -> dict:
    session.delete(user)
    session.commit()
    return {"ok": True}
