import {
  Token,
  TokenModel,
  Usuario,
  UsuarioModel,
} from "../models/usuarioModel";

export const consultarUsuarios = async (): Promise<UsuarioModel[]> => {
  //const users = await Usuario.findAll({ include: 'tokens' });
  //console.log(users);
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
): Promise<UsuarioModel|undefined> => {
  const user = await Usuario.findByPk(id);
  if (user) {
    return user.toJSON() as UsuarioModel;
  }
  return undefined;
};

export const consultarUsuarioByUsername = async (
  username: string
): Promise<UsuarioModel|undefined> => {
  const user = await Usuario.findOne({
    where: {
      username: username,
    },
  });
  if(user){
    return user.toJSON() as UsuarioModel;
  }
  return undefined;
};

export const registrarUsuario = async (
  userInput: UsuarioModel
): Promise<UsuarioModel> => {
  const user = await Usuario.create(userInput);
  const response = user.toJSON() as UsuarioModel;
  return response;
};

export const actualizarUsuario = async (
  id: number,
  userInput: UsuarioModel
): Promise<boolean> => {
  const userUpd = await Usuario.update(userInput, {
    where: { id },
  });
  return userUpd[0] > 0;
}

//---------------------------------------------
//      TOKEN REPOSITORY
//---------------------------------------------
export const crearToken = async (payload: TokenModel): Promise<TokenModel> => {
  const user = await Token.create(payload);
  const response = user.toJSON() as TokenModel;
  return response;
};

export const consultarToken = async (token: string): Promise<TokenModel|undefined> => {
  const user = await Token.findOne({
    where: {
      token: token,
    },
  });
  if (user) {
    return user.toJSON() as TokenModel;
  }
  return undefined;
};

export const eliminarToken = async (token: string): Promise<boolean> => {
  const deletedTokenCount = await Token.destroy({
    where: { token },
  });
  return !!deletedTokenCount;
};
