import { UsuarioModel } from "../../db/models/usuarioModel"
import { CreateUsuarioDto, UsuarioDto } from "../dto/usersDto"


export const toUserModelCreate = (user: CreateUsuarioDto): UsuarioModel => {
    return {
        username: user.username,
        password: user.password
    }
}

export const toUserDto = (user: UsuarioModel): UsuarioDto => {
    return {
        id: user.id,
        username: user.username,
        photo: user.photo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
}

export const toUserModel = (user: UsuarioDto): UsuarioModel => {
    return {
        id: user.id,
        username: user.username,
        password: '',
        photo: user.photo,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    }
}