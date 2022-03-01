from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel, create_engine


class PostBase(SQLModel):
    title: str = Field(index=True)
    author_name: Optional[str] = Field(default='mezgoodle')
    body: str


class Post(PostBase, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    created_at: Optional[datetime] = Field(default=datetime.utcnow())


class PostCreate(PostBase):
    pass


class PostRead(PostBase):
    id: int
    created_at: datetime


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
