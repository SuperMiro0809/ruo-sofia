import {
    Paragraph, 
    Document, 
    Packer, 
    AlignmentType, 
    TextRun, 
    Header, 
    ImageRun 
} from "docx";
import { saveAs } from "file-saver";
import image from './certificate_border.png';
import moment from 'moment';

export default async function generate(teacher, application, el, mode) {
    const letterHead = await fetch(image);
    const applItem = [];

    if(mode === 'teaching') {
        applItem.push(
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: 'е участвал в теоретично обучение',
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `проведено от ${el.institution}`,
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `в периода от ${moment(el.startDate).format('DD.MM.YYYY')} до ${moment(el.endDate).format('DD.MM.YYYY')} г. с продължителност ${el.lessonHours} академични часа`,
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `на тема ${el.theme}`,
                        size: 24,
                    })
                ]
            }),
        );
    }else if(mode === 'report') {
        applItem.push(
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: 'e подготвил(а) и представил(а) доклад или научно съобщение',
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `проведено от ${el.institution}`,
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `в периода от ${moment(el.startDate).format('DD.MM.YYYY')} до ${moment(el.endDate).format('DD.MM.YYYY')} г. с продължителност ${el.lessonHours} академични часа`,
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `на тема ${el.theme}`,
                        size: 24,
                    })
                ]
            }),
        );
    }else if(mode === 'publication') {
        applItem.push(
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: 'е публикувал(а) научна или методическа публикация в периодично издание',
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `проведено от ${el.institution}`,
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `в периода от ${moment(el.startDate).format('DD.MM.YYYY')} до ${moment(el.endDate).format('DD.MM.YYYY')} г.`,
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `на тема ${el.theme}`,
                        size: 24,
                    })
                ]
            }),
            new Paragraph({
                alignment: AlignmentType.JUSTIFIED,
                children: [
                    new TextRun({
                        text: `публикувано на ${el.published}`,
                        size: 24,
                    })
                ]
            }),
        );
    }

    const doc = new Document({
        sections: [
            {
                headers: {
                    default: new Header({
                        children: [
                            new Paragraph({
                                children: [
                                    new ImageRun({
                                        data: await letterHead.blob(),
                                        transformation: {
                                            width: 760,
                                            height: 1080
                                        },
                                        floating: {
                                            zIndex: 0,
                                            horizontalPosition: {
                                                offset: 150000,
                                            },
                                            verticalPosition: {
                                                offset: 250000,
                                            },
                                        },
                                    })
                                ]
                            })
                        ]
                    })
                },
                properties: {
                    page: {
                        margin: {
                            left: 1250,
                            right: 1250
                        }
                    }
                },
                children: [
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: 'МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА',
                                size: 20,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        children: [
                            new TextRun({
                                text: 'РЕГИОНАЛНО УПРАВЛЕНИЕ НА ОБРАЗОВАНИЕТО – СОФИЯ-ГРАД',
                                bold: true,
                                size: 20,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            after: 400
                        },
                        children: [
                            new TextRun({
                                text: 'София 1303, ул. „Антим I” № 17, тел.:9356050, rio_sofia_grad@mon.bg, www.ruo-sofia-grad.com',
                                size: 18,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.END,
                        children: [
                            new TextRun({
                                text: 'Приложение № 28 към чл. 53, ал. 1',
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.END,
                        spacing: {
                            after: 1050
                        },
                        children: [
                            new TextRun({
                                text: 'Наредба №15/22.07.2019 г. на МОН',
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            line: 400
                        },
                        children: [
                            new TextRun({
                                text: 'УДОСТОВЕРЕНИЕ',
                                size: 32,
                                bold: true
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            line: 400
                        },
                        children: [
                            new TextRun({
                                text: 'ЗА  ПРИЗНАВАНЕ НА КВАЛИФИКАЦИОННИ КРЕДИТИ',
                                size: 32,
                                bold: true
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.CENTER,
                        spacing: {
                            line: 400,
                            after: 500
                        },
                        children: [
                            new TextRun({
                                text: `регистрационен № ${application.ruoNumberOut}/${moment(application.dateOut).format('DD.MM.YYYY')} г.`,
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                            new TextRun({
                                text: `на ${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`,
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        indent: {
                            start: 850
                        },
                        children: [
                            new TextRun({
                                text: '(име, презиме, фамилия)',
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                            new TextRun({
                                text: `на длъжност -  ${application.workplace.position}`,
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                            new TextRun({
                                text: `месторабота – ${application.workplace.place}`,
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        children: [
                            new TextRun({
                                text: `гр. (с.)  ${application.workplace.city}, обл. ${application.workplace.area}`,
                                size: 24,
                            })
                        ]
                    }),
                    ...applItem,
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            after: 500
                        },
                        children: [
                            new TextRun({
                                text: `за което са признати ${el.credits} ${el.credits == 1 ? 'квалификационен кредит' : 'квалификационни кредита'}.`,
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.JUSTIFIED,
                        spacing: {
                            after: 250
                        },
                        children: [
                            new TextRun({
                                text: 'Началник на Регионално управление на образованието – гр.София………………',
                                size: 24,
                            })
                        ]
                    }),
                    new Paragraph({
                        alignment: AlignmentType.RIGHT,
                        children: [
                            new TextRun({
                                text: '(д-р Ваня Кастрева)',
                                size: 24,
                            })
                        ]
                    })
                ]
            }
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `protocol_${application.ruoNumberOut}_${moment(application.dateOut).format('DD.MM.YYYY')}.docx`);
    });
}