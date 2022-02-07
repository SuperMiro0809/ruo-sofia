import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    CircularProgress
} from '@material-ui/core';
import ProtocolsReferenceItem from './ProtocolsReferenceItem';

const ProtocolsReference = ({protocols, loader, page, limit}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Номер
                    </TableCell>
                    <TableCell>
                        Дата
                    </TableCell>
                    <TableCell>
                        Относно
                    </TableCell>
                    <TableCell>
                        Председател
                    </TableCell>
                    <TableCell>
                        Членове
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
                    {protocols.length !== 0 ?
                      <>
                        {protocols.slice(page * limit, page * limit + limit).map((protocol, index) => (
                          <ProtocolsReferenceItem key={index} protocol={protocol} />
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

export default ProtocolsReference;