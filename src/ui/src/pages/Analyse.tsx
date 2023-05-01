import React, {ReactElement, FC, useState, useEffect} from "react";
import {Alert,Box, Button, colors, Container, FormControl, Grid, Input, InputLabel, MenuItem, Select, Typography} from "@mui/material";
import { SharedState } from "../state/SharedState";
import QueryStatsIcon from '@mui/icons-material/QueryStats';
import ClearIcon from '@mui/icons-material/Clear';
import PageHeader  from "../components/PageHeader";
import {languageService } from '../services/languageService';

interface AnalyseProps {
    sharedState: SharedState;
}

const Analyse: FC<AnalyseProps> = ({ sharedState }): ReactElement => {
    
    const [isAnalysing, setIsAnalysing] = useState<boolean>(false);
    const [inputText, setInputText] = useState<string>("");

    const beginAnalysis = async () => {
        if(inputText === ""){

        } else {            
            if(sharedState.analysisType === undefined || sharedState.analysisType.length === 0){
                sharedState.setErrors((prev:any) => {
                    return [...prev, 'Choose an analysis type to conduct!'];
                }); 
            } else {
                setIsAnalysing(true);
                try {
                    var result = await languageService.analyseTextAsync(inputText, sharedState.analysisType); 
                    /**
                     * ***************************************
                     * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
                     * ***************************************
                     * This is where you would do something with the analysed text.
                     */                   
                    sharedState.setAnalysedText(result);
                } catch (error) {
                    console.log(error);
                    sharedState.setErrors((prev:any) => {
                        return [...prev, "Error analysing text! Check console for details."];
                    });
                } finally {
                    setIsAnalysing(false);
                }
            }

        }
        
    };

    useEffect(() => {
        setInputText(sharedState.transcript);
    }, [sharedState.transcript]);
        


    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: 'whitesmoke',
            display: 'block',            
            padding: '2rem',
        }}>
           <Container maxWidth="xl">
                <PageHeader title="Analyse" subtitle="Use cognitive services to analyse text." /> 
                <Box hidden={sharedState.errors.length < 1}>
                    {sharedState.errors.map((e: any, i: number) => {
                        return <Alert key={i} severity="error" onClose={() => sharedState.binErrors(i)}>
                            {e}
                        </Alert>
                    })}
                </Box>                             
                <Grid container spacing={1} style={{marginTop:"1rem"}}>
                    <Grid item xs={8} md={10}> 
                        <Typography variant="h5">Text to be analysed:</Typography>
                    </Grid>
                    <Grid item xs={4} md={2} container justifyContent="flex-end">
                        <Button 
                            onClick={(e) => {
                                setInputText("");
                                sharedState.setAnalysedText("");                       
                            }}
                            disabled={inputText === ""}
                            variant="outlined"
                            color="primary"
                            startIcon={<ClearIcon />}>
                            Clear
                        </Button>
                    </Grid>
                    <Grid item xs={12}>
                        <Input
                            onChange={(e) => setInputText(e.target.value)}
                            placeholder="Type something here.."
                            value={inputText} 
                            fullWidth={true}             
                            multiline={true}                     
                            minRows={3}  
                            maxRows={12} 
                            style={{                                
                                fontSize:"1rem",
                                color: colors.grey[600],
                            }}
                        />
                    </Grid>                     
                </Grid>
                <Grid container spacing={2} 
                        style={{
                            marginTop:"1rem",                            
                        }}                        
                        >
                    <Grid item>
                        <FormControl variant="standard" >
                            <InputLabel id="analysis-type-label">Please choose a type of analysis to be performed</InputLabel>
                            <Select 
                                labelId="analysis-type-label"                                   
                                value={sharedState.analysisType}
                                label="Choose analysis type"
                                style={{                                                                               
                                    minWidth: '400px',                                    
                                    minHeight: '100%'
                                }}
                                onChange={(v)=>{
                                    sharedState.setAnalysisType(v.target.value);
                                }}
                                variant="standard">                                
                                    <MenuItem value={'analyse-sentiment'}>Analyse Sentiment</MenuItem>
                                    <MenuItem value={'extract-key-phrases'}>Extract Key Phrases</MenuItem>
                                    <MenuItem value={'recognise-entities'}>Recognise Entities</MenuItem>
                                    <MenuItem value={'recognise-healthcare-entities'}>Recognise Entities (Healthcare)</MenuItem>
                                    <MenuItem value={'recognise-pii'}>Recognise Pii</MenuItem>                             
                                </Select>
                        </FormControl>
                    </Grid>
                    <Grid item >
                        <Button onClick={beginAnalysis}
                            disabled={isAnalysing || (inputText === "")}
                            variant="contained"
                            startIcon={<QueryStatsIcon />}
                            sx={{
                                minHeight: '100%'
                            }}
                            >
                            Begin analysing
                        </Button>
                    </Grid>  
                </Grid>
                <Grid container style={{
                            marginTop:"2rem",                            
                        }} >
                    <Grid item>
                        <Typography variant="h6">
                            Analysed text will appear here:
                        </Typography>
                        <Typography 
                            style={{
                                marginLeft:"0.25rem", 
                                marginTop: "0.25rem",                                                                                               
                                color: colors.grey[600],
                                visibility: (sharedState.analysedText === "") ? "visible": "hidden"
                            }}                        
                            >
                                Nothing analysed yet ..
                        </Typography> 
                        <pre>{sharedState.analysedText}</pre>                                               
                    </Grid>
                </Grid>  
            </Container>
        </Box>
    );
};

export default Analyse;