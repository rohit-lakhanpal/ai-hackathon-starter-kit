// import { ReactElement, useState, useEffect, FC } from "react";
// import {
//     Box,
//     Container,
//     FormControl,
//     TextField,
//     Stack,
//     Button,
//     Select,
//     InputLabel,
//     MenuItem,
//     Grid,
//     Divider,
//     Alert
// } from "@mui/material";
// import SettingsIcon from "@mui/icons-material/Settings";
// import PageHeader from "../components/PageHeader";
// import { SharedState } from "../state/SharedState";
// import {
//     oaiService,
//     ChatCompletionResponse,
//     OpenAIConfigType,
//     CompletionMessage,
//     ChatCompletionRequestSettings
// } from "../services/oaiService";
// import ChatSettings from "../components/ChatSettings";

// interface ChatProps {
//     sharedState: SharedState;
// }

// // eslint-disable-next-line @typescript-eslint/no-unused-vars
// interface Interation {
//     response: ChatCompletionResponse;
//     query: string;
// }

// const Chat: FC<ChatProps> = ({ sharedState }): ReactElement => {
//     const [processing, setProcessing] = useState<boolean>(false);
//     const [openAiInfo, setOpenAiInfo] = useState<OpenAIConfigType>();
//     const [completionMessages, setCompletionMessages] = useState<CompletionMessage[]>([]);
//     const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

//     const processCompletions = async () => {
//         setProcessing(true);
//         try {
//             var complete = await oaiService.getChatCompletionAsync(
//                 completionMessages,
//                 openAiInfo?.settings?.chat as ChatCompletionRequestSettings
//             );

//             if (complete.error != null) {
//                 console.log(complete.error);
//                 sharedState.setErrors((prev: any) => {
//                     return [...prev, complete.error.code + ": " + complete.error.message];
//                 });
//             }

//             /**
//              * ***************************************
//              * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
//              * ***************************************
//              * This is where you would do something with the completion generated with OpenAI.
//              * Look at complete.data.choices[0].message for the completion.
//              */

//             // Add the completion to the completion messages
//             setCompletionMessages((prev) => {
//                 return [...prev, {
//                     role: complete.data.choices[0].message.role as any,
//                     content: complete.data.choices[0].message.content
//                 },{
//                     role: "user",
//                     content: ""
//                 }];
//             });
//         } catch (error: any) {
//             console.log(error);
//             sharedState.setErrors((prev: any) => {
//                 return [...prev, error.message];
//             });
//         } finally {
//             setProcessing(false);
//         }
//     };

//     const openSettings = async () => {
//         // Check if info is set, else call the API
//         if (openAiInfo == null) {
//             try {
//                 var info = await oaiService.getInfoAsync();
//                 setOpenAiInfo(info);
//             } catch (error: any) {
//                 sharedState.setErrors((prev: any) => {
//                     return [...prev, error.message];
//                 });
//             }
//         }

//         // Toggle the drawer
//         setIsSettingsOpen(!isSettingsOpen);
//     };

//     useEffect(() => {
//         (async () => {
//             try {
//                 var info = await oaiService.getInfoAsync();
//                 setOpenAiInfo(info);
//                 // Initialise the content with the transcript
//                 // setContent(sharedState.transcript);

//                 var completionMessagesText = "You are an AI assistant that helps people find information.";

//                 setCompletionMessages([{
//                     role: "system",
//                     content: completionMessagesText
//                 }])

//             } catch (error: any) {
//                 sharedState.setErrors((prev: any) => {
//                     return [...prev, error.message];
//                 });
//             }
//         })();
//     }, [sharedState]);

