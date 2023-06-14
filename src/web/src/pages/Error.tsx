import React, {ReactElement, FC} from "react";
import { useLocation } from 'react-router-dom';
import {Box, Container, Typography} from "@mui/material";

const Error: FC<any> = (): ReactElement => {
    const [location] = React.useState<any>( useLocation());
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',            
            padding: '2rem',
        }}>
           <Container maxWidth="xl">
                <Typography variant="h3">Not Found</Typography>
                <Typography variant="subtitle1">
                    I'm sorry, but we encountered an error.
                </Typography>
                <Typography variant="body1">
                    The path <code>{location.pathname}</code> was not found.
                </Typography>
            </Container>
        </Box>
    );
};

export default Error;