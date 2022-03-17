import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress
} from '@material-ui/core';
import CertificatesAllReferenceItem from './CertificatesAllReferenceItem';

const CertificatesSecondaryReferene = ({ certificates, loader, page, limit }) => {
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
                        Признава
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {loader ?
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="5"><CircularProgress size="30px" /></TableCell>
                  </TableRow>
                  :
                  <>
                    {certificates.length !== 0 ?
                      <>
                        {certificates.slice(page * limit, page * limit + limit).map((certificate, index) => (
                            <CertificatesAllReferenceItem key={index} certificate={certificate} />
                        ))}
                      </>
                      :
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="5">Няма записи</TableCell>
                      </TableRow>
                    }
                  </>
                }
            </TableBody>
        </Table>
    );
}

export default CertificatesSecondaryReferene;