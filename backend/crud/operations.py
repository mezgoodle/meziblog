from sqlalchemy import false
from sqlmodel import Session, select

from database import UserRead, PostCreate, UserCreate, User, Post

from typing import Union
from datetime import datetime


def create_object(
    session: Session,
    model: Union[User, Post],
    request_data: Union[UserCreate, PostCreate],
    user: UserRead = None,
    isPost: bool = False,
) -> dict:
    if isPost:
        setattr(request_data, "author_name", user.name)
    db_object = model.from_orm(request_data)
    if isPost:
        setattr(db_object, "updated_at", datetime.utcnow())
    setattr(db_object, "created_at", datetime.utcnow())
    session.add(db_object)
    session.commit()
    session.refresh(db_object)
    return db_object


def get_objects(
    session: Session, model: Union[User, Post], offset: int, limit: int
) -> list:
    objects = session.exec(select(model).offset(offset).limit(limit)).all()
    return objects


def get_object(
    session: Session,
    model: Union[User, Post],
    criteria: Union[int, str],
    isUser: bool = False,
) -> Union[User, Post]:
    if isUser:
        statement = select(model).where(model.email == criteria)
        results = session.exec(statement)
        user = results.first()
        if not user:
            raise Exception("User not found")
        return user
    post = session.get(Post, criteria)
    return post


def patch_object(
    session: Session,
    old_object: Union[User, Post],
    request_data: dict,
    isPost: bool = False,
) -> Union[User, Post]:
    for key, value in request_data.items():
        setattr(old_object, key, value)
    if isPost:
        setattr(old_object, "updated_at", datetime.utcnow())
    session.add(old_object)
    session.commit()
    session.refresh(old_object)
    return old_object


def delete_object(session: Session, object_: Union[User, Post]) -> dict:
    session.delete(object_)
    session.commit()
    return {"ok": True}
