import {
    Paragraph,
    Document,
    Packer,
    AlignmentType,
    TextRun,
    PageOrientation,
    Table,
    TableCell,
    TableRow,
    WidthType,
    BorderStyle
} from 'docx';
import { saveAs } from 'file-saver';
import moment from 'moment';

export default function generate(protocol, formText) {
    const membersArr = JSON.parse(protocol.members);
    const members = {
        normal: [],
        bold: []
    };
    const rows = [];
    for (let i = 0; i < membersArr.length; i++) {
        members.normal.push(new Paragraph({
            indent: {
                start: 850
            },
            children: [
                new TextRun({
                    text: `${i + 1}. ${membersArr[i]}`,
                    size: 24
                })
            ]
        }));
        members.bold.push(new Paragraph({
            indent: {
                start: 850
            },
            children: [
                new TextRun({
                    text: `${i + 1}. ${membersArr[i]}`,
                    bold: true,
                    size: 24
                })
            ]
        }));
    }

    for(let i = 0; i < protocol.application.length; i++) {
        const application = protocol.application[i];
        rows.push(new TableRow({
            children: [
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph(`${i + 1}`)],
                }),
                new TableCell({
                    width: {
                        size: 5505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph(`${application.ruoNumber}`)],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph(`${application.teacher.firstName} ${application.teacher.middleName} ${application.teacher.lastName}`)],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph(`${formText(application, "approve")}`)],
                }),
                new TableCell({
                    width: {
                        size: 3505,
                        type: WidthType.DXA,
                    },
                    children: [new Paragraph(`${formText(application, "notApprove")}`)],
                }),
            ],
        }))
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
                            left: 850,
                            right: 850
                        }
                    }
                },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: 'МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА',
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: 'РЕГИОНАЛНО УПРАВЛЕНИЕ НА ОБРАЗОВАНИЕТО – СОФИЯ-ГРАД',
                                bold: true,
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 400
                        },
                        border: {
                            bottom: {
                                color: '800000',
                                size: 15,
                                space: 10,
                                style: BorderStyle.DOUBLE
                            }
                        },
                        children: [
                            new TextRun({
                                text: 'София 1303, ул. „Антим I”, № 17, тел.:9356050, факс:9883937, e-mail: rio_sofia_grad@mon.bg, www.ruo-sofia-grad.com',
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            line: 360
                        },
                        children: [
                            new TextRun({
                                text: 'ПРОТОКОЛ',
                                bold: true,
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            line: 360,
                        },
                        children: [
                            new TextRun({
                                text: `№ ${protocol.number}/ ${moment(protocol.date).format('DD.MM.YYYY')} г.`,
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 20
                        },
                        children: [
                            new TextRun({
                                text: 'ОТНОСНО: ',
                                bold: true,
                                size: 24
                            }),
                            new TextRun({
                                text: protocol.about,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 850
                        },
                        children: [
                            new TextRun({
                                text: `На ${moment(protocol.date).format('DD.MM.YYYY')} г. се проведе заседание на комисията в следния състав:`,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 850
                        },
                        children: [
                            new TextRun({
                                text: 'Председател: ',
                                size: 24,
                                bold: true
                            }),
                            new TextRun({
                                text: protocol.president,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 850
                        },
                        children: [
                            new TextRun({
                                text: 'Членове: ',
                                size: 24,
                                bold: true
                            })
                        ]
                    }),
                    ...members.normal,
                    new Paragraph({
                        indent: {
                            firstLine: 850
                        },
                        children: [
                            new TextRun({
                                text: `Комисията разгледа постъпилите до ${moment(protocol.date).format('DD.MM.YYYY')} г. документи ( заявлениe – приложение № 16 от Наредба №15/22.07.2019 г. на МОН за статута и професионалното развитие на учителите, директорите и другите педагогически специалисти и други придружаващи документи) до началника на РУО–София-град и взе следните решения: `,
                                size: 24,
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
                                                    text: '№',
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
                                                    text: 'Вх. № в РУО–София-град',
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
                                                    text: 'Име, презиме и фамилия',
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
                                                    text: 'Предлага за признаване на квалификационни кредита за обучение/участие в конференция с доклад/публикация и др, проведена от…../обучителна организация/ в периода от…до……………за …..бр. академични часове и издаване на удостоверение от началника на РУО – София-град',
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
                                                    text: 'Отказва признаване на квалификационни кредити – нормативно основание  за отказ и изготвяне на писма за отказ',
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
                        indent: {
                            firstLine: 850
                        },
                        children: [
                            new TextRun({
                                text: 'На педагогическите специалисти са подготвени проекти на удостоверения за признаване на квалификационни кредити и/или писма за отказ на признаване на квалификационни кредити. Направените откази от страна на комисията са съобразени с Наредба 15/22.07.2019 г. за статута и професионалното развитие на учителите, директорите и другите педагогически специалисти.',
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
                                text: `Приложения към протокола: Заявления и придружаващи документи за ${protocol.application.length}/пет/ педагогически специалисти, описани в протокола.`,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        indent: {
                            start: 850
                        },
                        spacing: {
                            before: 1000,
                            line: 360
                        },
                        children: [
                            new TextRun({
                                text: `Председател: ${protocol.president}……………………`,
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
                            line: 360
                        },
                        children: [
                            new TextRun({
                                text: 'Членове: ',
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    ...members.bold
                ]
            }
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `protocol_${protocol.number}_${moment(protocol.date).format('DD.MM.YYYY')}.docx`);
    });
}