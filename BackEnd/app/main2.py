from typing import Dict
import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
from fastapi.middleware.cors import CORSMiddleware

import database as _database, models as _models, schemas as _schemas, services as _services

_services.create_database()

oauth2_scheme = _security.OAuth2PasswordBearer(tokenUrl="login")

app = _fastapi.FastAPI()

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

@app.get("/")
def index():
    return{"Welcome to Backend":"Hello World!"}

@app.get("/profile/{id}", response_model=_schemas.User)
def profile(
    id:int,
    token: str = _fastapi.Depends(oauth2_scheme),
    session: _orm.Session= _fastapi.Depends(_database.get_db)
):
    
    return _services.get_user_by_id(session=session, id=id)

@app.post('/signup', response_model=_schemas.User)
def signup(
    payload: _schemas.UserCreate = _fastapi.Body(), 
    session:_orm.Session=_fastapi.Depends(_database.get_db)
):

    payload.hashed_password = _models.User.hash_password(payload.hashed_password)
    return _services.create_user(session, user=payload)

@app.post('/login', response_model=Dict)
def login(
        payload: _security.OAuth2PasswordRequestForm = _fastapi.Depends(),
        session: _orm.Session = _fastapi.Depends(_database.get_db)
    ):

    try:
        user:_models.User = _services.get_user(
            session=session, email=payload.username
        )
    except:
        raise _fastapi.HTTPException(
            status_code=_fastapi.status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user credentials"
        )

    is_validated:bool = user.validate_password(payload.password)
    if not is_validated:
        raise _fastapi.HTTPException(
            status_code=_fastapi.status.HTTP_401_UNAUTHORIZED,
            detail="Invalid user credentials"
        )

    return user.generate_token()

@app.delete("/delete-user/{user_id}", response_model=_schemas.User)
def delete_user(
    id:int,
    token: str = _fastapi.Depends(oauth2_scheme),
    session: _orm.Session= _fastapi.Depends(_database.get_db)
):
    return _services.delete_user(session=session, id=id)