from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel, create_engine, Session
from pydantic import EmailStr


class PostBase(SQLModel):
    title: str = Field(index=True)
    author_name: Optional[str] = Field(default='mezgoodle')
    body: str
    

class Post(PostBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default=datetime.utcnow())
    updated_at: Optional[datetime] = Field(default=datetime.utcnow())


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    id: int
    created_at: datetime
    updated_at: datetime


class PostUpdate(SQLModel):
    title: Optional[str] = None
    author_name: Optional[str] = None
    body: Optional[str] = None


class UserBase(SQLModel):
    name: str = Field(...)
    email: EmailStr = Field(...)
    password: str = Field(...)
    

class User(UserBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default=datetime.utcnow())


class UserCreate(UserBase):
    pass


class UserRead(UserBase):
    id: int
    created_at: datetime


class UserUpdate(SQLModel):
    name: Optional[str] = None
    email: Optional[str] = None
    password: Optional[str] = None


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
