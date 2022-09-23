
function generatePDF() {
    const doc = new jsPDF();  
     doc.fromHTML(document.getElementById("test"), 15, 15,  { 'width': 100 },
     function(a) 
      {
       doc.save("ReporteGeneral.pdf");
     });
}