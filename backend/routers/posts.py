from fastapi import APIRouter
from sqlmodel import Session, select

from database import Post, engine


router = APIRouter(
    prefix='/post',
    tags=['posts']
)

@router.post("s")
def create_post(post: Post):
    with Session(engine) as session:
        session.add(post)
        session.commit()
        session.refresh(post)
        return post


@router.get("s")
def read_posts():
    with Session(engine) as session:
        posts = session.exec(select(Post)).all()
        return posts

