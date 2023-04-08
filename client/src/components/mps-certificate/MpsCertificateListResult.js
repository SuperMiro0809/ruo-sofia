import { useState } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
    Box,
    Card,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TablePagination,
    TableRow,
    Typography,
    CircularProgress,
    TableContainer
} from '@material-ui/core';
import MpsCertificateListItem from './MpsCertificateListItem';

const MpsCertificateListResult = ({
    mps,
    page,
    setPage,
    limit,
    setLimit,
    total,
    loader,
    getMps
}) => {
    const handleLimitChange = (event) => {
        setLimit(event.target.value);
    };

    const handlePageChange = (event, newPage) => {
        setPage(newPage);
    };

    return (
        <Card>
            <PerfectScrollbar>
                <Box sx={{ minWidth: 1050 }}>
                    <TableContainer>
                        <Box sx={{
                            pl: { sm: 2 },
                            pr: { xs: 1, sm: 1 },
                            mt: 3,
                            mb: 1
                        }}>
                            <Typography
                                color="textPrimary"
                                variant="h3"
                            >
                                Удостоверения
                            </Typography>
                        </Box>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ textAlign: 'left' }}>
                                        Три имена
                                    </TableCell>
                                    <TableCell>
                                        ЕГН
                                    </TableCell>
                                    <TableCell>
                                        Операции
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {loader ?
                                    <TableRow>
                                        <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="3"><CircularProgress size="30px" /></TableCell>
                                    </TableRow>
                                    :
                                    <>
                                        {mps.length !== 0 ?
                                            <>
                                                {mps.map((item) => (
                                                    <MpsCertificateListItem
                                                        key={`${item.id}_${new Date().getSeconds()}`}
                                                        item={item}
                                                    />
                                                ))}
                                            </>
                                            :
                                            <TableRow>
                                                <TableCell sx={{ textAlign: 'center', fontStyle: 'italic' }} colSpan="3">Няма записи</TableCell>
                                            </TableRow>
                                        }
                                    </>
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
            </PerfectScrollbar>
            <TablePagination
                component="div"
                count={total}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleLimitChange}
                page={page}
                rowsPerPage={limit}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Card>
    );
}

export default MpsCertificateListResult;