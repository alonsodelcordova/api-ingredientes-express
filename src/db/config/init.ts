import { Sequelize } from "sequelize";
import { Ingredient } from "../models/IngredientModel";
import { Usuario, Token } from "../models/usuarioModel";
import { IngredientReceta, Receta } from "../models/recetaModel";

export const sequelizeConn = new Sequelize({
  dialect: "sqlite",
  storage: "./src/db/db.sqlite",
  logging: true,
});

export const dbInit = () => {
  sequelizeConn
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });

  // create tables
  Ingredient.inicio();
  Token.inicio();
  Usuario.inicio();
  Receta.inicio();
  IngredientReceta.inicio();

  //Relations
  Usuario.hasMany(Token, { foreignKey: "userId", as: "tokens" });
  Token.belongsTo(Usuario, { foreignKey: "userId", as: "user" });

  Receta.hasMany(IngredientReceta, { foreignKey: "recetaId", as: "ingredientes", onDelete: "CASCADE" });
  IngredientReceta.belongsTo(Receta, { foreignKey: "recetaId", as: "receta" });

  Ingredient.hasMany(IngredientReceta, { foreignKey: "ingredientId", as: "ingredientes" });
  IngredientReceta.belongsTo(Ingredient, { foreignKey: "ingredientId", as: "ingredient" });

  // sync models
  sequelizeConn
    .sync()
    .then(() => {
      console.log("All models were synchronized successfully.");
    })
    .catch((error) => {
      console.error("Unable to synchronize the models:", error);
    });
};
