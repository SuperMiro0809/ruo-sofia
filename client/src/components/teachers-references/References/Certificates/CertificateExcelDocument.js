import React from "react";
import ReactExport from "react-export-excel";
import {
    Button
} from '@material-ui/core';
import {
    FileDownload as ExportIcon
} from '@material-ui/icons';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const creditsToWords = (credits) => {
    switch (credits) {
        case 1:
            return 'един';
            break;
        case 2:
            return 'два';
            break;
        case 3:
            return 'три';
            break;
        case 4:
            return 'четири';
            break;
        case 5:
            return 'пет';
            break;
        case 6:
            return 'шест';
            break;
        case 7:
            return 'седем';
            break;
        case 8:
            return 'осем';
            break;
        case 9:
            return 'девет';
            break;
        case 10:
            return 'десет';
            break;
    }
}

const CertificateExcelDocument = ({ certificates }) => {
    let data = [];
    certificates.forEach((certificate) => {
        const el = {
            ruoNumber: certificate.ruoNumber,
            fullName: certificate.fullName,
            institution: certificate.institution,
            theme: certificate.theme,
            period: certificate.period,
            lessonHours: certificate.lessonHours,
            credits: certificate.credits,
            creditsWords: creditsToWords(certificate.credits),
            certificateNumber: certificate.certificateNumber
        };

        data.push(el);
    })

    return (
        <ExcelFile element={
            <Button
                color="success"
                variant="contained"
                startIcon={<ExportIcon />}
            >
                Експорт към Excel
            </Button>
        }>
            <ExcelSheet data={data} name="Сертификати">
                <ExcelColumn label="вх.№ на заявление" value="ruoNumber" />
                <ExcelColumn label="Име Презиме Фамилия" value="fullName" />
                <ExcelColumn label="Обучаваща организация" value="institution" />
                <ExcelColumn label="тема на обучението /форма/ публикация" value="theme" />
                <ExcelColumn label="период на провеждане" value="period" />
                <ExcelColumn label="брой часове" value="lessonHours" />
                <ExcelColumn label="брой признати кредити" value="credits" />
                <ExcelColumn label="бр. с думи" value="creditsWords" />
                <ExcelColumn label="издадено удостоверение №" value="certificateNumber" />
            </ExcelSheet>
        </ExcelFile>
    );
}

export default CertificateExcelDocument;