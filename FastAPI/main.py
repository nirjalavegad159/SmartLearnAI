from fastapi import FastAPI,Depends
from routes import users
import models 
from typing import Annotated
from database import engine,SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from schemas.user import UserModel
from routes import blog,users
from fastapi.staticfiles import StaticFiles
<<<<<<< HEAD
from routes import stud_profile,course,contact,instructor_profile
=======
from routes import stud_profile,course,contact,admin,activity
>>>>>>> 80d6e8a (updated-20)
import os

origins = [
    "http://localhost:5173",
    "http://localhost:5174",
    "http://localhost:5175"
]

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(blog.router)
app.include_router(users.router)
app.include_router(stud_profile.router)
app.include_router(course.router)
app.include_router(contact.router)
<<<<<<< HEAD
app.include_router(instructor_profile.router)

#Blog Image Folder
UPLOAD_DIR=r"\\192.168.254.96\SharedVideos\BlogImages"
os.makedirs(UPLOAD_DIR,exist_ok=True)
app.mount(
    "/BlogImages", 
    StaticFiles(directory=UPLOAD_DIR), 
    name="BlogImages"
)

# Course Thumbnail Folder   
THUMBNAIL_DIR =r"\\192.168.254.96\SharedVideos\Thumbnail"
os.makedirs(THUMBNAIL_DIR, exist_ok=True)
app.mount(
    "/Thumbnail",
    StaticFiles(directory=THUMBNAIL_DIR),
=======
app.include_router(admin.router)
app.include_router(activity.router)

UPLOAD_DIR="./images/BlogImages"
os.makedirs(UPLOAD_DIR,exist_ok=True)
app.mount("/BlogImages", StaticFiles(directory="D:/SmartLearnAI/FastAPI/SharedVideos/BlogImages"), name="BlogImages")


app.mount(
    "/Thumbnail",
    StaticFiles(directory="D:/SmartLearnAI/FastAPI/SharedVideos/Thumbnail"),
>>>>>>> 80d6e8a (updated-20)
    name="Thumbnail"
)

# Course Video Folder
VIDEO_DIR =r"\\192.168.254.96\SharedVideos\Coursevideo"
os.makedirs(VIDEO_DIR, exist_ok=True)
app.mount(
<<<<<<< HEAD
    "/Coursevideo",
    StaticFiles(directory=VIDEO_DIR ),
=======
    "/Coursevideo", 
    StaticFiles(directory="D:/SmartLearnAI/FastAPI/SharedVideos/Coursevideo"),
>>>>>>> 80d6e8a (updated-20)
    name="Coursevideo"
)

app.mount(
      "/StudentPhotos",
      StaticFiles(directory="D:/SmartLearnAI/FastAPI/SharedVideos/StudentPhotos"),
      name="StudentPhotos"
)

# create all database tables
models.Base.metadata.create_all(bind=engine)


# Dependency to get database session
def get_db():
      db = SessionLocal()
      try:
            yield db
      finally:
            db.close()


db_dependency = Annotated[Session,Depends(get_db)]



