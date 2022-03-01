import uvicorn
from fastapi import FastAPI

from database import create_db_and_tables
from routers import posts

app = FastAPI()

app.include_router(posts.router)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Hello World"}


if __name__ == '__main__':
    uvicorn.run('main:app', reload=True)
