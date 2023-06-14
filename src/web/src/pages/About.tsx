import {ReactElement, FC} from "react";
import {Box, Container, Paper, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import { SharedState } from "../state/SharedState";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.secondary,
}));

interface AboutProps {
    sharedState: SharedState;
}

const About: FC<AboutProps> = ({sharedState}): ReactElement => {
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
        }}>            
           <Container maxWidth="xl">
                <Typography variant="h3">About</Typography>
                <Typography variant="subtitle1">About this app!</Typography>
                <Item>To be added!</Item>
            </Container>
        </Box>
    );
};

export default About;