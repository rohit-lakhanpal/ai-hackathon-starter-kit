import React, {ReactElement, FC, useEffect} from "react";
import {Box, Link, Typography, colors} from "@mui/material";
import RecordVoiceOverIcon from '@mui/icons-material/RecordVoiceOver';
import { SharedState } from "../state/SharedState";
import { infoService } from "../services/infoService";

interface HomeProps {
    sharedState: SharedState;
}

const Home: FC<HomeProps> = ({ sharedState }): ReactElement => {
    const [name, setName] = React.useState<string>("");
    const [description, setDescription] = React.useState<string>("");

    useEffect(() => {
        (async () => {
            try {
                var r = await infoService?.getAppInfoAsync();
                setName(r?.name || "AI hackathon starter kit");
                setDescription(r?.description);
            } catch {
                setName("AI hackathon starter kit" || "This is a starter kit for building AI-powered apps for hackathons.");
                setDescription("This is a starter kit for building AI-powered apps for hackathons.");
            }
        })();
    }, []);

    return (
        <Box sx={{
            flexGrow: 1,
            backgroundColor: "whitesmoke",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "2rem",
        }}>
           
           <Typography variant="h3" style={{verticalAlign:'middle', display: 'inline-flex'}} >
                <RecordVoiceOverIcon fontSize="inherit" /> 
                &nbsp;
                {name}
                </Typography>            
            <Typography variant="h5" style={{paddingTop: '2rem'}}>
                {description}
            </Typography>            
            <Typography variant="h6" style={{margin: '2rem'}}>                
                You can leverage Azure Cognitive Services and the Azure Open AI Services to build your app.                                                           
                This app relies on backend apis published via `api` project within this repo.                             
                Please ensure that the `api` project is running before attempting to use this app.               
                Requests to <code style={{color: colors.purple[500]}}>/api</code> path are proxied to the api 
                project at {' '}<code><Link target="_blank" href="http://localhost:8730/api">http://localhost:8730/api</Link></code>.                 
            </Typography>
        </Box>
    );
};

export default Home;