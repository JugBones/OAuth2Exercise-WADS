from datetime import datetime, timedelta
from typing import Annotated, Union
import uvicorn
from fastapi import Depends, FastAPI, HTTPException, status
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from jose import JWTError
import jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import (
    Boolean,
    Column,
    Integer,
    String,
    create_engine,
    ForeignKey,
    func,
    DateTime,
)
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session
from database import database
import uuid

# to get a string like this run:
# openssl rand -hex 32
SECRET_KEY = "09d25e094faa6ca2556c818166b7a9563b93f7099f6f0f4caa6cf63b88e8d3e7"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

# Set up database connection
SQLALCHEMY_DATABASE_URL = "sqlite:///./database.db"  # Replace with your database URL

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()


class UserModel(Base):
    __tablename__ = "users"

    id = Column(String(36), primary_key=True, index=True)
    full_name = Column(String(80), unique=True, index=True)
    email = Column(String(80), index=True)
    hashed_password = Column(String(120))
    disabled = Column(Boolean, default=False)
    refresh_token = Column(ForeignKey("refresh_token.id"), nullable=True)


class RefreshToken(Base):
    __tablename__ = "refresh_token"
    id = Column(String(36), primary_key=True, index=True)
    user_id = Column(String(80), nullable=False)
    created_at = Column(DateTime, nullable=False, server_default=func.now())
    updated_at = Column(DateTime, nullable=False, server_onupdate=func.now())


class ItemModel(Base):
    __tablename__ = "items"
    id = Column(String(36), primary_key=True, index=True)
    text = Column(String(36), nullable=False)
    user_id = Column(ForeignKey("users.id", ondelete="CASCADE"), nullable=False)

Base.metadata.create_all(bind=engine)

class CreateUserRequest(BaseModel):
    full_name: str
    password: str
    email: EmailStr

class TokenData(BaseModel):
    full_name: Union[str, None] = None


class User(BaseModel):
    email: Union[str, None] = None
    full_name: Union[str, None] = None
    disabled: Union[bool, None] = None

class UserLoginSchema(BaseModel):
    username: str
    password: str

class UserInDB(User):
    hashed_password: str

class ItemSchema(BaseModel):
    text: str

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost:8000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password)


def get_password_hash(password):
    return pwd_context.hash(password)


def get_user(db: Session, full_name: str):
    if full_name in db:
        user_dict = db[full_name]
        return UserInDB(**user_dict)


def authenticate_user(db: Session, full_name: str, password: str):
    user = get_user(db, full_name)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user


def create_access_token(data: dict, expires_delta: Union[timedelta, None] = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def create_refresh_token(data: dict, expires_delta: timedelta = timedelta(days=7)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def get_current_user(
    token: Annotated[str, Depends(oauth2_scheme)], db: Session = Depends(get_db)
):
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        full_name: str = payload.get("sub")
        if full_name is None:
            raise credentials_exception  # The previous message was cut off. Let's continue from there.

        token_data = TokenData(full_name=full_name)
    except JWTError:
        raise credentials_exception
    user = get_user(db, full_name=token_data.full_name)
    if user is None:
        raise credentials_exception
    return user


async def get_current_active_user(
    current_user: Annotated[User, Depends(get_current_user)]
):
    if current_user.disabled:
        raise HTTPException(status_code=400, detail="Inactive user")
    return current_user

@app.post("/login", tags=["auth"])
def login_for_access_token(user_info: UserLoginSchema, db: Session = Depends(get_db)):
    fullname = user_info.fullname
    password = user_info.password

    user = authenticate_user(db, fullname, password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.full_name}, expires_delta=access_token_expires
    )

    refresh_token = create_refresh_token(data={"sub": user.fullname})
    return {"access_token": access_token, "refresh_token": refresh_token}


@app.post("/register", status_code=status.HTTP_201_CREATED, tags=["auth"])
async def create_user(user: CreateUserRequest, db: Session = Depends(get_db)):
    existing_user = get_user(db, user.username)
    if existing_user:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Username already exists",
        )

    hashed_password = get_password_hash(user.password)
    new_user = UserModel(
        id=str(uuid.uuid4()),
        username=user.full_name,
        email=user.email,
        hashed_password=hashed_password,
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return {"message": "User created successfully"}


@app.get("/users/me/", tags=["auth"])
async def read_users_me(
    current_user: Annotated[UserInDB, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
):
    return current_user


@app.get("/users/me/items/", tags=["items"])
async def read_own_items(
    current_user: Annotated[UserInDB, Depends(get_current_active_user)],
    db: Session = Depends(get_db),
):
    return [{"item_id": "Foo", "owner": current_user.full_name}]


if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)