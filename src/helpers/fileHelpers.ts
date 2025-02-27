import path from "path";
import fs from "fs";

export const eliminarImagenHelper = async (url: string) => {
  const oldImage = path.join(__dirname, `../../${url}`);
  if (fs.existsSync(oldImage)) {
    fs.unlinkSync(oldImage);
  }
};
