import sqlalchemy as _sql
import sqlalchemy.orm as _orm

import database as _database, models as _models, schemas as _schemas


def create_database():
    return _database.Base.metadata.create_all(bind=_database.engine)
    print("Initialized database")


def create_user(session:_orm.Session, user:_schemas.UserCreate):
    db_session = _models.User(**user.dict())
    session.add(db_session)
    session.commit()
    session.refresh(db_session)
    return db_session

def get_user(session:_orm.Session, email:str):
    return session.query(_models.User).filter(_models.User.email == email).one()

def get_user_by_id(session:_orm.Session, id:int):
    return session.query(_models.User).filter(_models.User.id == id).one()

def delete_user(session: _orm.Session, id: int):
    db_session = session.get(_models.User, id)
    session.delete(db_session)
    session.commit()
    return db_session