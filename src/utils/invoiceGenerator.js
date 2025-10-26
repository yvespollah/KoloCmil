import { jsPDF } from 'jspdf'

export const generateInvoicePDF = (sale) => {
  const doc = new jsPDF()
  
  // Colors
  const primaryColor = [41, 128, 185] // Blue
  const secondaryColor = [52, 73, 94] // Dark gray
  const accentColor = [46, 204, 113] // Green
  
  // Header - Company Name
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(0, 0, 210, 40, 'F')
  
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(26)
  doc.setFont('helvetica', 'bold')
  doc.text('KoloCmil Store', 105, 22, { align: 'center' })
  doc.setFontSize(11)
  doc.setFont('helvetica', 'normal')
  doc.text('Yaounde, Cameroun', 105, 32, { align: 'center' })
  
  // Invoice Title
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(20)
  doc.setFont('helvetica', 'bold')
  doc.text('FACTURE', 20, 55)
  
  // Invoice Number and Date Box
  doc.setFillColor(245, 245, 245)
  doc.rect(120, 45, 70, 25, 'F')
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.text('Facture N°:', 125, 53)
  doc.text('Date:', 125, 60)
  doc.text('Heure:', 125, 67)
  
  doc.setFont('helvetica', 'normal')
  doc.text(sale.invoiceNumber, 150, 53)
  doc.text(sale.dateFormatted, 150, 60)
  doc.text(sale.timeFormatted, 150, 67)
  
  // Customer Information Section
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(20, 80, 170, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('INFORMATIONS CLIENT', 25, 86)
  
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('Nom du Client:', 25, 98)
  doc.setFont('helvetica', 'normal')
  doc.text(sale.customerName, 70, 98)
  
  // Product Details Section
  doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.rect(20, 110, 170, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('DETAILS DU PRODUIT', 25, 116)
  
  // Product table header
  doc.setFillColor(240, 240, 240)
  doc.rect(20, 125, 170, 10, 'F')
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(10)
  doc.setFont('helvetica', 'bold')
  doc.text('Nom du Produit', 25, 131)
  doc.text('Categorie', 80, 131)
  doc.text('Prix Unitaire', 120, 131)
  doc.text('Qte', 165, 131)
  
  // Product data
  doc.setFont('helvetica', 'normal')
  doc.text(sale.productName, 25, 143)
  doc.text(sale.category, 80, 143)
  doc.text(`${sale.unitPrice.toLocaleString()} FCFA`, 120, 143)
  doc.text(sale.quantity.toString(), 165, 143)
  
  // Line separator
  doc.setDrawColor(200, 200, 200)
  doc.line(20, 150, 190, 150)
  
  // Payment Summary Section
  doc.setFillColor(accentColor[0], accentColor[1], accentColor[2])
  doc.rect(20, 160, 170, 8, 'F')
  doc.setTextColor(255, 255, 255)
  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text('RESUME DU PAIEMENT', 25, 166)
  
  // Total Amount Box
  doc.setFillColor(250, 250, 250)
  doc.rect(120, 175, 70, 15, 'F')
  doc.setDrawColor(accentColor[0], accentColor[1], accentColor[2])
  doc.setLineWidth(1)
  doc.rect(120, 175, 70, 15)
  
  doc.setTextColor(secondaryColor[0], secondaryColor[1], secondaryColor[2])
  doc.setFontSize(11)
  doc.setFont('helvetica', 'bold')
  doc.text('MONTANT TOTAL:', 125, 183)
  doc.setFontSize(14)
  doc.setTextColor(accentColor[0], accentColor[1], accentColor[2])
  doc.text(`${sale.totalAmount.toLocaleString()} FCFA`, 125, 188)
  
  // Red Circular Stamp - "PAYE" (PAID) - Below Total Amount
  const stampCenterX = 155
  const stampCenterY = 198
  const stampRadius = 16
  const angle = -15
  
  // Save the current state
  doc.saveGraphicsState()
  
  // Draw circles with very transparent opacity
  doc.setGState(new doc.GState({ opacity: 0.25 }))
  
  // Draw outer circle (thicker border)
  doc.setDrawColor(220, 80, 80) // Soft red color
  doc.setLineWidth(2.5)
  doc.circle(stampCenterX, stampCenterY, stampRadius)
  
  // Draw inner circle
  doc.setLineWidth(1.2)
  doc.circle(stampCenterX, stampCenterY, stampRadius - 3)
  
  doc.restoreGraphicsState()
  
  // Draw "PAYE" text with more visible opacity
  doc.saveGraphicsState()
  doc.setGState(new doc.GState({ opacity: 0.25 }))
  
  doc.setTextColor(220, 80, 80) // Soft red color
  doc.setFontSize(16)
  doc.setFont('helvetica', 'bold')
  doc.text('PAYE', stampCenterX, stampCenterY + 3, { 
    align: 'center',
    angle: angle
  })
  
  doc.restoreGraphicsState()
  
  // Footer
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setLineWidth(0.5)
  doc.line(20, 210, 190, 210)
  
  doc.setTextColor(100, 100, 100)
  doc.setFontSize(10)
  doc.setFont('helvetica', 'italic')
  doc.text('Merci pour votre confiance!', 105, 220, { align: 'center' })
  
  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('KoloCmil Store - Yaounde, Cameroun', 105, 230, { align: 'center' })
  doc.text(`Genere le: ${new Date().toLocaleString('fr-FR')}`, 105, 235, { align: 'center' })
  
  // Border
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2])
  doc.setLineWidth(1)
  doc.rect(15, 15, 180, 267)
  
  return doc
}

export const downloadInvoice = (sale) => {
  const doc = generateInvoicePDF(sale)
  const fileName = `Invoice_${sale.invoiceNumber}_${sale.customerName.replace(/\s+/g, '_')}.pdf`
  doc.save(fileName)
}

export const printInvoice = (sale) => {
  const doc = generateInvoicePDF(sale)
  doc.autoPrint()
  window.open(doc.output('bloburl'), '_blank')
}
