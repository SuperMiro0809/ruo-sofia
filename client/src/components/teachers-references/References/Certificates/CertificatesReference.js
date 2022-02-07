import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress
} from '@material-ui/core';
import CertificatesReferenceItem from './CertificatesReferenceItem';

const CertificatesReferene = ({ certificates, loader, page, limit }) => {
    console.log(certificates);
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Входящ № на заявление
                    </TableCell>
                    <TableCell>
                        Име Презиме Фамилия
                    </TableCell>
                    <TableCell>
                        Обучаваща организация
                    </TableCell>
                    <TableCell>
                        Тема на обучението /форма/ публикация
                    </TableCell>
                    <TableCell>
                        Период на провеждане
                    </TableCell>
                    <TableCell>
                        Брой часове
                    </TableCell>
                    <TableCell>
                        Брой признати кредити
                    </TableCell>
                    <TableCell>
                        Издадено удостоверение №
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {loader ?
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="8"><CircularProgress size="30px" /></TableCell>
                  </TableRow>
                  :
                  <>
                    {certificates.length !== 0 ?
                      <>
                        {certificates.slice(page * limit, page * limit + limit).map((certificate, index) => (
                            <CertificatesReferenceItem key={index} certificate={certificate} />
                        ))}
                      </>
                      :
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="8">Няма записи</TableCell>
                      </TableRow>
                    }
                  </>
                }
            </TableBody>
        </Table>
    );
}

export default CertificatesReferene;