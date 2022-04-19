from sqlmodel import Session, select

from database import Post, PostCreate, UserRead

from datetime import datetime


def create_post_db(session: Session, post: PostCreate, user: UserRead) -> Post:
    setattr(post, "author_name", user.name)
    db_post = Post.from_orm(post)
    setattr(db_post, "created_at", datetime.utcnow())
    setattr(db_post, "updated_at", datetime.utcnow())
    session.add(db_post)
    session.commit()
    session.refresh(db_post)
    return db_post


def get_posts(session: Session, offset: int, limit: int) -> list:
    posts = session.exec(select(Post).offset(offset).limit(limit)).all()
    return posts

def get_post(session: Session, post_id: int) -> Post:
    post = session.get(Post, post_id)
    return post
