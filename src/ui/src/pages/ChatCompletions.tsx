import { ReactElement, FC, useState } from "react";
import {
    Box,
    Button,
    Container,
    Drawer,
    Grid,
    Typography,
    Divider,
    colors,
    Stack,
    FormControl,
    Slider,
    InputLabel,
    Select,
    MenuItem,
    TextField
} from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearIcon from "@mui/icons-material/Clear";
import { Close as CloseIcon } from "@mui/icons-material";
import PageHeader from "../components/PageHeader";
import { SharedState } from "../state/SharedState";
import {
    CompletionMessage,
    ChatCompletionRequestSettings,
    openAIService
} from "../services/openAIService";

interface ChatCompletionsProps {
    sharedState: SharedState;
}

const ChatCompletions: FC<ChatCompletionsProps> = ({ sharedState }): ReactElement => {
    const [completionSettings, setCompletionSettings] = useState<ChatCompletionRequestSettings>({
        max_tokens: 1000,
        temperature: 0.5,
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
    const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);


    const [processing, setProcessing] = useState<boolean>(false);

    const [completionMessages, setCompletionMessages] = useState<CompletionMessage[]>([{
        role: "system",
        content: "You are an AI assistant that helps people find information."
    }]);


    const resetCompletions = () => { };


    const processCompletions = async () => {
        setProcessing(true);
        try {
            var complete = await openAIService.getChatCompletionsAsync(
                completionMessages,
                completionSettings
            );

            /**
             * ***************************************
             * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
             * ***************************************
             * This is where you would do something with the completion generated with OpenAI.
             * Look at complete.data.choices[0].message for the completion.
             */

            // Add the completion to the completion messages
            setCompletionMessages((prev) => {
                return [...prev, {
                    role: complete.response.completion.choices[0].message.role,
                    content: complete.response.completion.choices[0].message.content
                }, {
                    role: "user",
                    content: ""
                }];
            });
        } catch (error: any) {
            console.log(error);
            sharedState.setErrors((prev: any) => {
                return [...prev, error.message];
            });
        } finally {
            setProcessing(false);
        }
    };


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
                    title="Chat"
                    subtitle={`Generate chat completions based on the prompt.`}
                />
                <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
                    <Button
                        variant="outlined"
                        color="secondary"
                        startIcon={<SettingsIcon />}
                        onClick={() => setIsSettingsOpen(true)}
                    >
                        Settings
                    </Button>
                    <Button
                        style={{ marginLeft: "1rem" }}
                        variant="outlined"
                        color="primary"
                        startIcon={<ClearIcon />}
                        onClick={() => {
                            setCompletionMessages([{
                                role: "system",
                                content: "You are an AI assistant that helps people find information."
                            }]);
                        }}
                    >
                        Reset
                    </Button>
                </Box>
                <Stack spacing={2}>
                    {completionMessages.map((message, index) => {
                        return (
                            <Grid container spacing={2}
                                key={index}
                                style={{
                                    margin: "1rem 0 1rem 0",
                                    padding: "1rem 1.5rem 1.5rem 1rem",
                                    backgroundColor: message.role === "system" ? "#e0e0e0" : message.role === "user" ? "#e3f2fd" : "#f3e5f5",
                                    borderRadius: "1rem",
                                    boxShadow: "0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1)",
                                    alignSelf: message.role === "user" ? "end" : "start"
                                }}
                                sx={{
                                    width: {
                                        xs: "100%",
                                        sm: "100%",
                                        md: "80%"
                                    }
                                }}
                            >
                                <Grid item xs={12}>
                                    <FormControl fullWidth>
                                        <InputLabel>Role</InputLabel>
                                        <Select
                                            value={message.role}
                                            label="role"
                                            onChange={(event) => {
                                                var newMessages = [...completionMessages];
                                                newMessages[index].role = event.target.value as any;
                                                setCompletionMessages(newMessages);
                                            }}
                                            variant="outlined"
                                        >
                                            {/* IF index is 0, then have the "system" menu item, else have "user" and "assistant" menu items */}
                                            {index === 0 ? <MenuItem value="system">System</MenuItem> : <MenuItem value="user">User</MenuItem>}
                                            {index !== 0 ? <MenuItem value="assistant">Assistant</MenuItem> : null}
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item xs={12}>
                                    <TextField
                                        label={message.role + " message"}
                                        multiline
                                        minRows={4}
                                        defaultValue={message.content}
                                        fullWidth
                                        variant="standard"
                                        onChange={(event) => {
                                            var newMessages = [...completionMessages];
                                            newMessages[index].content = event.target.value;
                                            setCompletionMessages(newMessages);
                                        }}
                                    />

                                </Grid>
                                <Grid item justifyContent={"flex-end"} xs={12}>
                                    <Button
                                        variant="outlined"
                                        color="secondary" sx={{ mt: 3 }}
                                        onClick={async () => {
                                            var newMessages = [...completionMessages];

                                            // If last message was a system or assistant message, add a user message
                                            // Otherwise add an assistant message
                                            if (newMessages[index].role === "system" || newMessages[index].role === "assistant") {
                                                newMessages.push({
                                                    role: "user",
                                                    content: ""
                                                });
                                            } else {
                                                newMessages.push({
                                                    role: "assistant",
                                                    content: ""
                                                });
                                            }

                                            setCompletionMessages(newMessages);

                                        }}
                                        // Disabled if this this is not the last message or if is processing
                                        disabled={index !== completionMessages.length - 1 || processing}
                                    >
                                        add a new reply from here
                                    </Button>
                                    <Button
                                        style={{ marginLeft: "1rem" }}
                                        variant="outlined"
                                        color="error" sx={{ mt: 3 }}
                                        onClick={async () => {
                                            var newMessages = [...completionMessages];
                                            newMessages.splice(index, 1);
                                            setCompletionMessages(newMessages);
                                        }}
                                        disabled={message.role === "system" || processing}
                                    >
                                        delete this {message.role} message.
                                    </Button>
                                </Grid>
                                <Divider />
                            </Grid>
                        );
                    })
                    }
                    <Button
                        variant="contained" color="primary" sx={{ mt: 3 }}
                        onClick={processCompletions}
                        disabled={completionMessages.length === 0 || processing}
                    >
                        {processing ? "Processing..." : "Process completions"}
                    </Button>
                    <pre>{JSON.stringify(completionMessages, null, 4)}</pre>
                </Stack>

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

export default ChatCompletions;