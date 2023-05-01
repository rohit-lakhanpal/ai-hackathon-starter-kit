import axios from "axios";
import Cookie from "universal-cookie";
import * as speechsdk from "microsoft-cognitiveservices-speech-sdk";

const getTokenOrRefreshAsync = async () => {
    const cookie = new Cookie();
    const tokenKey = "speech-token";    
    const speechToken = cookie.get(tokenKey);
    if (speechToken === undefined) {
        try {
            const url = '/api/speech/token';
            console.log(`Fetching new token from back-end: ${url} via proxy specified in package.json`);
            const response = await axios.get(url);
            const token = response.data.token;
            const region = response.data.region;
            const endpointUrl = response.data.endpointUrl;            
            cookie.set(tokenKey, `${token}:${region}:${endpointUrl}`, {maxAge: 540, path: '/', sameSite: 'strict'});            
            console.log(`Token fetched from back-end: ${token}`);
            return { authToken: token, region: region, endpointUrl: endpointUrl };
        } catch (err) {
            console.log(err)
            return { authToken: null, error: err };
        }
        
    } else {
        console.log('Token fetched from cookie: ' + speechToken);
        const token = speechToken.split(':');
        if(token.length === 4){
            return { 
                authToken: token[0], 
                region: token[1], 
                endpointUrl: `${token[2]}:${token[3]}`
            };
        } else {
            cookie.remove(tokenKey);
        }
        return { error: "Token is not valid" };
    }
    
}

const initialiseSynthesizerAsync = async (onSynthesisCompleted: any, onWordBoundary: any) => {
    const token = await getTokenOrRefreshAsync();
    let synthesizer = null; 

    if(token && token.error === undefined) {        
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
            token.authToken,
            token.region);                    
        // Set the endpoint URL
        //speechConfig.endpointId = token.endpointUrl;
        //speechConfig.speechSynthesisLanguage = "en-US";
        speechConfig.speechSynthesisVoiceName = "en-US-JennyNeural";
        speechConfig.requestWordLevelTimestamps();
        
        const player = new speechsdk.SpeakerAudioDestination();
        const audioConfig = speechsdk.AudioConfig.fromSpeakerOutput(player);
        synthesizer = new speechsdk.SpeechSynthesizer(speechConfig, audioConfig);
        synthesizer.wordBoundary = onWordBoundary;
        synthesizer.synthesisCompleted = onSynthesisCompleted;
        return {
            synthesizer: synthesizer,
            player: player
        };      
    } else {
        if(token && token.error && token.error)
        {
            console.log(token.error);
            throw new Error("Could not fetch token for the Azure Speech Service. Please check your configuration.", token.error);            
        }
    }
};

const initialiseRecogniserAsync = async (onRecognised: (sender: speechsdk.Recognizer, event: speechsdk.SpeechRecognitionEventArgs) => void, onCancelled: (sender: speechsdk.Recognizer, event: speechsdk.SpeechRecognitionCanceledEventArgs) => void, onSessionStarted: (sender: speechsdk.Recognizer, event: speechsdk.SessionEventArgs) => void, onSessionStopped: (sender: speechsdk.Recognizer, event: speechsdk.SessionEventArgs) => void) => {
    const token = await getTokenOrRefreshAsync();
    let recogniser = null; 

    if(token && token.error === undefined) {
        const speechConfig = speechsdk.SpeechConfig.fromAuthorizationToken(
            token.authToken,
            token.region);                    
        // Set the endpoint URL
        //speechConfig.endpointId = token.endpointUrl;
        speechConfig.speechRecognitionLanguage = "en-US";
            
        const audioConfig = speechsdk.AudioConfig.fromDefaultMicrophoneInput();
        recogniser = new speechsdk.SpeechRecognizer(speechConfig, audioConfig);
        recogniser.recognized = onRecognised;
        recogniser.canceled = onCancelled;
        recogniser.sessionStarted = onSessionStarted;
        recogniser.sessionStopped = onSessionStopped;
        return recogniser;      
    } else {
        if(token && token.error && token.error)
        {
            console.log(token.error);
            throw new Error("Could not fetch token for the Azure Speech Service. Please check your configuration.", token.error);            
        }
    }
    
    
}

export const speechService = {        
    initialiseRecogniserAsync,
    initialiseSynthesizerAsync,
    getTokenOrRefreshAsync
}