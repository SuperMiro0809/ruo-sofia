import React from 'react';
import './TeacherCertificatePDF.scss';
import moment from 'moment';

const TeacherCertificatePDF = React.forwardRef(({ teacher, index }, ref) => {
    return (
        <>
            <div ref={ref} className="TeacherCertificatePDF pdf">
                <header>
                    <p>МИНИСТЕРСТВО НА ОБРАЗОВАНИЕТО И НАУКАТА</p>
                    <p>РЕГИОНАЛНО УПРАВЛЕНИЕ НА ОБРАЗОВАНИЕТО – СОФИЯ-ГРАД</p>
                    <p>София 1303, ул. „Антим I”, № 17, тел.:9356050, факс:9883937, e-mail: rio_sofia_grad@mon.bg, www.ruo-sofia-grad.com</p>
                </header>
                <section className="documents">
                    <p>Приложение № 28 към чл. 53, ал. 1</p>
                    <p>Наредба №15/22.07.2019 г. на МОН</p>
                </section>
                <section className="title">
                    <p>Удостоверение</p>
                    <p>за признаване на квалификационни кредити</p>
                </section>
                <section className="subtitle">
                    <p>регистрационен № {teacher.application[index].ruoNumber}/{moment(teacher.application[index].date).format('DD.MM.YYYY')} г.</p>
                </section>
                <section className="main-info">
                    <article className="name">
                        <p>на {`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`}</p>
                        <p>(име, презиме, фамилия)</p>
                    </article>
                    <article className="workplace">
                        <p>на длъжност - {teacher.application[index].workplace.position}</p>
                        <p>месторабота - {teacher.application[index].workplace.place}</p>
                        <p>гр. (с.) {teacher.application[index].workplace.city}, обл. {teacher.application[index].workplace.area}</p>
                    </article>
                    <p>е участвал(а) в териотично обучение</p>
                </section>
            </div>
        </>
    )
})

export default TeacherCertificatePDF;