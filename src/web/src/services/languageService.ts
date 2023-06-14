import axios from "axios";

const analyseTextAsync = async (transcript: string, type: string) => {
    // Ensure the transcript is not empty
    if(transcript === undefined || transcript === null || transcript === '') {
        throw new Error('Transcript is required');
    };

    // Set url based on type
    let url = '/api/language/' + type.toString();
        
    // Call the API
    const response = await axios.post(url, { transcript: transcript });

    // Get the data from the response
    const data = response.data;

    // Pretty print json and return string
    return JSON.stringify(data, null, 4);
}

export const languageService = {            
    analyseTextAsync
}
