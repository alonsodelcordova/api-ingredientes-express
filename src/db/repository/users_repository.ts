import {
  Token,
  TokenModel,
  Usuario,
  UsuarioModel,
} from "../models/usuarioModel";

export const consultarUsuarios = async (): Promise<UsuarioModel[]> => {
  const users = await Usuario.findAll();
  return users.map((user) => user.toJSON() as UsuarioModel);
};

export const crearUserRepository = async (
  payload: UsuarioModel
): Promise<UsuarioModel> => {
  const user = await Usuario.create(payload);
  const response = user.toJSON() as UsuarioModel;
  return response;
};

export const consultarUsuarioById = async (
  id: number
): Promise<UsuarioModel> => {
  const user = await Usuario.findByPk(id);
  if (!user) {
    throw new Error("No se encontró el usuario");
  }
  return user.toJSON() as UsuarioModel;
};

export const consultarUsuarioByUsername = async (
  username: string
): Promise<UsuarioModel> => {
  const user = await Usuario.findOne({
    where: {
      username: username,
    },
  });
  if (!user) {
    throw new Error("No se encontró el usuario");
  }
  return user.toJSON() as UsuarioModel;
};

export const registrarUsuario = async (
  userInput: UsuarioModel
): Promise<UsuarioModel> => {
  const user = await Usuario.create(userInput);
  const response = user.toJSON() as UsuarioModel;
  return response;
};

//---------------------------------------------
//      TOKEN REPOSITORY
//---------------------------------------------
export const crearToken = async (payload: TokenModel): Promise<TokenModel> => {
  const user = await Token.create(payload);
  const response = user.toJSON() as TokenModel;
  return response;
};

export const consultarToken = async (token: string): Promise<TokenModel> => {
  const user = await Token.findOne({
    where: {
      token: token,
    },
  });
  if (!user) {
    throw new Error("No se encontró el token");
  }
  return user.toJSON() as TokenModel;
};

export const eliminarToken = async (token: string): Promise<boolean> => {
  const deletedTokenCount = await Token.destroy({
    where: { token },
  });
  return !!deletedTokenCount;
};
