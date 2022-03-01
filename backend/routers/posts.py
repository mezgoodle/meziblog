from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException, Query
from sqlmodel import Session, select

from database import Post, PostCreate, PostRead, PostUpdate, engine


router = APIRouter(
    prefix='/post',
    tags=['posts']
)

@router.post("s", response_model=PostRead)
def create_post(post: PostCreate):
    with Session(engine) as session:
        db_post = Post.from_orm(post)
        session.add(db_post)
        session.commit()
        session.refresh(db_post)
        return db_post


@router.get("s", response_model=List[Post])
def read_posts(offset: int = 0, limit: int = Query(default=100, lte=100)):
    with Session(engine) as session:
        posts = session.exec(select(Post).offset(offset).limit(limit)).all()
        return posts


@router.get("/{post_id}", response_model=PostRead)
def read_post(post_id: int):
    with Session(engine) as session:
        post = session.get(Post, post_id)
        if not post:
            raise HTTPException(status_code=404, detail="Post not found")
        return post


@router.patch("/{post_id}", response_model=PostRead)
def update_post(post_id: int, post: PostUpdate):
    with Session(engine) as session:
        db_post = session.get(Post, post_id)
        if not db_post:
            raise HTTPException(status_code=404, detail="Post not found")
        post_data = post.dict(exclude_unset=True)
        for key, value in post_data.items():
            setattr(db_post, key, value)
        setattr(db_post, 'updated_at', datetime.utcnow())
        session.add(db_post)
        session.commit()
        session.refresh(db_post)
        return db_post


# Code below omitted 👇

