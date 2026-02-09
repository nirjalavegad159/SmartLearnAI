from fastapi import FastAPI,Depends,Form,HTTPException,APIRouter,Header
import models
from typing import Annotated
from database import engine,SessionLocal
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import Annotated
from schemas.student import StudentModel
from auth import hash_password,verify_password
from fastapi.middleware.cors import CORSMiddleware
from routes import blog
from auth import hash_password,verify_password,create_access_token,decode_access_token
from fastapi.staticfiles import StaticFiles



router=APIRouter(tags=["Student"])

def get_db():
    db=SessionLocal()
    try:
        yield db
    finally:
        db.close()
        
# with hashed
@router.post("/stud_registration")
def register_user( 
      fullname: str = Form(...),
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db)
):


    # Check email exists
    existing_user = db.query(models.Student).filter(models.Student.email == email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    #  HASH PASSWORD
    hashed_pwd = hash_password(password)

    # Save user
    new_user = models.Student(
        fullname=fullname,
        email=email,
        password=hashed_pwd
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {"message": "Registration successful"}


@router.get("/student_display")
def student_display(db:Session=Depends(get_db)):
      data = db.query(models.Student).order_by(models.Student.stud_id.asc()).all()
      return data


@router.post("/login")
def login_user(
    email: str = Form(...),
    password: str = Form(...),
    db: Session = Depends(get_db),
):
    stud = db.query(models.Student).filter(
        models.Student.email == email
    ).first()

    if not stud:
        raise HTTPException(status_code=400, detail="Invalid email or password")

    # 🔐 VERIFY HASHED PASSWORD
    if not verify_password(password, stud.password):
        raise HTTPException(status_code=400, detail="Invalid email or password")

    token = create_access_token({"user_id": stud.stud_id})

    return {
        "success": True,
        "token": token,
        "user": {
            "fullname": stud.fullname,
            "email": stud.email
        }
    }


#  GET LOGGED-IN USER
@router.get("/me")
def get_me(
    authorization: str = Header(None),
    db: Session = Depends(get_db)
):
    if not authorization:
        raise HTTPException(401, "Token missing")

    token = authorization.split(" ")[1]
    payload = decode_access_token(token)

    if not payload:
        raise HTTPException(401, "Invalid token")

    user = db.query(models.Student).filter(
        models.Student.stud_id == payload["user_id"]
    ).first()

    return {
        "fullname": user.fullname,
        "email": user.email
    }