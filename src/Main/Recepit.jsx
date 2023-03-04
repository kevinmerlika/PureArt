import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import JsBarcode from 'jsbarcode';


function Receipt() {
  const [cart, setCart] = useState([]);
  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const tax = 20/100 * totalPrice;
  const totalnet = totalPrice-tax;
  useEffect(() => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(cartItems);

    const handleMessage = (event) => {
      if (event.data.type === 'CART_UPDATED') {
        setCart(event.data.payload);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  const handleDownload = () => {
    const doc = new jsPDF();

    // set the starting position of the receipt
    let y = 20;

    // add the header and date
    doc.setFontSize(18);
    doc.text('PureArt', 105, y, 'center');
    doc.setFontSize(12);
    doc.text('Kruje', 105, y + 10, 'center');
    doc.text('Tel: (123) 456-7890', 105, y + 30, 'center');
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, y + 40);
    y += 50;

    // add the table of items
    doc.autoTable({
      head: [['Id', 'Produkti', 'Cmimi']],
      body: cart.map((item, index) => [index + 1, item.title, `${item.price.toFixed(2)} ALL`]),
      startY: y,
      theme: 'striped',
      styles: {
        cellPadding: 2,
        fontSize: 10,
      },
      headStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontSize: 12,
        halign: 'center',
      },
      bodyStyles: {
        fillColor: [255, 255, 255],
        textColor: [0, 0, 0],
        fontSize: 10,
        halign: 'center',
      },
      columnStyles: {
        0: { cellWidth: 10 },
        1: { cellWidth: 120 },
        2: { cellWidth: 30 },
      },
    });

    // set the position for the total and barcode
    y = doc.previousAutoTable.finalY + 20;
    

    // add the total
    doc.setFontSize(14);
    doc.text(`Totali Bruto: ${totalPrice.toFixed(2)} ALL`, 10, y);
    doc.text(`Tax: ${tax.toFixed(2)} ALL`, 80, y);
    doc.text(`Totali Neto: ${totalnet.toFixed(2)} ALL`, 140, y);


    // add the barcode
    const barcodeValue = Math.floor(Math.random() * 900000000) + 100000000;
    JsBarcode(doc, '1234567890', { format: 'CODE128', displayValue: true });    doc.text(`${barcodeValue}`, 100, 65, 'center');

    // download the PDF
    doc.save('receipt.pdf');
  };

  return (
    <div>
      <button onClick={handleDownload}>Download Receipt</button>
    </div>
  );
}

export default Receipt;
