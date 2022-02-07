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

const ProtocolExcelDocument = ({ protocols }) => {
    let data = [];
    protocols.forEach(protocol => {
        const el = {
            number: protocol.number,
            date: moment(protocol.date).format('DD.MM.YYYY'),
            about: protocol.about,
            president: protocol.president,
            members: protocol.membersString
        }

        data.push(el);
    });
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
            <ExcelSheet data={data} name="Протоколи">
                <ExcelColumn label="Номер" value="number" />
                <ExcelColumn label="Дата" value="date" />
                <ExcelColumn label="Относно" value="about" />
                <ExcelColumn label="Председател" value="president" />
                <ExcelColumn label="Членове" value="members" />
            </ExcelSheet>
        </ExcelFile>
    );
}

export default ProtocolExcelDocument;