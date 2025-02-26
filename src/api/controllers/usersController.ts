import { NextFunction, Request } from "express";
import * as userService from "../../services/usuariosService";
import { CreateUsuarioDto, LoginDto, UsuarioDto } from "../dto/usersDto";

export const registrarUsuarioController = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const userDto: CreateUsuarioDto = req.body;
    const result: UsuarioDto = await userService.registrarUsuario(userDto);
    return res.status(201).json(result);
  } catch (error: any) {
    next({
      code: 400,
      message: error.message,
    });
  }
};

export const consultarUsuariosController = async (req: Request, res: any) => {
  const result: UsuarioDto[] = await userService.consultarUsuarios();
  return res.status(200).json(result);
};

export const iniciarSesion = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const userDto: CreateUsuarioDto = req.body;
    const result: LoginDto = await userService.iniciarSesion(userDto);
    return res.status(200).json(result);
  } catch (error: any) {
    next({
      code: 400,
      message: error.message,
    });
  }
};

export const cerrarSesionController = async (
  req: Request,
  res: any,
  next: NextFunction
) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    if (!token) {
      throw new Error("Token no proporcionado");
    }
    await userService.cerrarSesion(token);

    return res.status(200).json({
      message: "Sesion cerrada exitosamente",
      success: true,
    });
  } catch (error: any) {
    next({
      code: 401,
      message: error.message,
    });
  }
};
