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

const formatTeacherData = (teachers) => {
    let data = [];

    teachers.forEach((teacher) => {
        teacher.application.forEach((application, index) => {
            const teaching = TeacherDataElement(application, 'teaching');
            const report = TeacherDataElement(application, 'report');
            const publication = TeacherDataElement(application, 'publication');
    
            teaching.forEach((th) => {
                data.push(th);
            })
            report.forEach((rp) => {
                data.push(rp);
            })
            publication.forEach((publ) => {
                data.push(publ);
            })
        })
    })

    return data;
}

const TeacherDataElement = (application, mode) => {
    let result = [];

    application[mode].forEach((modeEl) => {
        let el = {
            ruoNumber: application.ruoNumber,
            approve: modeEl.approve ? modeEl.approve : '-',
            notApprove: modeEl.notApprove ? modeEl.notApprove : '-'
        }

        result.push(el);
    })

    return result;
}

const TeachersExcelDocument = ({ teachers }) => {
    let data = formatTeacherData(teachers);

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
            <ExcelSheet data={data} name="Заявления">
                <ExcelColumn label="Входящ номер" value="ruoNumber" />
                <ExcelColumn label="Издадено е удостоверение" value="approve" />
                <ExcelColumn label="Отказано е признаване на квалификационни кредити" value="notApprove" />
            </ExcelSheet>
        </ExcelFile>
    );
}

export default TeachersExcelDocument;