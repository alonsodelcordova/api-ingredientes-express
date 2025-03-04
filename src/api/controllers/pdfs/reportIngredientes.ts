import PDFDocument from "pdfkit-table";
import * as ingredientService from "../../../services/ingredientService";
import { IngredientDto } from "../../dto/ingredient";
import { getDateSrt } from "../../../helpers/dateHelper";


export const generateReportIngredientsPDF = async (res: any) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');
  res.setHeader("Access-Control-Allow-Origin", "*");
  const pdfDoc = new PDFDocument();

  pdfDoc.fontSize(15).text("REPORTE DE INGREDIENTES", { align: "center" });
  pdfDoc.moveDown();

  
  const dataIngredients: any[][] = []
  const ingredientes = await ingredientService.getAllIngredientes();
  ingredientes.forEach((ingrediente: IngredientDto) => {
    dataIngredients.push([
        ingrediente.slug, 
        ingrediente.name, 
        ingrediente.foodGroup, 
        ingrediente.image,getDateSrt(ingrediente.createdAt)
    ]);
  });

  pdfDoc.table({
    headers: ["Slug", "Nombre", "Grupo","Foto" ,"Fecha de Creación"],
    rows: dataIngredients
  });

  pdfDoc.end();
  pdfDoc.pipe(res);
};