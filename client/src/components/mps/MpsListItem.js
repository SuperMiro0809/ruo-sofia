import './MpsListItem.scss';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    TableCell,
    TableRow,
    Typography,
    IconButton,
    Collapse,
    Table,
    TableHead,
    TableBody,
    Button,
    Modal
} from '@material-ui/core';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    RemoveRedEyeSharp as PreviewIcon,
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import moment from 'moment';

const MpsListItem = ({ item, openProp, selectedMpsProp }) => {

    const openModal = (id) => {
        openProp.setOpen(true);
        selectedMpsProp.setSelectedMps(id);
    }

    return (
        <TableRow
            hover
            className="MpsListItem"
            sx={{ '& > *': { borderBottom: 'unset' } }}
        >
            <TableCell style={{ textAlign: 'left' }}>
                № {item.number}
            </TableCell>
            <TableCell>
                {moment(item.date).format('DD/MM/YYYY')}
            </TableCell>
            <TableCell>
                {item.firstName} {item.middleName} {item.lastName}
            </TableCell>
            <TableCell>
                {item.egn}
            </TableCell>
            <TableCell>
                {/* <Button
                    variant="text"
                    onClick={() => setOpen(!open)}
                    endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    className="button-with-icon"
                    data-testid="button"
                >
                    Виж заявления
                </Button> */}
            </TableCell>
            <TableCell className="column-options">
                <IconButton className="trash-icon-wrapper" onClick={e => openModal(item.id)}>
                    <DeleteIcon className="trash-icon" />
                </IconButton>
                <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to={`/app/protocols/edit/${item.id}`}>
                    <EditIcon className="edit-icon" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default MpsListItem;