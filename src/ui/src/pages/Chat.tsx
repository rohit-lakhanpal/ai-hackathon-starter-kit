// import React, { ReactElement, FC, useState } from "react";
// import {
//   Box,
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Paper,
//   Grid,
//   IconButton,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   FormControl,
//   InputLabel,
//   OutlinedInput,
// } from "@mui/material";
// import { Send, Settings, Mic } from "@mui/icons-material";
// import { SharedState } from "../state/SharedState";

// interface ChatProps {
//   sharedState: SharedState;
// }

// interface ChatMessage {
//   message: string;
//   sender: "user" | "system";
// }

// const Chat: FC<ChatProps> = ({ sharedState }): ReactElement => {
//   const [message, setMessage] = useState<string>("");
//   const [messages, setMessages] = useState<any[]>([]);
//   const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
//   const [modelName, setModelName] = useState<string>("");

//   const sendMessage = () => {
//     const userMessage = { message, sender: "user" };
//     const systemMessage = { message: "Dummy response from the system", sender: "system" };

//     setMessages([...messages, userMessage, systemMessage]);
//     setMessage("");
//   };

//   const toggleSettingsDialog = () => {
//     setSettingsOpen(!settingsOpen);
//   };

//   const startSpeechRecognition = () => {
//     console.log("Starting speech recognition...");
//   };

//   return (
//     <Box
//       sx={{
//         minHeight: "100vh",
//         display: "flex",
//         flexDirection: "column",
//         backgroundColor: "whitesmoke",
//         padding: "2rem",
//       }}
//     >
//       <Container maxWidth="xl">
//         <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//           <Typography variant="h3">Chat</Typography>
//           <IconButton color="primary" onClick={toggleSettingsDialog}>
//             <Settings />
//           </IconButton>
//         </Box>
//         <Box sx={{ flexGrow: 1, overflowY: "auto", marginBottom: 2 }}>
//           {messages.map((msg, index) => (
//             <Paper
//               key={index}
//               sx={{
//                 padding: 1,
//                 margin: "8px 0",
//                 background:
//                   msg.sender === "system" ? "lightgrey" : "primary.main",
//                 color: msg.sender === "system" ? "black" : "white",
//                 alignSelf: msg.sender === "system" ? "flex-start" : "flex-end",
//               }}
//             >
//               <Typography>{msg.message}</Typography>
//             </Paper>
//           ))}
//         </Box>
//       </Container>
//       <Box
//         component="footer"
//         sx={{
//           backgroundColor: "whitesmoke",
//           borderTop: "1px solid lightgrey",
//           padding: "1rem",
//         }}
//       >
//         <Container maxWidth="xl">
//           <Grid container spacing={2}>
//             <Grid item xs={8}>
//               <TextField
//                 fullWidth
//                 variant="outlined"
//                 label="Type your message"
//                 value={message}
//                 onChange={(e) => setMessage(e.target.value)}
//                 onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//               />
//             </Grid>
//             <Grid item xs={2}>
//               <Button fullWidth variant="contained" color="primary" onClick={startSpeechRecognition}>
//                 <Mic />
//               </Button>
//             </Grid>
//             <Grid item xs={2}>
//               <Button
//                 fullWidth
//                 variant="contained"
//                 color="primary"
//                 onClick={sendMessage}
//               >
//                 <Send />
//               </Button>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>

//       <Dialog
//         open={settingsOpen}
//         onClose={toggleSettingsDialog}
//         aria-labelledby="settings-dialog-title"
//       >
//         <DialogTitle id="settings-dialog-title">Settings</DialogTitle>
//         <DialogContent>
//           <form>
//             <FormControl fullWidth variant="outlined" margin="normal">
//               <InputLabel htmlFor="model-name">Model Name</InputLabel>
//               <OutlinedInput
//                 id="model-name"
//                 value={modelName}
//                 onChange={(e) => setModelName(e.target.value)}
//                 label="Model Name"
//               />
//             </FormControl>
//           </form>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={toggleSettingsDialog} color="primary">
//             Cancel
//           </Button>
//           <Button onClick={toggleSettingsDialog} color="primary" variant="contained">
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default Chat;

import {ReactElement, FC} from "react";
import {Box, Container} from "@mui/material";
import PageHeader  from "../components/PageHeader";
import { SharedState } from "../state/SharedState";




interface ChatProps {
    sharedState: SharedState;
}

const Chat: FC<ChatProps> = ({sharedState}): ReactElement => {
    return (
        <Box sx={{
          flexGrow: 1,
          backgroundColor: 'whitesmoke',
          display: 'block',            
          padding: '2rem',
        }}>            
           <Container maxWidth="xl">
              <PageHeader title="Chat" subtitle="Chat functionality." />
            </Container>
        </Box>
    );
};

export default Chat;

