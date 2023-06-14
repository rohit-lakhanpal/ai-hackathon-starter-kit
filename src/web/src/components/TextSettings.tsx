import React from "react";
import {
    Drawer,
    Stack,
    Slider,
    FormControl,
    Divider,
    Typography,
    TextField,
    Button,
    colors,
} from "@mui/material";
import { Close as CloseIcon, Save as SaveIcon } from "@mui/icons-material";

import { TextCompletionRequestSettings } from "../services/oaiService";

type TextSettingsProps = {
    open: boolean;
    settings: TextCompletionRequestSettings;
    onSubmit: (settings: TextCompletionRequestSettings) => void;
    onClose: () => void;
};

const TextSettings: React.FC<TextSettingsProps> = ({
    open,
    settings,
    onSubmit,
    onClose,
}) => {
    const [temperature, setTemperature] = React.useState<number>(
        settings.temperature
    );
    const [topP, setTopP] = React.useState<number>(settings.top_p);
    const [stopSequences, setStopSequences] = React.useState<string>(
        settings?.stop?.join("\n")
    );
    const [maxTokens, setMaxTokens] = React.useState<number>(settings.max_tokens);

    const handleTemperatureChange = (event: any) => {
        try {
            let value = parseFloat(event.target.value);
            setTemperature(value);
        } catch (error) {
            console.log(error);
        }
    };
    const handleTopPChange = (event: any) => {
        try {
            let value = parseFloat(event.target.value);
            setTopP(value);
        } catch (error) {
            console.log(error);
        }
    };

    const handleStopSequencesChange = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setStopSequences(event.target.value);
    };
    const handleMaxTokensChange = (event: any) => {
        try {
            let value = parseInt(event.target.value);
            setMaxTokens(value);
        } catch (error) {
            console.log(error);
        }
    };

    const handleSubmit = () => {
        let submitSettings = settings;
        submitSettings.temperature = temperature;
        submitSettings.top_p = topP;

        submitSettings.max_tokens = maxTokens;
        if (submitSettings.stop != null && submitSettings.stop?.length > 0) {
            submitSettings.stop = stopSequences
                .split("\n")
                .map((s) => s.trim())
                .filter((s) => s.length > 0);
        }

        onSubmit(submitSettings);
    };

    const handleClose = () => {
        onClose();
    };

    return (
        <Drawer
            variant="persistent"
            anchor="right"
            open={open}
            sx={{
                flexShrink: 0,
            }}
            PaperProps={{
                sx: {
                    width: {
                        xs: "100%",
                        sm: "100%",
                        md: "100%",
                        lg: "50%",
                        xl: "50%",
                    },
                },
            }}
        >
            <Stack sx={{ width: "100%", padding: "1rem" }} spacing={2}>
                <Typography variant="h5">Settings for Text Completions</Typography>
                <Divider />
                <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                    <Typography variant="body1" style={{ color: colors.blue[500] }}>
                        Temprature: {temperature}
                    </Typography>
                    <Typography variant="body2">
                        What sampling temperature to use, between 0 and 2. Higher values
                        like 0.8 will make the output more random, while lower values like
                        0.2 will make it more focused and deterministic. We generally
                        recommend altering this or top_p but not both.
                    </Typography>
                    <Slider
                        size="medium"
                        value={temperature}
                        onChange={handleTemperatureChange}
                        defaultValue={temperature}
                        aria-label="Small"
                        min={0}
                        max={2}
                        step={0.1}
                        valueLabelDisplay="auto"
                        aria-describedby="text-temp-helper-text"
                    />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                    <Typography variant="body1" style={{ color: colors.blue[500] }}>
                        Top P: {topP}
                    </Typography>
                    <Typography variant="body2">
                        An alternative to sampling with temperature, called nucleus
                        sampling, where the model considers the results of the tokens with
                        top_p probability mass. So 0.1 means only the tokens comprising
                        the top 10% probability mass are considered. We generally
                        recommend altering this or temperature but not both.
                    </Typography>
                    <Slider
                        size="medium"
                        value={topP}
                        onChange={handleTopPChange}
                        defaultValue={topP}
                        aria-label="Small"
                        min={0}
                        max={1}
                        step={0.1}
                        valueLabelDisplay="auto"
                        aria-describedby="text-topp-helper-text"
                    />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                    <Typography variant="body1" style={{ color: colors.blue[500] }}>
                        Max Tokens: {maxTokens}
                    </Typography>
                    <Typography variant="body2">
                        The maximum number of tokens to generate. Requests can use up to
                        2048 tokens shared between prompt and completion.
                    </Typography>
                    <Slider
                        size="medium"
                        value={maxTokens}
                        onChange={handleMaxTokensChange}
                        defaultValue={maxTokens}
                        aria-label="Small"
                        min={256}
                        max={2048}
                        step={1}
                        valueLabelDisplay="auto"
                        aria-describedby="text-max-tokens-helper-text"
                    />
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                    <Typography variant="body1" style={{ color: colors.blue[500] }}>
                        N: {settings.n}
                    </Typography>
                    <Typography variant="body2">
                        How many completions to generate for each prompt. Because this
                        parameter generates many completions, it can quickly consume your
                        token quota. Use carefully and ensure that you have reasonable
                        settings for max_tokens and stop.
                    </Typography>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                    <Typography variant="body1" style={{ color: colors.blue[500] }}>
                        Stream: {settings.stream ? "true" : "false"}
                    </Typography>
                    <Typography variant="body2">
                        Whether to stream back partial progress. If set, tokens will be sent
                        as data-only server-sent events as they become available, with the
                        stream terminated by a data: [DONE] message.
                    </Typography>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                    <Typography variant="body1" style={{ color: colors.blue[500] }}>
                        logprobs: {settings.logprobs == null ? "null" : settings.logprobs}
                    </Typography>
                    <Typography variant="body2">
                        Include the log probabilities on the logprobs most likely tokens, as
                        well the chosen tokens. For example, if logprobs is 5, the API will
                        return a list of the 5 most likely tokens. The API will always
                        return the logprob of the sampled token, so there may be up to
                        logprobs+1 elements in the response. The maximum value for logprobs
                        is 5.
                    </Typography>
                </FormControl>
                <FormControl variant="standard" sx={{ m: 1, mt: 3 }}>
                    <Typography variant="body1" style={{ color: colors.blue[500] }}>
                        Stop Sequence:
                    </Typography>
                    <Typography variant="body2">
                        Up to 4 sequences where the API will stop generating further
                        tokens. The returned text will not contain the stop sequence.
                    </Typography>
                    <TextField
                        id="stopSequences"
                        multiline
                        maxRows={4}
                        value={stopSequences}
                        onChange={handleStopSequencesChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        disabled={true}
                        variant="filled"
                        size="small"
                    />
                </FormControl>
                <Divider />
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="secondary"
                    startIcon={<CloseIcon />}
                >
                    Close Settings
                </Button>
                <Button
                    onClick={handleSubmit}
                    variant="outlined"
                    color="primary"
                    startIcon={<SaveIcon />}
                >
                    Save
                </Button>
            </Stack>
        </Drawer>
    );
};

export default TextSettings;
