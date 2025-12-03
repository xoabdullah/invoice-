import { Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType, BorderStyle, AlignmentType, HeadingLevel } from 'docx';
import { saveAs } from 'file-saver';
import { InvoiceData } from '../types/invoice';
import { calculatePricing, formatCurrency } from './calculations';

export async function exportToWord(invoiceData: InvoiceData) {
  const calculated = calculatePricing(invoiceData.pricing);

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: [
          new Paragraph({
            children: [
              new TextRun({
                text: invoiceData.company.name,
                bold: true,
                size: 32,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: `Phone: ${invoiceData.company.phone} | Email: ${invoiceData.company.email}`,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: invoiceData.company.website,
                size: 20,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'QUOTE',
                bold: true,
                size: 36,
              }),
            ],
            alignment: AlignmentType.CENTER,
            spacing: { after: 400 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Quote Number:', bold: true })],
                      }),
                    ],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: invoiceData.details.quoteNumber }),
                    ],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Date:', bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: invoiceData.details.date }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Customer Name:', bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: invoiceData.customer.name }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Address:', bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: invoiceData.customer.address }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Phone:', bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: invoiceData.customer.phone }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Email:', bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: invoiceData.customer.email }),
                    ],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [
                      new Paragraph({
                        children: [new TextRun({ text: 'Project Title:', bold: true })],
                      }),
                    ],
                  }),
                  new TableCell({
                    children: [
                      new Paragraph({ text: invoiceData.customer.projectTitle }),
                    ],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            text: '',
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'PRICING BREAKDOWN',
                bold: true,
                size: 28,
              }),
            ],
            spacing: { after: 200 },
          }),

          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Materials', bold: true })] })],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: formatCurrency(calculated.materials), alignment: AlignmentType.RIGHT })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Labor', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: formatCurrency(calculated.labor), alignment: AlignmentType.RIGHT })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Subtotal', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: formatCurrency(calculated.subtotal), alignment: AlignmentType.RIGHT })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Pre-Tax Price', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: formatCurrency(calculated.preTaxPrice), alignment: AlignmentType.RIGHT })],
                  }),
                ],
              }),
              ...(calculated.discountEnabled ? [
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({
                        children: [new TextRun({
                          text: `Promo Discount (${calculated.discountType === 'percentage' ? calculated.discountValue + '%' : 'Fixed'})`,
                          bold: true
                        })]
                      })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: '-' + formatCurrency(calculated.discountAmount), alignment: AlignmentType.RIGHT })],
                    }),
                  ],
                }),
                new TableRow({
                  children: [
                    new TableCell({
                      children: [new Paragraph({ children: [new TextRun({ text: 'Price After Promo', bold: true })] })],
                    }),
                    new TableCell({
                      children: [new Paragraph({ text: formatCurrency(calculated.priceAfterPromo), alignment: AlignmentType.RIGHT })],
                    }),
                  ],
                }),
              ] : []),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `${calculated.taxType} (${calculated.taxPercent}%)`, bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: formatCurrency(calculated.taxAmount), alignment: AlignmentType.RIGHT })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'GRAND TOTAL', bold: true, size: 24 })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: formatCurrency(calculated.grandTotal), bold: true, size: 24 })], alignment: AlignmentType.RIGHT })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: `Deposit Required (${calculated.depositPercent}%)`, bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: formatCurrency(calculated.depositRequired), alignment: AlignmentType.RIGHT })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    children: [new Paragraph({ children: [new TextRun({ text: 'Balance Due', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: formatCurrency(calculated.balanceDue), alignment: AlignmentType.RIGHT })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({
            text: '',
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'SCOPE OF WORK',
                bold: true,
                size: 28,
              }),
            ],
            spacing: { after: 200 },
          }),

          ...invoiceData.scopeOfWork.content.split('\n').map(
            line => new Paragraph({
              text: line,
              spacing: { after: 100 },
            })
          ),

          new Paragraph({
            text: '',
            spacing: { after: 400 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'TERMS & CONDITIONS',
                bold: true,
                size: 28,
              }),
            ],
            spacing: { after: 200 },
          }),

          ...invoiceData.terms.content.split('\n').map(
            line => new Paragraph({
              text: line,
              spacing: { after: 100 },
            })
          ),

          new Paragraph({
            text: '',
            spacing: { after: 400 },
          }),

          ...(invoiceData.notes ? [
            new Paragraph({
              children: [
                new TextRun({
                  text: 'NOTES',
                  bold: true,
                  size: 28,
                }),
              ],
              spacing: { after: 200 },
            }),
            new Paragraph({
              text: invoiceData.notes,
              spacing: { after: 400 },
            }),
          ] : []),

          new Paragraph({
            children: [
              new TextRun({
                text: 'SIGNATURES',
                bold: true,
                size: 28,
              }),
            ],
            spacing: { after: 200 },
          }),

          new Paragraph({
            text: '',
            spacing: { after: 200 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'Client Authorization to Begin Work:',
                bold: true,
              }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            text: '_________________________________________',
            spacing: { after: 50 },
          }),

          new Paragraph({
            text: invoiceData.signatures.clientAuthorizationName || 'Name',
            spacing: { after: 50 },
          }),

          new Paragraph({
            text: `Date: ${invoiceData.signatures.clientAuthorizationDate || '_______________'}`,
            spacing: { after: 300 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'Client Satisfaction Confirmation:',
                bold: true,
              }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            text: '_________________________________________',
            spacing: { after: 50 },
          }),

          new Paragraph({
            text: invoiceData.signatures.clientSatisfactionName || 'Name',
            spacing: { after: 50 },
          }),

          new Paragraph({
            text: `Date: ${invoiceData.signatures.clientSatisfactionDate || '_______________'}`,
            spacing: { after: 300 },
          }),

          new Paragraph({
            children: [
              new TextRun({
                text: 'Contractor Signature:',
                bold: true,
              }),
            ],
            spacing: { after: 100 },
          }),

          new Paragraph({
            text: '_________________________________________',
            spacing: { after: 50 },
          }),

          new Paragraph({
            text: invoiceData.signatures.contractorName || 'Name',
            spacing: { after: 50 },
          }),

          new Paragraph({
            text: `Date: ${invoiceData.signatures.contractorDate || '_______________'}`,
            spacing: { after: 300 },
          }),
        ],
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Quote_${invoiceData.details.quoteNumber}_${invoiceData.customer.name.replace(/\s/g, '_')}.docx`);
}
