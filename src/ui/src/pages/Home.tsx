import React, {ReactElement, FC} from "react";
import {Box, Container, Input, Typography} from "@mui/material";
import { SharedState } from "../state/SharedState";

interface HomeProps {
    sharedState: SharedState;
}

const Home: FC<HomeProps> = ({ sharedState }): ReactElement => {
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
                <Typography variant="body2">
                    {sharedState.transcript}
                </Typography>
                {/* Create an input for the transcript */}
                <Input
                    onChange={(e) => sharedState.setTranscript(e.target.value)}
                    placeholder="Transcript"
                    defaultValue={sharedState.transcript} 
                    fullWidth={true}             
                    multiline={true}
                    rows={3}      
                />
                                    
            </Container>
        </Box>
    );
};

export default Home;