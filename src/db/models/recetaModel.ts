import { DataTypes, Model } from "sequelize";
import { sequelizeConn } from "../config/init";

//--------------------------------------------------------------------
//                  RECETA
//--------------------------------------------------------------------
export interface RecetaModel {
    id?: number;
    name: string;
    slug: string;
    description?: string;
    image?: string;
    preparation?: string;
    state ?: number;
    createdAt?: Date;
    updatedAt?: Date;
    ingredientes?: IngredientRecetaModel[];
}

export class Receta extends Model<RecetaModel> {
    public readonly id!: number;
    
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
                image: {
                    type: DataTypes.STRING,
                },
                preparation: {
                    type: DataTypes.TEXT,
                },
                state: {
                    type: DataTypes.INTEGER,
                    defaultValue: 1,
                },
            },
            {
                timestamps: true,
                sequelize: sequelizeConn,
            }
        );
    }
}

//----------------------------------------------------------------
//       INGREDIENTE RECETA
//----------------------------------------------------------------
export interface IngredientRecetaModel {
    id?: number;
    recetaId?: number;
    ingredientId: number;
    quantity: number;
    measure: string;
    unit: string;
    createdAt?: Date;
    updatedAt?: Date;
}

export class IngredientReceta extends Model<IngredientRecetaModel> {
    public static inicio() {
        this.init(
            {
                id: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    autoIncrement: true,
                    primaryKey: true,
                },
                recetaId: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                ingredientId: {
                    type: DataTypes.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                quantity: {
                    type: DataTypes.DECIMAL(10, 2),
                    allowNull: false,
                },
                measure: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
                unit: {
                    type: DataTypes.STRING,
                    allowNull: false,
                },
            },
            {
                timestamps: true,
                sequelize: sequelizeConn
            }
        );
    }
}


