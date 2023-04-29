import React, {ReactElement, FC} from "react";
import {Box, Container, Typography} from "@mui/material";

const Home: FC<any> = (): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',            
            padding: '2rem',
        }}>
           <Container maxWidth="xl">
                <Typography variant="h3">Home</Typography>
                <Typography variant="body1">Home page!</Typography>
            </Container>
        </Box>
    );
};

export default Home;