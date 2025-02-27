import { TokenModel, UsuarioModel } from "../../db/models/usuarioModel";
import { CreateUsuarioDto, TokenDto, UsuarioDto } from "../dto/usersDto";

export const toUserModelCreate = (user: CreateUsuarioDto): UsuarioModel => {
  return {
    username: user.username,
    password: user.password,
  };
};

export const toUserDto = (user: UsuarioModel): UsuarioDto => {
  return {
    id: user.id,
    username: user.username,
    photo: user.photo,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const toUserModel = (user: UsuarioDto): UsuarioModel => {
  return {
    id: user.id,
    username: user.username,
    password: "",
    photo: user.photo,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
  };
};

export const toTokenDto = (user: TokenModel): TokenDto => {
  return {
    token: user.token,
    userId: user.userId,
  };
};
