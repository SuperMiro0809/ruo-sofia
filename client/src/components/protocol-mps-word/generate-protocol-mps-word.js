import { Paragraph, Document, Packer, AlignmentType, TextRun, Table, TableCell, TableRow, WidthType, PageOrientation } from "docx";
import { saveAs } from "file-saver";
import moment from "moment";

const admitsObj = {
    'XIII': 'ОСМИ КЛАС',
    'IX': 'ДЕВЕТИ КЛАС',
    'X': 'ДЕСЕТИ КЛАС',
    'XI': 'ЕДИНАДЕСЕТИ КЛАС',
    'XII': 'ДВАНАДЕСЕТИ КЛАС',
    'Основно образование': 'ОСНОВНО ОБРАЗОВАНИЕ',
    'Средно образование': 'СРЕДНО ОБРАЗОВАНИЕ',
    'Първи гимназиален етап': 'ПЪРВИ ГИМНАЗИАЛЕН ЕТАП',
    'Втори гимназиален етап': 'ВТОРИ ГИМНАЗИАЛЕН ЕТАП'
};

export default function generate(protocol) {
    const rows = [];
    const vicePresidentsArr = JSON.parse(protocol.vicePresidents);
    const membersArr = JSON.parse(protocol.members);
    const vicePresidents = [];
    const members = [];

    for(let i = 0; i < protocol.applications.length; i++) {
        const application = protocol.applications[i];
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
                        children: [new Paragraph(`${application.number}`)],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${moment(application.inDate).format('DD.MM.YYYY')}`)],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${admitsObj[application.class]}`)],
                    }),
                    new TableCell({
                        width: {
                            size: 3505,
                            type: WidthType.DXA,
                        },
                        children: [new Paragraph(`${application.school}, ${application.city}, ${application.country}`)],
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
                                text: `Днес, ${moment(protocol.date).format('DD.MM.YYYY')} г., се проведе редовно заседание на комисията, назначена със назначена със Заповед №${protocol.orderNumber}/ ${moment(protocol.orderDate).format('DD.MM.YYYY')} г. на Началника на РУО – София-град, във връзка с постъпили заявления за признаване на завършени етапи на училищно обучение или степени на образование и професионална квалификация по документи, издадени от училища на чужди държави. Комисията РЕШИ:`,
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
                                text: '1. Признава завършен гимназиален клас или степен на образование по документи, издадени от чужди държави, и издава уверение по чл. 110 ал. 2 от Наредба №11 от 01.09.2016 г. за оценяване на резултатите от обучението на учениците, на следните лица:',
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
                                                    text: 'Уверения №',
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
                                                    text: 'От дата',
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
                                                    text: 'Признава завършен',
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
                                                    text: 'Документ, издаден от',
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
        saveAs(blob, `protocol_mps_${protocol.number}.docx`);
    });
}