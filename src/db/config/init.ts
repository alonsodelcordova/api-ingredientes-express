import { Sequelize } from "sequelize";
import { Ingredient } from "../models/IngredientModel";
import { Usuario, Token } from "../models/usuarioModel";

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

  //Relations
  Usuario.hasMany(Token, { foreignKey: "userId" });
  Token.belongsTo(Usuario, { foreignKey: "userId" });

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
