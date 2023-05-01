import React, {ReactElement, FC, useState, useEffect} from "react";
import {Box, Button, Container, Grid, Input, Typography, colors} from "@mui/material";
import { SharedState } from "../state/SharedState";
import MicIcon from '@mui/icons-material/Mic';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import PageHeader  from "../components/PageHeader";
import { speechService } from '../services/speechService';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

interface TranscribeProps {
    sharedState: SharedState;
}


const Transcribe: FC<TranscribeProps> = ({ sharedState }): ReactElement => {
    const [localTranscript, setLocalTranscript] = useState<any[]>([]);
    const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
    const [recogniser, setRecogniser] = useState<any>(null);

    const beginTranscription = async () => {
        if(recogniser !== null)
        {
            await recogniser.startContinuousRecognitionAsync();
            setIsTranscribing(true);
        } else {
            console.log("Recogniser is null");
        }
    };
    const stopTranscription = async () => {
        if(recogniser !== null)
        {
            await recogniser.startContinuousRecognitionAsync();            
        }

        setIsTranscribing(false);
    };

    const setupRecogniser = async () => {
        const onRecognised = (s: any, e: { result: { reason: speechsdk.ResultReason; text: React.SetStateAction<string>; }; }) => {
            if (e.result.reason === speechsdk.ResultReason.RecognizedSpeech) {                
                console.log(`RECOGNIZED: Text=${e.result.text}`);
                sharedState.setTranscript(`${sharedState.transcript} ${e.result.text}`)
                setLocalTranscript((prevTranscript: string[]) => {
                    let t = [...prevTranscript, e.result.text]; 

                    /**
                     * ***************************************
                     * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
                     * ***************************************
                     * This is where you would send the transcript to a server for processing.
                     */

                    let transcriptAsString = t.join("\n");
                    sharedState.setTranscript(transcriptAsString);
                    return t;
                });
            } else if (e.result.reason === speechsdk.ResultReason.NoMatch) {
                console.log("NOMATCH: Speech could not be recognized.");
            }
        };
        const onCancelled = (s: any, e: { reason: any; }) => {
            console.log(`CANCELED: Reason=${e.reason}`);
        };
        const onSessionStarted = (s: any, e: any) => {
            console.log("\n    Session started event.");
        };
        const onSessionStopped = (s: any, e: any) => {
            console.log("Session stopped event.");
            console.log("Stop recognition.");
            recogniser.stopContinuousRecognitionAsync();
        };    
        let r = await speechService
            .initialiseRecogniserAsync(onRecognised, onCancelled, onSessionStarted, onSessionStopped);
        setRecogniser(r);
    }

    useEffect(() => {
        setupRecogniser();
    }, []);

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',            
            padding: '2rem',
        }}>
           <Container maxWidth="xl">
                <PageHeader title="Transcribe" subtitle="Audio Transcription in Real Time" />
                <Grid container spacing={2} style={{marginTop:"1rem"}}>
                    <Grid item>
                        <Button onClick={beginTranscription}
                            disabled={isTranscribing}
                            variant="contained"
                            startIcon={<MicIcon />}>
                            Begin transcription
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={stopTranscription}
                            disabled={!isTranscribing}                            
                            variant="contained"
                            color="error"
                            startIcon={<RecordVoiceOverIcon />}>
                            Stop transcription
                        </Button>
                    </Grid>
                </Grid>                
                <Grid container spacing={1} style={{marginTop:"1rem"}}>
                    <Grid item xs={8} md={10}> 
                    <Typography variant="h5">Transcribed speech:</Typography>
                    </Grid>
                    <Grid item xs={4} md={2} container justifyContent="flex-end">
                        <Button 
                            onClick={() => {
                                navigator.clipboard.writeText(sharedState.transcript)
                            }}
                            disabled={sharedState.transcript === ""}
                            variant="outlined"
                            color="primary"
                            startIcon={<ContentCopyIcon />}>
                            Copy
                        </Button>
                    </Grid>
                    <Grid item xs={12}>                        
                        <Typography variant="body1" style={{
                            marginLeft:"0.25rem",
                            color:colors.grey[600]
                        }}>
                            {(localTranscript.length === 0) ? "No transcription yet.." : ""}
                        </Typography>
                        {localTranscript.map((t: string, i: number) => {
                            return (
                                <Typography key={i} variant="body1" style={{marginLeft:"0.25rem", marginTop: "0.25rem"}}>
                                    <MicIcon fontSize="small" style={{
                                        verticalAlign: "bottom",
                                        visibility: ((t !== "") ? "visible" : "hidden"),
                                        color: colors.grey[500]
                                    }} /> {t}
                                </Typography>
                            );
                        })}
                    </Grid>
                </Grid>             
            </Container>
        </Box>
    );
};

export default Transcribe;