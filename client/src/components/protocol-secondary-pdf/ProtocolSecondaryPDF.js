import React from 'react';
import './ProtocolSecondaryPDF.scss';
import moment from 'moment';

const ProtocolSecondaryPDF = React.forwardRef(({ protocol }, ref) => {
    return (
        <>
            <div className="ProtocolSecondaryPDF pdf" ref={ref}>
                <div className="top-level">
                    <p>Класификация на информацията:</p>
                    <p>Ниво 2, [TLP-AMBER]</p>
                </div>
                <div className="main">
                    <section className="title-wrapper">
                        <p>ПРОТОКОЛ № {protocol.number}</p>
                    </section>
                    <section className="main-text-wrapper">
                        <p>Днес, {moment(protocol.date).format('DD.MM.YYYY')} г., се проведе редовно заседание на комисията, назначена със назначена със заповед № {protocol.orderNumber}/{moment(protocol.orderDate).format('DD.MM.YYYY')} г., изменена със заповед №РД01-229/26.05.2020 г., заповед №РД01-595/23.09.2020 г. и заповед №РД01-348/28.06.2021 г.  на Началника на РУО – София-град, във връзка с постъпили заявления за признаване на средно образование, съгласно Наредба № 11 от 01.09.2016 г. за оценяване на резултатите от обучението на учениците.</p>
                    </section>
                    <section className="main-info-wrapper">
                        <article className="above-table-text">
                            <b>Комисията РЕШИ:</b>
                            <p>Признава завършено средно образование и/или професионална квалификация по документи, издадени от Европейските училища и училища на чужди държави, и издава удостоверение (уверение) по чл. 32 от Наредба № 8 от 11 август 2016 г. за информацията и документите за системата на предучилищното и училищното образование, във връзка с чл.110, ал.1 от Наредба № 11 от 01.09.2016 г. за оценяване на резултатите от обучението на учениците, както следва:</p>
                        </article>
                        <table>
                            <thead>
                                <tr>
                                    <th>Удостоверение №</th>
                                    <th>Име, презиме, фамилия</th>
                                    <th>Входящ номер на заявлението</th>
                                    <th>Признава завършено:</th>
                                    <th>Документ, издаден от:</th>
                                </tr>
                            </thead>
                            <tbody>
                                {protocol.application.map((application, index) => (
                                    <tr key={index}>
                                        <td>{`${protocol.number}-${index + 1}`}</td>
                                        <td>{application.name}</td>
                                        <td>{`${application.inNumber}/ ${moment(application.inDate).format('DD/MM/YYYY')} г.`}</td>
                                        <td>{application.admits}</td>
                                        <td>{`${application.school}, ${application.cityAndCountry}`}</td>
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

export default ProtocolSecondaryPDF;