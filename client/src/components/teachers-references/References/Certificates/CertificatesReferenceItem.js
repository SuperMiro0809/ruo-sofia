import { 
    TableRow,
    TableCell
} from '@material-ui/core';

const CertificatesReferenceItem = ({certificate}) => {
    return (
        <TableRow>
            <TableCell>
                {certificate.ruoNumber}
            </TableCell>
            <TableCell>
                {certificate.fullName}
            </TableCell>
            <TableCell>
                {certificate.institution}
            </TableCell>
            <TableCell>
                {certificate.theme}
            </TableCell>
            <TableCell>
                {certificate.period}
            </TableCell>
            <TableCell>
                {certificate.lessonHours ? certificate.lessonHours : '-'}
            </TableCell>
            <TableCell>
                {certificate.credits}
            </TableCell>
            <TableCell>
                {certificate.certificateNumber}
            </TableCell>
        </TableRow>
    );
}

export default CertificatesReferenceItem;