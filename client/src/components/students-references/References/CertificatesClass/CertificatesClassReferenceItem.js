import { 
    TableRow,
    TableCell
} from '@material-ui/core';
import moment from 'moment';

const CertificatesClassReferenceItem = ({certificate}) => {
    return (
        <TableRow>
            <TableCell>
                {`${certificate.inNumber}/ ${moment(certificate.inDate).format('DD.MM.YYYY')}`}
            </TableCell>
            <TableCell>
                {certificate.student.name}
            </TableCell>
            <TableCell>
                {certificate.registerNumber}
            </TableCell>
            <TableCell>
                {moment(certificate.dateOut).format('DD.MM.YYYY')}
            </TableCell>
            <TableCell>
                {certificate.class}
            </TableCell>
            <TableCell>
                {certificate.admits}
            </TableCell>
        </TableRow>
    );
}

export default CertificatesClassReferenceItem;