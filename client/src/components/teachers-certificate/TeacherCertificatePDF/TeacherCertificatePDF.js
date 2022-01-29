import React from 'react';
import './TeacherCertificatePDF.scss';
import moment from 'moment';

const TeacherCertificatePDF = React.forwardRef(({ teacher, index, application, el }, ref) => {

    return (
        <>
            <div ref={ref} className="TeacherCertificatePDF pdf" style={{ backgroundImage: 'url(/static/images/certificate_border.png)' }}>
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
                    <p>регистрационен № {application.ruoNumberOut}/{moment(application.dateOut).format('DD.MM.YYYY')} г.</p>
                </section>
                <section className="main-info">
                    <article className="name">
                        <p>на {`${teacher.firstName} ${teacher.middleName} ${teacher.lastName}`}</p>
                        <p>(име, презиме, фамилия)</p>
                    </article>
                    <article className="workplace">
                        <p>на длъжност - {application.workplace.position}</p>
                        <p>месторабота - {application.workplace.place}</p>
                        <p>гр. (с.) {application.workplace.city}, обл. {application.workplace.area}</p>
                    </article>
                    <p>е участвал(а) в териотично обучение</p>
                    <p>проведено от {el.institution}</p>
                    <p>в периода от {moment(el.startDate).format('DD.MM.YYYY')} до {moment(el.endDate).format('DD.MM.YYYY')} г. с продължителност {el.lessonHours} академични часа</p>
                    <p>на тема {el.theme}</p>
                    <p>за което са признати {el.credits} квалификационен кредит.</p>
                </section>
                <footer>
                    <p>Началник на Регионално управление на образованието - гр. София……………….</p>
                    <p class="chief">(д-р Ваня Кастрева)</p>
                </footer>
            </div>
        </>
    )
})

export default TeacherCertificatePDF;