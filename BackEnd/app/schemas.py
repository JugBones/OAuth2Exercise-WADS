from pydantic import Field, EmailStr, BaseModel

class _UserBase(BaseModel):
    email: EmailStr
    full_name:str


class UserCreate(_UserBase):
    hashed_password: str = Field(alias="password")


class User(_UserBase):
    id: int
    is_active = bool = Field(default=False)

    class Config:
        orm_mode = True


class UserLogin(BaseModel):
    email = EmailStr = Field(alias="username")
    password: str

    class Config:
        arbitrary_types_allowed = True