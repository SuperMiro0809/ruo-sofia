import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentClassCertificatePDF.scss';
import moment from 'moment';
import committeEducationServices from '../../../services/committe-education';

const StudentClassCertificatePDF = React.forwardRef(({ application, student }, ref) => {
    const navigate = useNavigate();
    const [committe, setCommitte] = useState({ president: '' });
    // const gradesArr = [
    //     {
    //         subjectName: 'Английски език',
    //         grade: '6'
    //     },
    //     {
    //         subjectName: 'Български език и литература',
    //         grade: '6'
    //     },
    //     {
    //         subjectName: 'Испански език',
    //         grade: '6'
    //     },
    //     {
    //         subjectName: 'Математика',
    //         grade: '6'
    //     },
    //     {
    //         subjectName: 'Информационни технологии',
    //         grade: '5'
    //     },
    //     {
    //         subjectName: 'История и цивилизации',
    //         grade: '4'
    //     },
    //     {
    //         subjectName: 'География и икономика',
    //         grade: '3'
    //     },
    //     {
    //         subjectName: 'Философия',
    //         grade: '2'
    //     },
    //     {
    //         subjectName: 'Философия',
    //         grade: '2'
    //     },
    //     {
    //         subjectName: 'Философия',
    //         grade: '2'
    //     },
    //     {
    //         subjectName: 'Философия',
    //         grade: '2'
    //     },
    //     {
    //         subjectName: 'Философия',
    //         grade: '2'
    //     },
    //     {
    //         subjectName: 'Философия',
    //         grade: '2'
    //     },
    //     {
    //         subjectName: 'Информационни технологии',
    //         grade: '5'
    //     },
    //     {
    //         subjectName: 'История и цивилизации',
    //         grade: '4'
    //     },
    //     {
    //         subjectName: 'География и икономика',
    //         grade: '3'
    //     },
    //     {
    //         subjectName: 'Информационни технологии',
    //         grade: '5'
    //     },
    //     {
    //         subjectName: 'История и цивилизации',
    //         grade: '4'
    //     },
    //     {
    //         subjectName: 'География и икономика',
    //         grade: '3'
    //     },
    // ];

    useEffect(() => {
        committeEducationServices.getAll()
            .then(data => {
                setCommitte(data[0]);
            })
            .catch(err => {
                if (err.message === 'Unauthorized') {
                    navigate('/login');
                }
            })
    }, []);

    const gradeInWords = (grade) => {
        switch(grade) {
            case '6': return 'Отличен';
            case '5': return 'Много добър';
            case '4': return 'Добър';
            case '3': return 'Среден';
            case '2': return 'Слаб';
        }
    }

    return (
        <div ref={ref} className="StudentClassCertificatePDF">
            <div className="page-one">
                <div><span>{application.protocol.number} - {application.protocol_order}</span></div>
                <div><span>{moment(application.dateOut).format('DD.MM')}</span></div>
                <div><span>{moment(application.dateOut).format('YY')}</span></div>
                <div><span>София-град</span></div>
                <div><span>{application.admits}</span></div>
                <div><span>{student.name}</span></div>
                <div><span>{`ЕГН/ ЛНЧ ${student.egn}, р. ${moment(student.dateOfBirth).format('DD.MM.YYYY')} г., гражд. ${student.citizenship}`}</span></div>
                {application.documentNumber ?
                    <div><span>{application.documentNumber}</span></div> :
                    <div><span>-</span></div>
                }
                <div><span>{moment(application.documentDate).format('DD.MM.YYYY')}</span></div>
                <div><span>{student.school}</span></div>
                <div><span>{student.cityAndCountry}</span></div>
                {application.equivalenceExamsDate ?
                    <div><span>{`${moment(application.equivalenceExamsDate).format('DD.MM.YYYY')} г.`}</span></div> :
                    <div><span></span></div>
                }
                <div><span>{application.class}</span></div>
                {application.equivalenceExamsDate ?
                    <div><p>{JSON.parse(application.equivalenceExams).map(el => el.subjectName).join(' ')}</p></div> :
                    <div><p></p></div>
                }
                <div><span>{committe.president}</span></div>
                <section className="grade-wrapper">
                    {JSON.parse(application.grades).map((grade, index) => (
                        <article className="grade" key={index}>
                            <p>{grade.subjectName}</p>
                            <p>{gradeInWords(grade.grade)} {grade.grade}</p>
                        </article>
                    ))}
                </section>
                {/* <div className="first-page">
                    <article className="image-article">
                        <img src="/static/background/background1.jpg" width="595px" height="841px" />
                    </article>
                    <div><span>11</span></div>
                    <div><span>6.3.20</span></div>
                    <div><span>22</span></div>
                    <div><span>София-град</span></div>
                    <div><span>ЗАВЪРШЕН ЕДИНАДЕСЕТИ КЛАС</span></div>
                    <div><span>dsd</span></div>
                    <div><span>ЕГН/ ЛНЧ</span></div>
                    <div><span>11111111</span></div>
                    <div><span>, р.12.12.2005</span></div>
                    <div><span>г., гражд.</span></div>
                    <div><span>dsds</span></div>
                    <div><span>1</span></div>
                    <div><span>12.12.2012</span></div>
                    <div><span>dsds</span></div>
                    <div><span>dsds</span></div>
                    <div><span>XI</span></div>
                    <div><span>Физическо възпитание и спорт</span></div>
                    <div><span>Отличен</span></div>
                    <div><span>6</span></div>
                    <div><span>Кристина Габровска</span></div>
                </div>
                <div className="second-page">
                    <article className="image-article">
                        <img src="/static/background/background2.jpg" width="595px" height="841px" />
                    </article>
                    <div><span>Кристина Габровска</span></div>
                </div> */}
            </div>
            <div className="page-two">
                <div><span>{committe.president}</span></div>
            </div>
        </div>
    )
})

export default StudentClassCertificatePDF;