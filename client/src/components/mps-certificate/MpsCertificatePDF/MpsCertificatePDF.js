import React from 'react';
import './MpsCertificatePDF.scss';
import moment from 'moment';

const MpsCertificatePDF = React.forwardRef(({ mps }, ref) => {

    return (
        <div ref={ref} className="MpsCertificatePDF">
            {/* <article className="image-article">
                <img src="/static/background/mps.png" width="790px" height="1114px" />
            </article> */}
            <div><span>{mps.number}</span></div>
            <div><span>{moment(mps.date).format('DD.MM')}</span></div>
            <div><span>{moment(mps.date).format('YY')}</span></div>
            <div><span>София-град</span></div>
            <div><span>{mps.firstName} {mps.middleName} {mps.lastName}</span></div>
            <div><span>ЕГН/ЛНЧ/ИДН</span></div>
            <div><span>{mps.egn}, дата на раждане {moment(mps.dateOfBirth).format('DD.MM.YYYY')} г.</span></div>
            <div><span>гражданство: {mps.citizenship}</span></div>
            <div><span>{mps.documentNumber}</span></div>
            <div><span>{moment(mps.documentDate).format('DD.MM.YYYY')}</span></div>
            <div><span>{mps.school}</span></div>
            <div><span>{mps.city}</span></div>
            <div><span>{mps.country}</span></div>
            <div><span>{mps.class}</span></div>
        </div>
    )
})

export default MpsCertificatePDF;