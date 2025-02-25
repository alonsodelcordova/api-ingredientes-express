import { Model, Optional } from "sequelize";

interface TokenAttributes {
    id: number;
    token: string;
    userId: number;
    createdAt?: Date;
    updatedAt?: Date;
}


interface UsuarioAttributes extends Model{
    id: number;
    username: string;
    password: string;
    photo?: string;
    createdAt?: Date;
    updatedAt?: Date;

    
}
