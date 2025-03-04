import PDFDocument from "pdfkit-table";
import * as recetasService from "../../../services/recetasService";
import { IngredientRecetaDto, RecetaDto } from "../../dto/recetasDto";
import { getDateSrt } from "../../../helpers/dateHelper";


export const generateReportRecetasPDF = async (res: any) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');
  res.setHeader("Access-Control-Allow-Origin", "*");
  const pdfDoc = new PDFDocument();

  pdfDoc.fontSize(15).text("REPORTE DE RECETAS", { align: "center" });
  pdfDoc.moveDown();

  
  
  const recetas = await recetasService.getAllRecetas();
  recetas.forEach((receta: RecetaDto) => {
    pdfDoc.moveDown();
    pdfDoc.fontSize(11)
    pdfDoc.text("Slug: " + receta.slug)
    pdfDoc.text("Nombre: " + receta.name)
    pdfDoc.text("Creado: " + getDateSrt(receta.createdAt))
    pdfDoc.text("Ingredientes: ")

    receta.ingredientes?.forEach((ingrediente:IngredientRecetaDto) => {
        const dataRecetas: any[][] = []
        dataRecetas.push([
            ingrediente.ingredientId, 
            ingrediente.ingredient?.name,
            ingrediente.quantity,  
            ingrediente.unit,
            ingrediente.measure,
            getDateSrt(ingrediente.createdAt)
        ]);
        pdfDoc.table({
            headers: ["Id", "Nombre","Cantidad","Unidad", "Medida" ,"Fecha de Creación"],
            rows: dataRecetas
          });
    })

    
  });

 

  pdfDoc.end();
  pdfDoc.pipe(res);
};