import React from 'react';
import './TeacherLetterPDF.scss';
import moment from 'moment';

const TeacherLetterPDF = React.forwardRef(({ teacher, index, application, el }, ref) => {

    return (
        <>
            <div ref={ref} className="TeacherLetterPDF pdf">
                <div className="top-level">
                    <p>Класификация на информацията:</p>
                    <p>Ниво 2, [TLP-AMBER]</p>
                </div>
                <header>
                    <p>МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА</p>
                    <p>РЕГИОНАЛНО УПРАВЛЕНИЕ НА ОБРАЗОВАНИЕТО – СОФИЯ-ГРАД</p>
                    <p>София 1303, ул. „Антим I”, № 17, тел.:9356050, факс:9883937, e-mail: rio_sofia_grad@mon.bg, www.ruo-sofia-grad.com</p>
                </header>
                <hr />
                <hr />
                <section className="top">
                    <p>Изх. № РУО1-…………………………… г.</p>
                    <article className="to">
                        <p>ДО</p>
                        <p>Г-Н/Г-ЖА {teacher.firstName} {teacher.lastName},</p>
                        <p>гр. София</p>
                        <p>{application.adress}</p>
                    </article>
                </section>
                <main>
                    <p className="introduction">Уважаеми господин/госпожа {teacher.lastName},</p>
                    <p className="letter">Във връзка с подадено от Вас заявление с вх. № РУО1-{application.ruoNumber}/{moment(application.date).format('DD.MM.YYYY')} г. за признаване на квалификационни кредити  Ви уведомявам, че {el.notApprove}</p>
                </main>
                <footer>
                    <p>Д-Р ВАНЯ КАСТРЕВА</p>
                    <p>НАЧАЛНИК НА РУО-СОФИЯ-ГРАД</p>
                </footer>
            </div>
        </>
    )
})

export default TeacherLetterPDF;