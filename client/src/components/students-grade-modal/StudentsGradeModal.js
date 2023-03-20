import {
    Box,
    Modal,
    Typography,
    Button,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';
import {
    Close as CloseIcon
} from '@material-ui/icons';

const style = {
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 3,
    width: '400px'
};

const StudentsGradeModal = ({ grades, gradeModalOpenProp, gradesColumn = true, ...rest }) => {
    const closeModal = () => {
        gradeModalOpenProp.setGradeModal(false);
    }

    return (
        <Modal
            open={gradeModalOpenProp.gradeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style} className="Modal">
                <Typography id="modal-modal-title" variant="h6" component="h2" pb='15px'>
                    <CloseIcon className="close-icon" onClick={closeModal} />
                </Typography>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                Предмет
                            </TableCell>
                            {gradesColumn && (
                                <TableCell>
                                    Оценка
                                </TableCell>
                            )}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {grades.map((grade, index) => (
                            <TableRow key={index}>
                                <TableCell>
                                    {grade.subjectName}
                                </TableCell>
                                {gradesColumn && (
                                    <TableCell>
                                        {grade.grade}
                                    </TableCell>
                                )}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Box>
        </Modal>
    );
}

export default StudentsGradeModal;