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
                        children: [new Paragraph(`${application.name}`)],
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
                        children: [new Paragraph(`${application.school}, ${application.cityAndCountry}`)],
                    })
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
                                text: `ПРОТОКОЛ № ${protocol.number}`,
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            firstLine: 850
                        },
                        children: [
                            new TextRun({
                                text: `Днес, ${moment(protocol.date).format('DD.MM.YYYY')} г., се проведе редовно заседание на комисията, назначена със назначена със заповед № ${protocol.orderNumber}/${moment(protocol.orderDate).format('DD.MM.YYYY')} г., изменена със заповед №РД01-229/26.05.2020 г., заповед №РД01-595/23.09.2020 г. и заповед №РД01-348/28.06.2021 г.  на Началника на РУО – София-град, във връзка с постъпили заявления за признаване на средно образование, съгласно Наредба № 11 от 01.09.2016 г. за оценяване на резултатите от обучението на учениците.`,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 1200
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
                            firstLine: 850
                        },
                        spacing: {
                            after: 200
                        },
                        children: [
                            new TextRun({
                                text: 'Признава завършено средно образование и/или професионална квалификация по документи, издадени от Европейските училища и училища на чужди държави, и издава удостоверение (уверение) по чл. 32 от Наредба № 8 от 11 август 2016 г. за информацията и документите за системата на предучилищното и училищното образование, във връзка с чл.110, ал.1 от Наредба № 11 от 01.09.2016 г. за оценяване на резултатите от обучението на учениците, както следва:',
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
                                                    text: 'Удостоверение №',
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
                                                    text: 'Признава завършено:',
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
                                                    text: 'Документ, издаден от:',
                                                    bold: true,
                                                    size: 24
                                                })
                                            ]
                                        })],
                                    })
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
        saveAs(blob, `protocol_sredno_${protocol.number}_${moment(protocol.date).format('DD.MM.YYYY')}.docx`);
    });
}