import React from "react";
import ReactExport from "react-export-excel";
import {
    Button
} from '@material-ui/core';
import {
    FileDownload as ExportIcon
} from '@material-ui/icons';
import moment from 'moment';

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const CertificateAllExcelDocument = ({ certificates }) => {
    let data = [];
    certificates.forEach((certificate) => {
        const el = {
            inNumber: `${certificate.inNumber}/ ${moment(certificate.inDate).format('DD.MM.YYYY')}`,
            name: certificate.student ? certificate.student.name : certificate.name,
            registerNumber: certificate.registerNumber,
            dateOut: moment(certificate.dateOut).format('DD.MM.YYYY'),
            admits: certificate.admits
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
                <ExcelColumn label="Входящ номер" value="inNumber" />
                <ExcelColumn label="Име Презиме Фамилия" value="name" />
                <ExcelColumn label="Регистрационен номер" value="registerNumber" />
                <ExcelColumn label="Дата на издаване" value="dateOut" />
                <ExcelColumn label="Признава" value="admits" />
            </ExcelSheet>
        </ExcelFile>
    );
}

export default CertificateAllExcelDocument;