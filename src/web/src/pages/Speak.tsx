import {ReactElement, FC, useState, useEffect} from "react";
import {Alert, Box, Button, colors, Container, Grid, Input, Typography} from "@mui/material";
import { SharedState } from "../state/SharedState";
import CampaignIcon from '@mui/icons-material/Campaign';
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import ClearIcon from '@mui/icons-material/Clear';
import PageHeader  from "../components/PageHeader";
import { speechService } from '../services/speechService';
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

interface SpeakProps {
    sharedState: SharedState;
}

const Speak: FC<SpeakProps> = ({ sharedState }): ReactElement => {
    const [isSpeaking, setIsSpeaking] = useState<boolean>(false);    
    const [wordsSpoken, setWordsSpoken] = useState<string>("");
    const [lastSpokenWordOffset, setLastSpokenWordOffset] = useState<number>(0);
    const [synthesiser, setSynthesiser] = useState<any>(null);
    const [player, setPlayer] = useState<any>(null);
    const [spokenWordTimeouts, setSpokenWordTimeouts] = useState<any[]>([]);

    const beginSpeaking = async () => {
        // Check if sharedState.speech is empty
        if(sharedState.speech === "")
        {

        } else {
            setIsSpeaking(true);
            setWordsSpoken("");
            await synthesiser.speakTextAsync(sharedState.speech, (result: any) => {
                if (result.reason === speechsdk.ResultReason.SynthesizingAudioCompleted) {
                    console.log("synthesis finished.");                    
                } else {
                    console.error("Speech synthesis cancelled, " + result.errorDetails +
                        "\nDid you update the subscription info?");  
                        
                    setIsSpeaking(false);                  
                }
            }, (err: string) => {
                console.error(err);
                sharedState.setErrors((prev:any) => {
                    return [...prev, err];
                });
                setIsSpeaking(false);
            });
        }

        
    };

    const stopSpeaking = async () => {
        setIsSpeaking(false);
        player.pause();                
        spokenWordTimeouts.forEach((timeoutId) => {
            clearTimeout(timeoutId);
        });
        await setupSynthesiser();
    };

    const setupSynthesiser = async () => {
        const onWordBoundary = (sender: any, event: {privText:string, privAudioOffset: number, privDuration: number}) => {
            var wordOffset = event.privAudioOffset / 10000;
            wordOffset += 1000; // adding buffer
            setLastSpokenWordOffset(wordOffset)
            var timeoutId = setTimeout(() => {
                /**
                 * ***************************************
                 * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
                 * ***************************************
                 * This is where you would do interesting things 
                 * with the text that was spoken.
                 */
                setWordsSpoken((prev:string) => {
                    return prev + " " + event.privText;
                });
            }, wordOffset);
            setSpokenWordTimeouts((prev:any[]) => {
                return [...prev, timeoutId];
            });
        }    
        const onSynthesisCompleted = () => {        
            setTimeout(() => {                
                setIsSpeaking(false);
                console.log("synthesis completed.");
            }, (lastSpokenWordOffset));
        }
        
        try {
            // Create an instance of the speech recogniser     
            var s = await speechService.initialiseSynthesizerAsync(onSynthesisCompleted, onWordBoundary);           
            setSynthesiser(s?.synthesizer);
            setPlayer(s?.player);
        } catch (error: any) {
            sharedState.setErrors((prev:any) => {
                return [...prev, error.message];
            });
        }
    };

    useEffect(() => {
        sharedState.setSpeech(sharedState.transcript);
        setupSynthesiser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
        
    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',            
            padding: '2rem',
        }}>
           <Container maxWidth="xl">
                <PageHeader title="Speak" subtitle="Use text-to-speech to say something." />
                <Box hidden={sharedState.errors.length < 1}>
                    {sharedState.errors.map((e: any, i: number) => {
                        return <Alert key={i} severity="error" onClose={() => sharedState.binErrors(i)}>
                            {e}
                        </Alert>
                    })}
                </Box>
                <Grid container spacing={2} style={{marginTop:"1rem"}}>
                    <Grid item>
                        <Button onClick={beginSpeaking}
                            disabled={isSpeaking || (sharedState.speech === "")}
                            variant="contained"
                            startIcon={<CampaignIcon />}>
                            Begin Speaking
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button onClick={stopSpeaking}
                            disabled={!isSpeaking}                            
                            variant="contained"
                            color="error"
                            startIcon={<RecordVoiceOverIcon />}>
                            Stop Speaking
                        </Button>
                    </Grid>
                </Grid>                
                <Grid container spacing={1} style={{marginTop:"1rem"}}>
                    <Grid item xs={8} md={10}> 
                        <Typography variant="h5">Words to be spoken:</Typography>
                    </Grid>
                    <Grid item xs={4} md={2} container justifyContent="flex-end">
                        <Button 
                            onClick={(e) => {
                                sharedState.setSpeech(""); 
                                setLastSpokenWordOffset(0);
                                setWordsSpoken("");                                
                            }}
                            disabled={sharedState.speech === ""}
                            variant="outlined"
                            color="primary"
                            startIcon={<ClearIcon />}>
                            Clear
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            onChange={(e) => sharedState.setSpeech(e.target.value)}
                            placeholder="Type something here.."
                            value={sharedState.speech} 
                            fullWidth={true}             
                            multiline={true}                     
                            minRows={6}  
                            maxRows={12} 
                            style={{                                
                                fontSize:"1.5rem",
                                color: colors.grey[600],
                            }}
                        />
                    </Grid>
                    {/* <Grid item xs={12} style={{marginTop:"1rem"}}>
                        <Typography variant="h6">Speech:</Typography>
                        <Typography variant="caption"
                            style={{marginLeft:"0.25rem", marginTop: "0.25rem"}}>
                                {sharedState.speech || "Nothing to say yet.."}
                        </Typography>
                    </Grid> */}

                    <Grid item xs={12} style={{marginTop:"1rem"}}>
                        <Typography variant="h6">
                            Spoken words will appear here:</Typography>
                        <Typography 
                            style={{
                                marginLeft:"0.25rem", 
                                marginTop: "0.25rem",                                                                                               
                                color: wordsSpoken ? colors.red[400]: colors.grey[600],
                            }}                        
                            >
                                {wordsSpoken || "Nothing spoken yet.."}
                        </Typography>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Speak;