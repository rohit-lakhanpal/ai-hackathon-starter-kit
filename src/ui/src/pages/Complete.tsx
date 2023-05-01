import React, {ReactElement, FC} from "react";
import {Box, Container, Paper, Typography} from "@mui/material";
import { styled } from '@mui/material/styles';
import PageHeader  from "../components/PageHeader";
import { SharedState } from "../state/SharedState";



interface CompleteProps {
    sharedState: SharedState;
}

const Complete: FC<CompleteProps> = ({sharedState}): ReactElement => {
    return (
        <Box sx={{
          flexGrow: 1,
          backgroundColor: 'whitesmoke',
          display: 'block',            
          padding: '2rem',
        }}>            
           <Container maxWidth="xl">
              <PageHeader title="Complete" subtitle="Generate completions from OpenAI." />
            </Container>
        </Box>
    );
};

export default Complete;

