import { Paragraph, Document, Packer, AlignmentType, TextRun, Header, BorderStyle } from "docx";
import { saveAs } from "file-saver";
import moment from 'moment';

export default function generate(teacher, application, el) {
    const doc = new Document({
        sections: [
            {
                headers: {
                    default: new Header({
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
                                        size: 16,
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
                        spacing: {
                            after: 600
                        },
                        children: [
                            new TextRun({
                                text: 'Изх. № РУО1- …………………………… г.',
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: 'ДО',
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `Г-Н/Г-ЖА ${teacher.firstName} ${teacher.lastName}`,
                                bold: true,
                                size: 24,
                                allCaps: true
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: `ГР. ${application.workplace.city},`,
                                bold: true,
                                size: 24,
                                allCaps: true
                            }),
                        ]
                    }),
                    new Paragraph({
                        spacing: {
                            after: 600
                        },
                        children: [
                            new TextRun({
                                text: application.adress,
                                bold: true,
                                size: 24,
                                allCaps: true
                            })
                        ]
                    }),
                    new Paragraph({
                        spacing: {
                            after: 250
                        },
                        children: [
                            new TextRun({
                                text: `УВАЖАЕМИ ГОСПОДИН/ГОСПОЖА ${teacher.lastName},`,
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
                            after: 450
                        },
                        children: [
                            new TextRun({
                                text: `Във връзка с подадено от Вас заявление с вх. № РУО1-${application.ruoNumber}/${moment(application.date).format('DD.MM.YYYY')} г. за признаване на квалификационни кредити  Ви уведомявам, че ${el.notApprove}`,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: 'Д-Р ВАНЯ КАСТРЕВА',
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: 'НАЧАЛНИК НА РУО-СОФИЯ-ГРАД',
                                bold: true,
                                size: 24
                            })
                        ]
                    }),
                ]
            }
        ]
    });

    Packer.toBlob(doc).then((blob) => {
        saveAs(blob, `letter_${teacher.firstName}_${teacher.lastName}.docx`);
    });
}