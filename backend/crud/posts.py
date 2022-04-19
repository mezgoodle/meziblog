from sqlmodel import Session

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
