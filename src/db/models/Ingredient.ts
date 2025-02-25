import { DataTypes, Model, Optional } from "sequelize";
import { sequelizeConn } from "../config/init";

interface IngredientAttributes {
  id: number;
  name: string;
  slug: string;
  description?: string;
  foodGroup?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}
export interface IngredientInput
  extends Optional<IngredientAttributes, "id" | "slug"> {}

export interface IngredientOuput extends Required<IngredientAttributes> {}

export class Ingredient
  extends Model<IngredientAttributes, IngredientInput>
  implements IngredientAttributes
{
  public id!: number;
  public name!: string;
  public slug!: string;
  public description!: string;
  public foodGroup!: string;

  // timestamps!
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;

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
