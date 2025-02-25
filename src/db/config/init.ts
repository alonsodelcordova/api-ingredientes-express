
import { Sequelize } from "sequelize";
import { Ingredient } from '../models/Ingredient'

export const sequelizeConn = new Sequelize({
    dialect: "sqlite",
    storage: "./src/db/db.sqlite",
    logging: true,
});



export const dbInit = () => {
    sequelizeConn.authenticate()
    .then(() => {
        console.log("Connection has been established successfully.");
    })
    .catch((error) => {
        console.error("Unable to connect to the database:", error);
    });

    Ingredient.inicio()

    sequelizeConn.sync()
    .then(() => {
        console.log("All models were synchronized successfully.");
    })
    .catch((error) => {
        console.error("Unable to synchronize the models:", error);
    });

  
}