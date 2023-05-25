import sqlalchemy as _sql
import database as _database
import bcrypt
from jose import jwt
from datetime import timedelta, datetime
from typing import Optional

SECRET_KEY = "asuperdupersecretkeymadebypompom"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, nullable=False)
    hashed_password = _sql.Column(_sql.String)
    full_name = _sql.Column(_sql.String(200), nullable=False)
    is_active = _sql.Column(_sql.Boolean, default=False)

    _sql.UniqueConstraint("email", name="uq_user_email")
    _sql.PrimaryKeyConstraint("id", name="pk_user_id")

    def __repr__(self):
        """Returns string representation of model instance"""
        return "<User {full_name!r}>".format(full_name=self.full_name)

    @staticmethod
    def hash_password(password) -> str:
        """Transforms password from it's raw textual form to 
        cryptographic hashes
        """
        return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    def validate_password(self, password) -> bool:
        """Confirms password validity"""
        to_encode = {"full_name": self.full_name, "email": self.email}
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return {
            "access_token": encoded_jwt
        }

    def generate_token(self, expires_delta: Optional[timedelta] = None) -> dict:
        """Generate access token for user"""
        to_encode = {"full_name": self.full_name, "email": self.email}
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            expire = datetime.utcnow() + timedelta(minutes=15)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
        return {
            "access_token": encoded_jwt
        }