//     return (
//         <Box
//             sx={{
//                 flexGrow: 1,
//                 backgroundColor: "whitesmoke",
//                 display: "block",
//                 padding: "2rem",
//             }}
//         >
//             <Container maxWidth="xl">
//                 <PageHeader title="Chat"
//                     subtitle={`Generate chat completions using Open AI${openAiInfo?.type != null
//                         ? " (via " +
//                         openAiInfo.type +
//                         " " +
//                         openAiInfo?.settings?.chat?.model +
//                         ")"
//                         : ""
//                         }.`} />
//                 <Box sx={{ display: "flex", justifyContent: "flex-start" }}>
//                     <Button
//                         variant="outlined"
//                         color="secondary"
//                         startIcon={<SettingsIcon />}
//                         onClick={openSettings}
//                     >
//                         Settings
//                     </Button>
//                 </Box>
//                 <Box hidden={sharedState.errors.length < 1}>
//                     {sharedState.errors.map((e: any, i: number) => {
//                         return (
//                             <Alert
//                                 key={i}
//                                 severity="error"
//                                 onClose={() => sharedState.binErrors(i)}
//                             >
//                                 {e}
//                             </Alert>
//                         );
//                     })}
//                 </Box>
//                 <Stack spacing={2}>
//                     {completionMessages.map((message, index) => {
//                         return (
//                             <Grid container spacing={2}
//                                 key={index}
//                                 style={{
//                                     margin: "1rem 0 1rem 0",
//                                     padding: "1rem 1.5rem 1.5rem 1rem",
//                                     backgroundColor: message.role === "system" ? "#e0e0e0" : message.role === "user" ? "#e3f2fd" : "#f3e5f5",
//                                     borderRadius: "1rem",
//                                     boxShadow: "0 0 0.5rem 0.1rem rgba(0, 0, 0, 0.1)",
//                                     alignSelf: message.role === "user" ? "end" : "start"
//                                 }}
//                                 sx={{
//                                     width: {
//                                         xs: "100%",
//                                         sm: "100%",
//                                         md: "80%"
//                                     }
//                                 }}
//                             >
//                                 <Grid item xs={12}>
//                                     <FormControl fullWidth>
//                                         <InputLabel>Role</InputLabel>
//                                         <Select
//                                             value={message.role}
//                                             label="role"
//                                             onChange={(event) => {
//                                                 var newMessages = [...completionMessages];
//                                                 newMessages[index].role = event.target.value as any;
//                                                 setCompletionMessages(newMessages);
//                                             }}
//                                             variant="outlined"
//                                         >
//                                             {/* IF index is 0, then have the "system" menu item, else have "user" and "assistant" menu items */}
//                                             {index === 0 ? <MenuItem value="system">System</MenuItem> : <MenuItem value="user">User</MenuItem>}
//                                             {index !== 0 ? <MenuItem value="assistant">Assistant</MenuItem> : null}
//                                         </Select>
//                                     </FormControl>
//                                 </Grid>
//                                 <Grid item xs={12}>
//                                     <TextField
//                                         label={message.role + " message"}
//                                         multiline
//                                         minRows={4}
//                                         defaultValue={message.content}
//                                         fullWidth
//                                         variant="standard"
//                                         onChange={(event) => {
//                                             var newMessages = [...completionMessages];
//                                             newMessages[index].content = event.target.value;
//                                             setCompletionMessages(newMessages);
//                                         }}
//                                     />

//                                 </Grid>
//                                 <Grid item justifyContent={"flex-end"} xs={12}>
//                                     <Button
//                                         variant="outlined"
//                                         color="secondary" sx={{ mt: 3 }}
//                                         onClick={async () => {
//                                             var newMessages = [...completionMessages];

//                                             // If last message was a system or assistant message, add a user message
//                                             // Otherwise add an assistant message
//                                             if (newMessages[index].role === "system" || newMessages[index].role === "assistant") {
//                                                 newMessages.push({
//                                                     role: "user",
//                                                     content: ""
//                                                 });
//                                             } else {
//                                                 newMessages.push({
//                                                     role: "assistant",
//                                                     content: ""
//                                                 });
//                                             }

//                                             setCompletionMessages(newMessages);

//                                         }}
//                                         // Disabled if this this is not the last message or if is processing
//                                         disabled={index !== completionMessages.length - 1 || processing}
//                                     >
//                                         add a new reply from here
//                                     </Button>
//                                     <Button
//                                         style={{ marginLeft: "1rem" }}
//                                         variant="outlined"
//                                         color="error" sx={{ mt: 3 }}
//                                         onClick={async () => {
//                                             var newMessages = [...completionMessages];
//                                             newMessages.splice(index, 1);
//                                             setCompletionMessages(newMessages);
//                                         }}
//                                         disabled={message.role === "system" || processing}
//                                     >
//                                         delete this {message.role} message.
//                                     </Button>
//                                 </Grid>
//                                 <Divider />
//                             </Grid>
//                         );
//                     })
//                     }


//                     <Button
//                         variant="contained" color="primary" sx={{ mt: 3 }}
//                         onClick={processCompletions}
//                         disabled={completionMessages.length === 0 || processing}
//                     >
//                         {processing ? "Processing..." : "Process completions"}
//                     </Button>
//                     <pre>{JSON.stringify(completionMessages, null, 4)}</pre>
//                 </Stack>
//                 {openAiInfo != null ? (
//                     <ChatSettings
//                         open={isSettingsOpen}
//                         settings={openAiInfo.settings.chat}
//                         onClose={() => {
//                             setIsSettingsOpen(false);
//                         }}
//                         onSubmit={(settings: ChatCompletionRequestSettings) => {
//                             let toSubmit = openAiInfo as OpenAIConfigType;
//                             try {
//                                 toSubmit.settings.chat = settings;
//                                 setOpenAiInfo(toSubmit);
//                                 setIsSettingsOpen(false);
//                             } catch (error) { }
//                         }}
//                     />
//                 ) : (
//                     <></>
//                 )}
//             </Container>

//         </Box>
//     );
// };

// export default Chat;

export { };