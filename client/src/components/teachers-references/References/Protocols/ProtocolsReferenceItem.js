import { 
    TableRow,
    TableCell
} from '@material-ui/core';
import moment from 'moment';

const ProtocolsReferenceItem = ({protocol}) => {
    return (
        <TableRow>
            <TableCell>
                {protocol.number}
            </TableCell>
            <TableCell>
                {moment(protocol.date).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell>
                {protocol.about}
            </TableCell>
            <TableCell>
                {protocol.president}
            </TableCell>
            <TableCell>
                {protocol.membersString}
            </TableCell>
        </TableRow>
    );
}

export default ProtocolsReferenceItem;