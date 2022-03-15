from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException, Query, Depends, status
from sqlmodel import Session, select

from database import Post, PostCreate, PostRead, PostUpdate, get_session, UserRead
from oauth import get_current_user


router = APIRouter(
    prefix="/post",
    tags=["posts"],
)


@router.post("", response_model=PostRead, status_code=status.HTTP_201_CREATED)
async def create_post(
    *,
    session: Session = Depends(get_session),
    post: PostCreate,
    user: UserRead = Depends(get_current_user)
):
    setattr(post, "author_name", user.name)
    db_post = Post.from_orm(post)
    setattr(db_post, "created_at", datetime.utcnow())
    setattr(db_post, "updated_at", datetime.utcnow())
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


@router.get("s", response_model=List[PostRead], status_code=status.HTTP_200_OK)
async def read_posts(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, lte=100)
):
    posts = session.exec(select(Post).offset(offset).limit(limit)).all()
    return posts


@router.get("/{post_id}", response_model=PostRead, status_code=status.HTTP_200_OK)
async def read_post(*, session: Session = Depends(get_session), post_id: int):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post


@router.patch(
    "/{post_id}", response_model=PostRead, status_code=status.HTTP_202_ACCEPTED
)
async def update_post(
    *,
    session: Session = Depends(get_session),
    post_id: int,
    post: PostUpdate,
    _=Depends(get_current_user)
):
    db_post = session.get(Post, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    post_data = post.dict(exclude_unset=True)
    for key, value in post_data.items():
        setattr(db_post, key, value)
    setattr(db_post, "updated_at", datetime.utcnow())
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    *,
    session: Session = Depends(get_session),
    post_id: int,
    _=Depends(get_current_user)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    session.delete(post)
    session.commit()
    return {"ok": True}
