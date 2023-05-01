export interface SharedState {
    transcript: string;
    setTranscript: (value: string) => void;
    speech: string;
    setSpeech: (value: string) => void;
    analysedText: string;
    setAnalysedText: (value: string) => void;
    analysisType: string;
    setAnalysisType: (value: string) => void;
    errors: string[];
    setErrors: (value: any) => void;
    binErrors: (idx: number) => void; 
    warnings: string[];
    setWarnings: (value: any) => void;
    binWarnings: (idx: number) => void;
    info: string[];
    setInfo: (value: any) => void;
    binInfo: (idx: number) => void;   
}
  