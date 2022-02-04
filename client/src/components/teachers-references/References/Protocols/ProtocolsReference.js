import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell
} from '@material-ui/core';

const ProtocolsReference = ({protocols}) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        Име
                </TableCell>
                    <TableCell>
                        Дата на раждане
                </TableCell>
                    <TableCell>
                        Заявления
                </TableCell>
                    <TableCell>
                        Операции
                </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {/* {loader ?
                  <TableRow>
                    <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4"><CircularProgress size="30px" /></TableCell>
                  </TableRow>
                  :
                  <>
                    {teachers.length !== 0 ?
                      <>
                        {teachers.slice(page * limit, page * limit + limit).map((teacher) => (
                          <TeacherListItem key={teacher.id} teacher={teacher} openProp={openProp} selectedTeacherProp={selectedTeacherProp} />
                        ))}
                      </>
                      :
                      <TableRow>
                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="4">Няма записи</TableCell>
                      </TableRow>
                    }
                  </>
                } */}
            </TableBody>
        </Table>
    );
}

export default ProtocolsReference;