import PDFDocument from "pdfkit-table";
import * as usuariosService from "../../../services/usuariosService";


export const generateReportUserPDF = async (res: any) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'inline; filename="reporte.pdf"');
  res.setHeader("Access-Control-Allow-Origin", "*");
  const pdfDoc = new PDFDocument();

  pdfDoc.fontSize(15).text("REPORTE DE USUARIOS", { align: "center" });
  pdfDoc.moveDown();

  
  const dataUser: any[][] = []
  const users = await usuariosService.consultarUsuarios();
  users.forEach((user: any) => {
    const date = user.createdAt;
    var dateStr = '';
    if (date) {
      dateStr = `${date.getDay()}/${date.getMonth()}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
    }
    dataUser.push([user.id, user.username,dateStr]);
  });

  pdfDoc.table({
    headers: ["ID", "Username", "Fecha de Creación"],
    rows: dataUser
  });

  pdfDoc.end();
  pdfDoc.pipe(res);
};