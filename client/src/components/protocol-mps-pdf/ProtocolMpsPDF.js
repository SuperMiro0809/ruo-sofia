import React from 'react';
import './ProtocolMpsPDF.scss';
import moment from 'moment';

const ProtocolMpsPDF = React.forwardRef(({ protocol }, ref) => {
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

    return (
        <>
            <div className="ProtocolMpsPDF pdf" ref={ref}>
                <div className="top-level">
                    <p>Класификация на информацията:</p>
                    <p>Ниво 2, [TLP-AMBER]</p>
                </div>
                <div className="main">
                    <section className="title-wrapper">
                        <p>ПРОТОКОЛ № {protocol.number}/ {moment(protocol.date).format('DD.MM.YYYY')} г.</p>
                    </section>
                    <section className="main-text-wrapper">
                        <p style={{ textIndent: '50px' }}>Днес, {moment(protocol.date).format('DD.MM.YYYY')} г., се проведе редовно заседание на комисията, назначена със назначена със Заповед №{protocol.orderNumber}/ {moment(protocol.orderDate).format('DD.MM.YYYY')} г. на Началника на РУО – София-град, във връзка с постъпили заявления за признаване на завършени етапи на училищно обучение или степени на образование и професионална квалификация по документи, издадени от училища на чужди държави. Комисията РЕШИ:</p>
                    </section>
                    <section className="main-info-wrapper">
                        <article className="above-table-text">
                            <ol>
                                <li>Признава завършен гимназиален клас или степен на образование по документи, издадени от чужди държави, и издава уверение по чл. 110 ал. 2 от Наредба №11 от 01.09.2016 г. за оценяване на резултатите от обучението на учениците, на следните лица:</li>
                            </ol>
                        </article>
                        <table>
                            <thead>
                                <tr>
                                    <th>Уверения №</th>
                                    <th>Име, презиме, фамилия</th>
                                    <th>Входящ номер на заявление</th>
                                    <th>От дата</th>
                                    <th>Признава завършен</th>
                                    <th>Документ, издаден от</th>
                                </tr>
                            </thead>
                            <tbody>
                                {protocol.applications.map((application, index) => (
                                    <tr key={index}>
                                        <td>{`${protocol.number} - ${index + 1}`}</td>
                                        <td>{application.name}</td>
                                        <td>{application.number}</td>
                                        <td>{moment(application.inDate).format('DD.MM.YYYY')} г.</td>
                                        <td>{admitsObj[application.class]}</td>
                                        <td>{`${application.school}, ${application.city}, ${application.country}`}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <article className="committe">
                            <p className="committe-title">Председател на комисията:</p>
                            <article>
                                <ol style={{ listStyleType: 'none' }}>
                                    <li>
                                        <div className="committe-item">
                                            <p>{protocol.president}</p>
                                            <p>...................................</p>
                                        </div>
                                    </li>
                                </ol>
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

export default ProtocolMpsPDF;