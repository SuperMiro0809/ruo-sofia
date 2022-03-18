import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './StudentSecondaryCertificatePDF.scss';
import moment from 'moment';
import committeEducationServices from '../../../services/committe-education';

const StudentSecondaryCertificatePDF = React.forwardRef(({ application }, ref) => {
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
        switch (grade) {
            case '6': return 'Отличен';
            case '5': return 'Много добър';
            case '4': return 'Добър';
            case '3': return 'Среден';
            case '2': return 'Слаб';
        }
    }

    return (
        <div ref={ref} className="StudentSecondaryCertificatePDF">
            <div className="page-one">
                <div><span>{application.registerNumber}</span></div>
                <div><span>{moment(application.dateOut).format('DD.MM')}</span></div>
                <div><span>{moment(application.dateOut).format('YY')}</span></div>
                <div><span>София-град</span></div>
                <div><span>{application.admits}</span></div>
                <div><span>{application.name}</span></div>
                <div><span>{`ЕГН/ ЛНЧ ${application.egn}, р. ${moment(application.dateOfBirth).format('DD.MM.YYYY')} г., гражд. ${application.citizenship}`}</span></div>
                {application.documentNumber ?
                    <div><span>{application.documentNumber}</span></div> :
                    <div><span>-</span></div>
                }
                <div><span>{moment(application.documentDate).format('DD.MM.YYYY')}</span></div>
                <div><span>{application.school}</span></div>
                <div><span>{application.cityAndCountry}</span></div>
                <div><span>{committe.president}</span></div>
                <section className="grade-wrapper">
                    {JSON.parse(application.grades).map((grade, index) => (
                        <article className="grade" key={index}>
                            <p>{grade.subjectName}</p>
                            <p>{gradeInWords(grade.grade)} {grade.grade}</p>
                        </article>
                    ))}
                </section>
                {application.admits === 'ЗАВЪРШЕНО СРЕДНО С ПКС' &&
                    <article className="pks-wrapper">
                        <span>Професия {application.profession}, Специалност {application.speciality}</span>
                    </article>
                }
            </div>
            <div className="page-two">
                <div><span>{committe.president}</span></div>
            </div>
        </div>
    )
})

export default StudentSecondaryCertificatePDF;