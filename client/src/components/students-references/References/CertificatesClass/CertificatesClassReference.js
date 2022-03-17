import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress
} from '@material-ui/core';
import CertificatesClassReferenceItem from './CertificatesClassReferenceItem';

const CertificatesClassReferene = ({ certificates, loader, page, limit }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Входящ номер
                    </TableCell>
                    <TableCell>
                        Име Презиме Фамилия
                    </TableCell>
                    <TableCell>
                        Регистрационен номер
                    </TableCell>
                    <TableCell>
                        Дата на издаване
                    </TableCell>
                    <TableCell>
                        Клас
                    </TableCell>
                    <TableCell>
                        Признава
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {loader ?
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="6"><CircularProgress size="30px" /></TableCell>
                  </TableRow>
                  :
                  <>
                    {certificates.length !== 0 ?
                      <>
                        {certificates.slice(page * limit, page * limit + limit).map((certificate, index) => (
                            <CertificatesClassReferenceItem key={index} certificate={certificate} />
                        ))}
                      </>
                      :
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="6">Няма записи</TableCell>
                      </TableRow>
                    }
                  </>
                }
            </TableBody>
        </Table>
    );
}

export default CertificatesClassReferene;