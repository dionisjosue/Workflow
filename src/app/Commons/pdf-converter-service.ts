import { Injectable } from '@angular/core';
import html2canvas from 'html2canvas';
import html2pdf from 'html2pdf.js';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class PdfConverterService {

  constructor() { }

  async generatePdf(htmlContent: string) {
    const element = document.createElement('div');
    element.innerHTML = htmlContent;

    const options = {
      margin: 10,
      filename: 'generated-document.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    };

   // let url = html2pdf().from(element).set(options).toPdf();
    //let url2 = await html2pdf().from(element).set(options).save();
    //let url3 = html2pdf().from(element).set(options).toImg();
    //let url4ng  = html2pdf().from(element).set(options).save();
    console.log("purr");

    return new Promise<string>((resolve, reject) => {
      html2pdf()
        .from(element)
        .set(options)
        .outputPdf(async (pdf) => {
          try {
            const pdfBlob = new Blob([pdf], { type: 'application/pdf' });
            const pdfUrl = URL.createObjectURL(pdfBlob);
            resolve(pdfUrl);
          } catch (error) {
            console.error('Error generating PDF:', error);
            reject(error);
          }
        });
    });


  }
   async generatePdfImage(htmlContent:string): Promise<string> {
      const tempElement = document.createElement('div');
      tempElement.style.position = 'absolute';
      tempElement.style.top = '-9999px'; // Position off-screen
      tempElement.innerHTML = htmlContent;
      document.body.appendChild(tempElement); // Append to the document body
  
      tempElement.innerHTML = htmlContent;
      /*let rs =  await html2canvas(element);
      let url = rs.toDataURL('image/png');
      return url;*/

      try {
        const canvas = await html2canvas(tempElement);
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
  
        // Get page dimensions (assuming A4 size: 210x297mm)
        const pageWidth = 210;
        const pageHeight = 297;
  
        // Calculate scale factor to fit the image within the page
        const scaleFactor = Math.min(pageWidth / imgWidth, pageHeight / imgHeight);
  
        // Calculate scaled dimensions
        const scaledWidth = imgWidth * scaleFactor;
        const scaledHeight = imgHeight * scaleFactor;
  
        // Create a new PDF with scaled dimensions
        const pdf = new jsPDF('p', 'mm', 'a4');
        pdf.addImage(canvas, 'PNG', 0, 0, scaledWidth, scaledHeight);
  
        // Check if vertical scroll is needed
        const contentHeight = scaledHeight > pageHeight ? scaledHeight : pageHeight;
        if (contentHeight > pageHeight) {
          pdf.addPage(); // Add a new page if vertical scroll is needed
        }
  
        //pdf.save('generated-document.pdf');
        return canvas.toDataURL('image/png');
      } catch (error) {
        console.error('Error generating PDF:', error);
        throw error;
      } finally {
        document.body.removeChild(tempElement); // Remove the temporary element
      }
      


  }

}
