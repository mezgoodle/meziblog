from datetime import datetime
from typing import List

from fastapi import APIRouter, HTTPException, Query, Depends, status
from sqlmodel import Session, select

from database import Post, PostCreate, PostRead, PostUpdate, get_session, UserRead
from oauth import get_current_user
from crud.posts import create_post_db, get_posts, get_post, patch_post


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
    try:
        post = create_post_db(session, post, user)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return post


@router.get("s", response_model=List[PostRead], status_code=status.HTTP_200_OK)
async def read_posts(
    *,
    session: Session = Depends(get_session),
    offset: int = 0,
    limit: int = Query(default=100, lte=100)
):
    try:
        posts = get_posts(session, offset, limit)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return posts


@router.get("/{post_id}", response_model=PostRead, status_code=status.HTTP_200_OK)
async def read_post(*, session: Session = Depends(get_session), post_id: int):
    post = get_post(session, post_id)
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
    current_user=Depends(get_current_user)
):
    db_post = get_post(session, post_id)
    if not db_post:
        raise HTTPException(status_code=404, detail="Post not found")
    post_data = post.dict(exclude_unset=True)
    if current_user.name != db_post.author_name:
        raise HTTPException(status_code=403, detail="Forbidden")
    try:
        post = patch_post(session, post_data, db_post)
    except Exception as e:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail=str(e))
    return post


@router.delete("/{post_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_post(
    *,
    session: Session = Depends(get_session),
    post_id: int,
    current_user=Depends(get_current_user)
):
    post = session.get(Post, post_id)
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if current_user.name != post.author_name:
        raise HTTPException(status_code=403, detail="Forbidden")
    session.delete(post)
    session.commit()
    return {"ok": True}
