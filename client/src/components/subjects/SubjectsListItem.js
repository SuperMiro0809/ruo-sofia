import './SubjectListItem.scss';
import {
    TableRow,
    TableCell,
    IconButton
} from '@material-ui/core';
import { 
    Delete as DeleteIcon,
    Edit as EditIcon
} from '@material-ui/icons';

const SubjectListItem = ({ subject, openDeleteModalProp, selectedSubjectProp, openEditModalProp }) => {

    const openDeleteModal = (id) => {
        selectedSubjectProp.setSelectedSubject(id);
        openDeleteModalProp.setOpenDeleteModal(true);
    }

    const openEditModal = (subject) => {
        selectedSubjectProp.setSelectedSubject(subject);
        openEditModalProp.setOpenEditModal(true);
    }

    return (
        <TableRow className="SubjectListItem">
            <TableCell>
                {subject.name}
            </TableCell>
            <TableCell>
                <IconButton className="trash-icon-wrapper" onClick={e => openDeleteModal(subject.id)}>
                    <DeleteIcon className="trash-icon" />
                </IconButton>
                <IconButton className="edit-icon-wrapper" color="primary" onClick={e => openEditModal(subject)}>
                    <EditIcon className="edit-icon" />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default SubjectListItem;