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

const CertificateExcelDocument = ({ certificates }) => {
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
            <ExcelSheet data={certificates} name="Сертификати">
                <ExcelColumn label="вх.№ на заявление" value="ruoNumber" />
                <ExcelColumn label="Име Презиме Фамилия" value="fullName" />
                <ExcelColumn label="Обучаваща организация" value="institution" />
                <ExcelColumn label="тема на обучението /форма/ публикация" value="theme" />
                <ExcelColumn label="период на провеждане" value="period" />
                <ExcelColumn label="брой часове" value="lessonHours" />
                <ExcelColumn label="брой признати кредити" value="credits" />
                <ExcelColumn label="бр. с думи" value="credits" />
                <ExcelColumn label="издадено удостоверение №" value="certificateNumber" />
            </ExcelSheet>
        </ExcelFile>
    );
}

export default CertificateExcelDocument;