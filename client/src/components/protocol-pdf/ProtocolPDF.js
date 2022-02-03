import React from 'react';
import './ProtocolPDF.scss';
import PDFHeader from '../pdf/PDFHeader';
import moment from 'moment';

const ProtocolPDF = React.forwardRef(({protocol, formText}, ref) => {
    return (
        <>
            <div ref={ref} className="ProtocolPDF pdf">
                <div className="top-level">
                    <p>Класификация на информацията:</p>
                    <p>Ниво 2, [TLP-AMBER]</p>
                </div>
                <PDFHeader />
                <div className="main">
                    <section className="title-wrapper">
                        <p className="title">ПРОТОКОЛ</p>
                        <p className="date-and-number">№ {protocol.number}/ {moment(protocol.date).format('DD.MM.YYYY')} г.</p>
                    </section>
                    <section className="protocol-info-wrapper">
                        <article className="about">
                            <p><b>ОТНОСНО: </b>{protocol.about}</p>
                        </article>
                        <article className="members">
                            <p>На {moment(protocol.date).format('DD.MM.YYYY')} г. се проведе заседание на комисията в следния състав:</p>
                            <p><b>Председател: </b>{protocol.president}</p>
                            <b>Членове:</b>
                            <ol style={{marginLeft: '15px'}}>
                                {JSON.parse(protocol.members).map((member, index) => (
                                    <li key={index}>{member}</li>
                                ))}
                            </ol>
                        </article>
                    </section>
                    <section className="above-table-text">
                        <p>Комисията разгледа постъпилите до {moment(protocol.date).format('DD.MM.YYYY')} г. документи ( заявлениe – приложение № 16 от Наредба №15/22.07.2019 г. на МОН за статута и професионалното развитие на учителите, директорите и другите педагогически специалисти и други придружаващи документи) до началника на РУО–София-град и взе следните решения: </p>
                    </section>
                    <table>
                        <thead>
                            <tr>
                                <th>№</th>
                                <th>Вх. № в РУО–София-град</th>
                                <th>Име, презиме и фамилия</th>
                                <th>Предлага за признаване на квалификационни кредита за обучение/участие в конференция с доклад/публикация и др, проведена от…../обучителна организация/ в периода от…до……………за …..бр. академични часове и издаване на удостоверение от началника на РУО – София-град</th>
                                <th>Отказва признаване на квалификационни кредити – нормативно основание  за отказ и изготвяне на писма за отказ</th>
                            </tr>
                        </thead>
                        <tbody>
                            {protocol.application.map((application, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{application.ruoNumber}</td>
                                    <td>{`${application.teacher.firstName} ${application.teacher.middleName} ${application.teacher.lastName}`}</td>
                                    <td>{formText(application, "approve")}</td>
                                    <td>{formText(application, "notApprove")}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <section className="bottom-table-text">
                        <p>На педагогическите специалисти са подготвени проекти на удостоверения за признаване на квалификационни кредити и/или писма за отказ на признаване на квалификационни кредити. Направените откази от страна на комисията са съобразени с Наредба 15/22.07.2019 г. за статута и професионалното развитие на учителите, директорите и другите педагогически специалисти.</p>
                        <p>Приложения към протокола: Заявления и придружаващи документи за {protocol.application.length}/пет/ педагогически специалисти, описани в протокола.</p>
                    </section>
                    <article className="members" style={{fontWeight: 'bold'}}>
                            <p><b>Председател: </b>{protocol.president} ........................</p>
                            <b>Членове:</b>
                            <ol style={{marginLeft: '15px'}}>
                                {JSON.parse(protocol.members).map((member, index) => (
                                    <li key={index}>{member} ........................</li>
                                ))}
                            </ol>
                    </article>
                </div>
            </div>
            <style type="text/css" media="print">{"\
            @page {\ size: landscape;\ }\
            "}</style>
        </>

    );
})

export default ProtocolPDF;