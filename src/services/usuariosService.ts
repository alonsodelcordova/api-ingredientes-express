import * as userRepository from '../db/repository/users_repository'
import * as mapperUser from '../api/mappers/usersMapper'
import {UsuarioModel, TokenModel} from '../db/models/usuarioModel'
import { CreateUsuarioDto, LoginDto, UsuarioDto } from '../api/dto/usersDto'
import jwt from 'jsonwebtoken'

const SECRET = process.env.JWT_SECRET || ''

export const registrarUsuario = async (user:CreateUsuarioDto): Promise<UsuarioDto> => {
    const userModel: UsuarioModel = mapperUser.toUserModelCreate(user)
    const userCreated = await userRepository.crearUserRepository(userModel)
    return mapperUser.toUserDto(userCreated)
}

export const consultarUsuarios = async (): Promise<UsuarioDto[]> => {
    const users = await userRepository.consultarUsuarios()
    return users.map(mapperUser.toUserDto)
}

export const iniciarSesion = async (user: CreateUsuarioDto): Promise<LoginDto> => {
    const userFound = await userRepository.consultarUsuarioByUsername(user.username)
    if (userFound.password != user.password) {
        throw new Error('Contraseña incorrecta')
    }

    const token_src = jwt.sign({
        id: userFound.id,
        username: userFound.username
    },SECRET,  {
        expiresIn: 60 * 60 * 24
    })

    const token: TokenModel = {
        token: token_src,
        userId: userFound.id || 0
    }
    await userRepository.crearToken(token)
    return {
        username: userFound.username,
        photo: userFound.photo || '',
        token: token.token
    }
}
