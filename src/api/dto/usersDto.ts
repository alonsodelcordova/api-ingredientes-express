
export interface CreateUsuarioDto{
    username: string;
    password: string;
}

export interface UsuarioDto {
    id?: number;
    username: string;
    photo?: string;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export interface LoginDto {
    username: string;
    photo: string;
    token: string;
}