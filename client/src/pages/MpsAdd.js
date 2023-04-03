import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import MpsAddForm from 'src/components/add-mps/MpsAddForm';
import MpsAddToolbar from 'src/components/add-mps/MpsAddToolbar';

const MpsAdd = () => {
    return (
        <>
            <Helmet>
                <title>Добави заявление</title>
            </Helmet>
            <Box
                sx={{
                    backgroundColor: 'background.default',
                    minHeight: '100%',
                    py: 3
                }}
            >
                <Container maxWidth={false}>
                    <MpsAddToolbar />
                    <Box sx={{ pt: 3 }}>
                        <MpsAddForm />
                    </Box>
                </Container>
            </Box>
        </>
    );
}

export default MpsAdd;