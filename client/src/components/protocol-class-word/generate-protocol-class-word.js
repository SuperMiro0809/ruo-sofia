import { Paragraph, Document, Packer, AlignmentType, TextRun, Table, TableCell, TableRow, WidthType, PageOrientation } from "docx";
import { saveAs } from "file-saver";
import moment from "moment";

export default function generate(protocol) {
    const rows = [];
    const vicePresidentsArr = JSON.parse(protocol.vicePresidents);
    const membersArr = JSON.parse(protocol.members);
    const vicePresidents = [];
    const members = [];

    for(let i = 0; i < protocol.application.length; i++) {
        const application = protocol.application[i];
        rows.push(
            new TableRow({
                children: [
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${protocol.number} - ${application.protocol_order}`)],
                    }),
                    new TableCell({
                        width: {
                            size: 5505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${application.student.name}`)],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${application.inNumber}/ ${moment(application.inDate).format('DD/MM/YYYY')} г.`)],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${application.admits}`)],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${application.student.school}, ${application.student.cityAndCountry}`)],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${JSON.parse(application.equivalenceExams).map(e => e.subjectName).join(', ')}`)],
                    }),
                ],
            }),
        );
    }

    for(let i = 0; i < vicePresidentsArr.length; i++) {
        vicePresidents.push(
            new Paragraph({
                indent: {
                    start: 6850
                },
                children: [
                    new TextRun({
                        text: `${i + 1}. ${vicePresidentsArr[i]} `,
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: '...................................'
                    })
                ]
            }),
        );
    }

    for(let i = 0; i < membersArr.length; i++) {
        members.push(
            new Paragraph({
                indent: {
                    start: 6850
                },
                children: [
                    new TextRun({
                        text: `${i + 1}. ${membersArr[i]} `,
                        bold: true,
                        size: 24
                    }),
                    new TextRun({
                        text: '...................................'
                    })
                ]
            }),
        );
    }

    const doc = new Document({
        sections: [
            {
                properties: {
                    page: {
                        size: {
                            orientation: PageOrientation.LANDSCAPE
                        },
                        margin: {
                            left: 1250,
                            right: 1250
                        }
                    }
                },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 100
                        },
                        children: [
                            new TextRun({
                                text: `ПРОТОКОЛ № ${protocol.number}/ ${moment(protocol.date).format('DD.MM.YYYY')} г.`,
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Днес, ${moment(protocol.date).format('DD.MM.YYYY')} г., се проведе редовно заседание на комисията, назначена със назначена със Заповед №${protocol.orderNumber}/ ${moment(protocol.orderDate).format('DD.MM.YYYY')} г. на Началника на РУО – София-град, във връзка с постъпили заявления за признаване на завършен клас, съгласно Наредба № 11 от 01.09.2016 г. на МОН за оценяване на резултатите от обучението на учениците`,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 500
                        },
                        children: [
                            new TextRun({
                                text: `Комисията РЕШИ:`,
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 850
                        },
                        spacing: {
                            after: 200
                        },
                        children: [
                            new TextRun({
                                text: '1. Признава завършен клас по документи, издадени от чужди държави, на учениците както следва:',
                                size: 24
                            })
                        ]
                    }),
                    new Table({
                        width: {
                            size: 100,
                            type: WidthType.PERCENTAGE
                        },
                        columnWidths: [3505, 5505],
                        rows: [
                            new TableRow({
                                children: [
                                    new TableCell({
                                        width: {
                                            size: 3505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: 'Рег. № на удостоверението',
                                                    bold: true,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: 'Име, презиме, фамилия',
                                                    bold: true,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: 'Входящ номер на заявление',
                                                    bold: true,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                        
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: 'Признат завършен клас/срок',
                                                    bold: true,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: 'Документ за завършен клас/срок, издаден от',
                                                    bold: true,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    }),
                                    new TableCell({
                                        width: {
                                            size: 5505,
                                            type: WidthType.DXA,
                                        },
                                        children: [new Paragraph({
                                            alignment: AlignmentType.CENTER,
                                            children: [
                                                new TextRun({
                                                    text: 'Да се положат приравнителни изпити по:',
                                                    bold: true,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    }),
                                ],
                            }),
                            ...rows
                        ]
                    }),
                    new Paragraph({
                        spacing: {
                            before: 850
                        },
                        indent: {
                            start: 5850
                        },
                        children: [
                            new TextRun({
                                text: 'Председател на комисията:',
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 6850
                        },
                        children: [
                            new TextRun({
                                text: protocol.president,
                                bold: true,
                                size: 24
                            }),
                            new TextRun({
                                text: '...................................'
                            })
                        ]
                    }),
                    new Paragraph({
                        spacing: {
                            before: 250
                        },
                        indent: {
                            start: 5850
                        },
                        children: [
                            new TextRun({
                                text: 'Заместник-председатели:',
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    ...vicePresidents,
                    new Paragraph({
                        spacing: {
                            before: 250
                        },
                        indent: {
                            start: 5850
                        },
                        children: [
                            new TextRun({
                                text: 'Членове:',
                                bold: true,
                                size: 24
                            }),
                        ]
                    }),
                    ...members
                ]
            }
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `protocol_class_${protocol.number}.docx`);
    });
}