import PDFDocument from "pdfkit-table";
import * as ingredientService from "../../../services/ingredientService";
import { IngredientDto } from "../../dto/ingredient";


export const generateReportIngredientsPDF = async (res: any) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');
  res.setHeader("Access-Control-Allow-Origin", "*");
  const pdfDoc = new PDFDocument();

  pdfDoc.fontSize(15).text("REPORTE DE USUARIOS", { align: "center" });
  pdfDoc.moveDown();

  
  const dataIngredients: any[][] = []
  const ingredientes = await ingredientService.getAllIngredientes();
  ingredientes.forEach((ingrediente: IngredientDto) => {
    const date = ingrediente.createdAt;
    var dateStr = '';
    if (date) {
      dateStr = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    dataIngredients.push([ingrediente.slug, ingrediente.name, ingrediente.foodGroup, ingrediente.image,dateStr]);
  });

  pdfDoc.table({
    headers: ["Slug", "Nombre", "Grupo","Foto" ,"Fecha de Creación"],
    rows: dataIngredients
  });

  pdfDoc.end();
  pdfDoc.pipe(res);
};