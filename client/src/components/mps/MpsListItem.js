import { useState } from 'react';
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
    KeyboardArrowDown as KeyboardArrowDownIcon,
    KeyboardArrowUp as KeyboardArrowUpIcon
} from '@material-ui/icons';
import moment from 'moment';

const MpsListItem = ({ item, openProp, selectedMpsProp }) => {
    const [open, setOpen] = useState(false);

    const openModal = (id) => {
        openProp.setOpen(true);
        selectedMpsProp.setSelectedMps(id);
    }

    return (
        <>
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
                    <Button
                        variant="text"
                        onClick={() => setOpen(!open)}
                        endIcon={open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                        className="button-with-icon"
                        data-testid="button"
                    >
                        Покажи
                    </Button>
                </TableCell>
                <TableCell className="column-options">
                    <IconButton className="trash-icon-wrapper" onClick={e => openModal(item.id)}>
                        <DeleteIcon className="trash-icon" />
                    </IconButton>
                    <IconButton className="edit-icon-wrapper" color="primary" component={RouterLink} to={`/app/mps/edit/${item.id}`}>
                        <EditIcon className="edit-icon" />
                    </IconButton>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h4" gutterBottom component="div">
                                Информация
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Дата на раждане</TableCell>
                                        <TableCell>Гражданство</TableCell>
                                        <TableCell>Номер на документите</TableCell>
                                        <TableCell>Дата на документите</TableCell>
                                        <TableCell>Училище</TableCell>
                                        <TableCell>Град</TableCell>
                                        <TableCell>Държава</TableCell>
                                        <TableCell>Клас</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow>
                                        <TableCell component="th" scope="row">
                                            {moment(item.dateBirth).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {item.citizenship}
                                        </TableCell>
                                        <TableCell>
                                            {item.documentNumber}
                                        </TableCell>
                                        <TableCell>
                                            {moment(item.documentDate).format('DD/MM/YYYY')}
                                        </TableCell>
                                        <TableCell>
                                            {item.school}
                                        </TableCell>
                                        <TableCell>
                                            {item.city}
                                        </TableCell>
                                        <TableCell>
                                            {item.country}
                                        </TableCell>
                                        <TableCell>
                                            {item.class}
                                        </TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </>
    );
}

export default MpsListItem;