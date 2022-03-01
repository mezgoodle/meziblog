from datetime import datetime
from typing import Optional

from sqlmodel import Field, SQLModel, create_engine


class Post(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    title: str = Field(index=True)
    author_name: Optional[str] = Field(default='mezgoodle')
    body: str
    created_at: Optional[datetime] = Field(default=datetime.utcnow())


sqlite_file_name = "database.db"
sqlite_url = f"sqlite:///{sqlite_file_name}"

engine = create_engine(sqlite_url, echo=True)

def create_db_and_tables():
    SQLModel.metadata.create_all(engine)
