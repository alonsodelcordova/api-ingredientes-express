import * as userRepository from "../db/repository/users_repository";
import * as mapperUser from "../api/mappers/usersMapper";
import { UsuarioModel, TokenModel } from "../db/models/usuarioModel";
import {
  CreateUsuarioDto,
  LoginDto,
  TokenDto,
  UsuarioDto,
} from "../api/dto/usersDto";
import jwt from "jsonwebtoken";
import { TOKEN_SECRET } from "../helpers/constants";
import { eliminarImagenHelper } from "../helpers/fileHelpers";

export const registrarUsuario = async (
  user: CreateUsuarioDto
): Promise<UsuarioDto> => {
  const userExist = await userRepository.consultarUsuarioByUsername(
    user.username
  );

  if (userExist) {
    throw new Error("El usuario ya existe");
  }

  const userModel: UsuarioModel = mapperUser.toUserModelCreate(user);
  const userCreated = await userRepository.crearUserRepository(userModel);
  return mapperUser.toUserDto(userCreated);
};

export const consultarUsuarios = async (): Promise<UsuarioDto[]> => {
  const users = await userRepository.consultarUsuarios();
  return users.map(mapperUser.toUserDto);
};

export const iniciarSesion = async (
  user: CreateUsuarioDto
): Promise<LoginDto> => {
  const userFound = await userRepository.consultarUsuarioByUsername(user.username);
  if (!userFound) {
    throw new Error("Usuario no encontrado");
  }

  if (userFound.password != user.password) {
    throw new Error("Contraseña incorrecta");
  }

  const token_src = jwt.sign(
    {
      id: userFound.id,
      username: userFound.username,
    },
    TOKEN_SECRET,
    {
      expiresIn: 60 * 60 * 24,
    }
  );

  const token: TokenModel = {
    token: token_src,
    userId: userFound.id || 0,
  };
  await userRepository.crearToken(token);
  return {
    username: userFound.username,
    photo: userFound.photo || "",
    token: token.token,
  };
};

export const cerrarSesion = async (token: string) => {
  await userRepository.eliminarToken(token);
};

export const consultarToken = async (token: string): Promise<TokenDto> => {
  const user = await userRepository.consultarToken(token);
  if (!user) {
    throw new Error("Token no encontrado");
  }
  return mapperUser.toTokenDto(user);
};



export const updateImageUsuario = async (
  id: number,
  image: string
): Promise<boolean> => {
  const user = await userRepository.consultarUsuarioById(id);
  if (!user) {
    throw new Error("user not found");
  }

  if (user.photo) {
    eliminarImagenHelper(user.photo);
  }
  const result = await userRepository.actualizarFotoUsuario(id, image);
  if (!result) {
    throw new Error("user not updated");
  }
  return result;
}