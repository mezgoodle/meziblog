import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from database import create_db_and_tables
from routers import posts, users, authentication

app = FastAPI()

app.include_router(posts.router)
app.include_router(users.router)
app.include_router(authentication.router)

origins = ["https://meziblog.vercel.app", "https://meziblog.vercel.app:3000"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def on_startup():
    create_db_and_tables()


@app.get("/")
async def root():
    return {"message": "Visit the /docs page"}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
