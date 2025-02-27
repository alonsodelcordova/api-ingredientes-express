import { DataTypes, Model } from "sequelize";
import { sequelizeConn } from "../config/init";

export interface UsuarioModel {
  id?: number;
  username: string;
  password: string;
  photo?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Usuario extends Model<UsuarioModel> {
  public static inicio() {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        username: {
          type: DataTypes.STRING,
          unique: true,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        photo: {
          type: DataTypes.STRING,
        },
      },
      {
        timestamps: true,
        sequelize: sequelizeConn,
        paranoid: true,
      }
    );
  }
}

//---------------------------------------------------------------------------
//      TOKEN MODEL
//---------------------------------------------------------------------------

export interface TokenModel {
  id?: number;
  token: string;
  userId: number;
  createdAt?: Date;
  updatedAt?: Date;
}

export class Token extends Model<TokenModel> {
  public static inicio() {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        token: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER.UNSIGNED,
          allowNull: false,
        },
      },
      {
        timestamps: true,
        sequelize: sequelizeConn,
      }
    );
  }
}
