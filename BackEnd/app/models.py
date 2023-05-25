import sqlalchemy as _sql
import passlib.hash as _hash
import database as _database
import bcrypt

class User(_database.Base):
    __tablename__ = "users"
    id = _sql.Column(_sql.Integer, primary_key=True, index=True)
    email = _sql.Column(_sql.String, unique=True, index=True)
    hashed_password = _sql.Column(_sql.String)
    full_name = _sql.Column(_sql.String(200), nullable=False)

    # def hash_password(password) -> str:
    #     return bcrypt.hashpw(password.encode(), bcrypt.gensalt())

    def verify_password(self,password:str):
        return _hash.bcrypt.verify(password, self.hashed_password)
