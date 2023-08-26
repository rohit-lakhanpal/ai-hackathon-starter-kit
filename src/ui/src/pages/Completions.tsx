import React, { ReactElement, FC, useState, useEffect } from "react";
import {
    Alert,
    Box,
    Button,
    Container,
    Drawer,
    Grid,
    Input,
    Typography,
    List,
    ListItem,
    Divider,
    ListItemText,
    ListItemAvatar,
    Avatar,
    colors,
    Stack,
    FormControl,
    Slider
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearIcon from "@mui/icons-material/Clear";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import { Close as CloseIcon } from "@mui/icons-material";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PageHeader from "../components/PageHeader";
import { SharedState } from "../state/SharedState";
import {
    CompletionResponse,
    TextCompletionRequestSettings,
    openAIService
} from "../services/openAIService";

interface CompletionsProps {
    sharedState: SharedState;
}

interface Interation {
    id: string;
    prompt: string;
    response: CompletionResponse;
}

const Completions: FC<CompletionsProps> = ({ sharedState }): ReactElement => {
    const [completionSettings, setCompletionSettings] = useState<TextCompletionRequestSettings>({
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 1,
        n: 1,
    });

    const [temperature, setTemperature] = useState<number>(completionSettings.temperature);
    const handleTemperatureChange = (event: any, newValue: number | number[]) => {
        setTemperature(newValue as number);
        setCompletionSettings((prev) => {
            return {
                ...prev,
                temperature: newValue as number,
            };
        });
    };

    const [topP, setTopP] = useState<number>(completionSettings.top_p);
    const handleTopPChange = (event: any, newValue: number | number[]) => {
        setTopP(newValue as number);
        setCompletionSettings((prev) => {
            return {
                ...prev,
                top_p: newValue as number,
            };
        }
        );
    };

    const [maxTokens, setMaxTokens] = useState<number>(completionSettings.max_tokens);
    const handleMaxTokensChange = (event: any, newValue: number | number[]) => {
        setMaxTokens(newValue as number);
        setCompletionSettings((prev) => {
            return {
                ...prev,
                max_tokens: newValue as number,
            };
        }
        );
    };

    const [n] = useState<number>(completionSettings.n);


    const [interactions, setInteractions] = useState<Interation[]>([]);
    const [selectedInteraction, setSelectedInteraction] =
        useState<Interation | null>(null);
    const [processing, setProcessing] = useState<boolean>(false);
    const [content, setContent] = useState<string>("");
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

    const processCompletions = async () => {
        setProcessing(true);
        try {
            let completion = await openAIService.getCompletionsAsync(content, completionSettings);
            /**
             * ***************************************
             * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
             * ***************************************
             * This is where you would do something with the completion generated with OpenAI.
             * Look at complete.data.choices[0].text for the completion.
             */

            let newInteraction = {
                id: completion.response.completion.id,
                prompt: content,
                response: completion
            };

            setSelectedInteraction(newInteraction);
            setInteractions((prev) => [newInteraction, ...prev]);
        } catch (error: any) {
            sharedState.setErrors((prev: any) => {
                return [...prev, error.message];
            });
        } finally {
            setProcessing(false);
        }

    };

    const resetCompletions = async () => {
        setProcessing(false);
        setContent("");
        setInteractions([]);
        setSelectedInteraction(null);
    };

    useEffect(() => {
        // getStatus();
    }, []);

    return (
        <Box
            sx={{
                flexGrow: 1,
                backgroundColor: "whitesmoke",
                display: "block",
                padding: "2rem",
            }}
        >
            <Container maxWidth="xl">
                <PageHeader
                    title="Complete"
                    subtitle={`Generate completions based on the prompt.`}
                />
                <Box hidden={sharedState.errors.length < 1}>
                    {sharedState.errors.map((e: any, i: number) => {
                        return (
                            <Alert
                                key={i}
                                severity="error"
                                onClose={() => sharedState.binErrors(i)}
                            >
                                {e}
                            </Alert>
                        );
                    })}
                </Box>
                <Grid container spacing={2} style={{ marginTop: "1rem" }}>
                    <Grid item>
                        <Button
                            onClick={processCompletions}
                            disabled={content === "" || processing}
                            variant="contained"
                            startIcon={<SendIcon />}
                        >
                            Process
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={resetCompletions}
                            disabled={content === ""}
                            variant="outlined"
                            color="primary"
                            startIcon={<ClearIcon />}
                        >
                            Clear
                        </Button>
                    </Grid>
                    <Grid item>
                        <Button
                            onClick={() => setIsSettingsOpen(true)}
                            variant="outlined"
                            color="secondary"
                            startIcon={<SettingsIcon />}
                        >
                            Settings
                        </Button>
                    </Grid>
                </Grid>
                <Grid container spacing={1} style={{ marginTop: "1rem" }}>
                    <Grid item xs={12}>
                        <Input
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="Type something here.."
                            value={content}
                            fullWidth={true}
                            multiline={true}
                            minRows={3}
                            maxRows={25}
                            style={{
                                fontSize: "1rem",
                                //fontFamily: "monospace",
                                color: colors.grey[600],
                            }}
                        />
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}
                    style={{ marginTop: "1rem" }}
                    sx={{
                        visibility:
                            interactions == null || interactions.length < 1
                                ? "hidden"
                                : "visible",
                    }}
                >
                    <Grid
                        item
                        xs={12}
                        md={3}
                        style={{ borderRight: "0.1rem solid lightgrey", padding: "1rem" }}
                    >
                        <Typography variant="h6">Generated completions:</Typography>
                        <List sx={{ width: "100%", cursor: "pointer" }}>
                            {interactions.map((i: Interation, index: number) => {
                                return (
                                    <React.Fragment key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar variant="rounded">
                                                    <QuestionAnswerIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                onClick={() => setSelectedInteraction(i)}
                                                primary={i.prompt}
                                                secondary={
                                                    <React.Fragment>
                                                        <Typography
                                                            sx={{ display: "inline" }}
                                                            component="span"
                                                            variant="body2"
                                                            color="text.primary"
                                                            noWrap={true}
                                                        ></Typography>
                                                        {i.response.response.completion.choices[0].text.length > 50
                                                            ? i.response.response.completion.choices[0].text.substring(
                                                                0,
                                                                50
                                                            ) + "..."
                                                            : i.response.response.completion.choices[0].text.substring(
                                                                0,
                                                                50
                                                            )}
                                                    </React.Fragment>
                                                }
                                            />
                                        </ListItem>
                                        <Divider variant="inset" component="li" />
                                    </React.Fragment>
                                );
                            })}
                        </List>
                    </Grid>
                    <Grid item xs={12} md={9} style={{ padding: "1rem" }}>
                        <Typography
                            variant="h6"
                            style={{
                                color: colors.blue[600],
                                fontWeight: "bold",
                            }}
                        >
                            {selectedInteraction == null ? "" : selectedInteraction.prompt}
                        </Typography>
                        <Divider />
                        {selectedInteraction == null
                            ? ""
                            : selectedInteraction.response.response.completion.choices.map(
                                (choice: any, index: number) => {
                                    return (
                                        <React.Fragment key={index}>
                                            <Typography variant="caption">
                                                Response #{index + 1}:
                                            </Typography>
                                            <Typography variant="body1"
                                                style={{
                                                    whiteSpace: "pre-wrap",
                                                }}
                                                >
                                                {choice.text}</Typography>
                                            <Button
                                                style={{
                                                    marginTop: "0.5rem",
                                                    marginBottom: "1rem"
                                                }}
                                                variant="outlined"
                                                color="secondary"
                                                size="small"
                                                onClick={() => {
                                                    if (selectedInteraction != null) {
                                                        navigator.clipboard.writeText(choice.text);
                                                        sharedState.setTranscript(choice.text);
                                                    }
                                                }}
                                            >
                                                <CopyAllIcon />
                                                Copy Response {index + 1}
                                            </Button>
                                        </React.Fragment>
                                    );
                                }
                            )}
                        <Divider />
                        <Typography variant="caption" style={{ marginTop: "1rem" }}>
                            JSON Payload:
                        </Typography>
                        <pre
                            style={{
                                fontSize: "0.8rem",
                            }}
                        >
                            {selectedInteraction == null
                                ? ""
                                : JSON.stringify(selectedInteraction.response, null, 2)}
                        </pre>
                    </Grid>
                </Grid>
                <Grid
                    container
                    spacing={1}
                    style={{ padding: "1rem" }}
                    sx={{
                        visibility:
                            interactions == null || interactions.length < 1
                                ? "visible"
                                : "hidden",
                    }}
                >
                    <Typography variant="subtitle1">
                        No completions generated yet. Type something and click "Process" to
                        get started.
                    </Typography>
                </Grid>
                <Drawer
                    variant="persistent"
                    anchor="right"
                    open={isSettingsOpen}
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
                                N: {n}
                            </Typography>
                            <Typography variant="body2">
                                How many completions to generate for each prompt. Because this
                                parameter generates many completions, it can quickly consume your
                                token quota. Use carefully and ensure that you have reasonable
                                settings for max_tokens and stop.
                            </Typography>
                        </FormControl>
                        <Divider />
                        <Button
                            onClick={() => setIsSettingsOpen(false)}
                            variant="outlined"
                            color="secondary"
                            startIcon={<CloseIcon />}
                        >
                            Close Settings
                        </Button>
                    </Stack>
                </Drawer>
            </Container>
        </Box>
    );
};

export default Completions;