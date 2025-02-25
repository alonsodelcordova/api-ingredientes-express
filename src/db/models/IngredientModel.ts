import { DataTypes, Model } from "sequelize";
import { sequelizeConn } from "../config/init";

export interface IngredientModel {
  id?: number;
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Ingredient extends Model<IngredientModel> {
  public static inicio() {
    this.init(
      {
        id: {
          type: DataTypes.INTEGER.UNSIGNED,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        slug: {
          type: DataTypes.STRING,
          allowNull: false,
          unique: true,
        },
        description: {
          type: DataTypes.TEXT,
        },
        foodGroup: {
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
