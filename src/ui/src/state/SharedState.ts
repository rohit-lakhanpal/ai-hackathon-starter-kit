export interface SharedState {
    transcript: string;
    setTranscript: (value: string) => void;
    errors: string[];
    setErrors: (value: string[]) => void;
    binErrors: (idx: number) => void; 
    warnings: string[];
    setWarnings: (value: string[]) => void;
    binWarnings: (idx: number) => void;   
}
  