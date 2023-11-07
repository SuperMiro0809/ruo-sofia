import React from 'react';
import './ProtocolClassPDF.scss';
import moment from 'moment';

const ProtocolClassPDF = React.forwardRef(({ protocol }, ref) => {
    return (
        <>
            <div className="ProtocolClassPDF pdf" ref={ref}>
                <div className="top-level">
                    <p>Класификация на информацията:</p>
                    <p>Ниво 2, [TLP-AMBER]</p>
                </div>
                <div className="main">
                    <section className="title-wrapper">
                        <p>ПРОТОКОЛ № {protocol.number}/ {moment(protocol.date).format('DD.MM.YYYY')} г.</p>
                    </section>
                    <section className="main-text-wrapper">
                        <p>Днес, {moment(protocol.date).format('DD.MM.YYYY')} г., се проведе редовно заседание на комисията, назначена със назначена със Заповед №{protocol.orderNumber}/ {moment(protocol.orderDate).format('DD.MM.YYYY')} г. на Началника на РУО – София-град, във връзка с постъпили заявления за признаване на завършен клас, съгласно Наредба № 11 от 01.09.2016 г. на МОН за оценяване на резултатите от обучението на учениците</p>
                    </section>
                    <section className="main-info-wrapper">
                        <article className="above-table-text">
                            <b>Комисията РЕШИ:</b>
                            <ol>
                                <li>Признава завършен клас по документи, издадени от чужди държави, на учениците както следва:</li>
                            </ol>
                        </article>
                        <table>
                            <thead>
                                <tr>
                                    <th>Рег. № на удостоверението</th>
                                    <th>Име, презиме, фамилия</th>
                                    <th>Входящ номер на заявление</th>
                                    <th>Признат завършен клас/срок</th>
                                    <th>Документ за завършен клас/срок, издаден от</th>
                                    <th>Да се положат приравнителни изпити по:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {protocol.application.map((application, index) => (
                                    <tr key={index}>
                                        <td>{`${protocol.number} - ${application.protocol_order}`}</td>
                                        <td>{application.student.name}</td>
                                        <td>{`${application.inNumber}/ ${moment(application.inDate).format('DD/MM/YYYY')} г.`}</td>
                                        <td>{application.admits}</td>
                                        <td>{`${application.student.school}, ${application.student.cityAndCountry}`}</td>
                                        <td>{JSON.parse(application.equivalenceExams).map(e => e.subjectName).join(', ')}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <article className="committe">
                            <p className="committe-title">Председател на комисията:</p>
                            <article>
                                <div className="president">
                                    <p>{protocol.president}</p>
                                    <p>...................................</p>
                                </div>
                            </article>

                            <p className="committe-title">Заместник-председатели:</p>
                            <article>
                                <ol>
                                    {JSON.parse(protocol.vicePresidents).map((vicePresident, index) => (
                                        <li key={index}>
                                            <div className="committe-item">
                                                <p>{vicePresident}</p>
                                                <p>...................................</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </article>

                            <p className="committe-title">Членове:</p>
                            <article>
                                <ol>
                                    {JSON.parse(protocol.members).map((member, index) => (
                                        <li key={index}>
                                            <div className="committe-item">
                                                <p>{member}</p>
                                                <p>...................................</p>
                                            </div>
                                        </li>
                                    ))}
                                </ol>
                            </article>
                        </article>
                    </section>
                </div>
            </div>
            <style type="text/css" media="print">{"\
            @page {\ size: landscape;\ }\
            "}</style>
        </>
    );
});

export default ProtocolClassPDF;