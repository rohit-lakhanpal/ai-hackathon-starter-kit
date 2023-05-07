import React, { ReactElement, FC, useState, useEffect } from "react";
import {
  Alert,
  Box,
  Button,
  Container,
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
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import SettingsIcon from "@mui/icons-material/Settings";
import ClearIcon from "@mui/icons-material/Clear";
import CopyAllIcon from "@mui/icons-material/CopyAll";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import PageHeader from "../components/PageHeader";
import { SharedState } from "../state/SharedState";
import {
  oaiService,
  CompletionResponse,
  OpenAIConfigType,
  TextCompletionRequestSettings,
} from "../services/oaiService";
import TextSettings from "../components/TextSettings";
// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import Divider from "@mui/material/Divider";
// import ListItemText from "@mui/material/ListItemText";
// import ListItemAvatar from "@mui/material/ListItemAvatar";
// import Avatar from "@mui/material/Avatar";

interface CompleteProps {
  sharedState: SharedState;
}

interface Interation {
  response: CompletionResponse;
  query: string;
}

const Complete: FC<CompleteProps> = ({ sharedState }): ReactElement => {
  const [openAiInfo, setOpenAiInfo] = useState<OpenAIConfigType>();
  const [processing, setProcessing] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);
  const [content, setContent] = useState<string>("");
  const [interactions, setInteractions] = useState<Interation[]>([]);
  const [selectedInteraction, setSelectedInteraction] =
    useState<Interation | null>(null);

  const processCompletions = async () => {
    setProcessing(true);
    try {
      var complete = await oaiService.getCompletionAsync(
        content,
        openAiInfo?.settings?.text as TextCompletionRequestSettings
      );

      if (complete.error != null) {
        console.log(complete.error);
        sharedState.setErrors((prev: any) => {
          return [...prev, complete.error.code + ": " + complete.error.message];
        });
      }

      /**
       * ***************************************
       * NOTE TO DEVELOPER: YOUR_MAGIC_GOES_HERE
       * ***************************************
       * This is where you would do something with the completion generated with OpenAI.
       * Look at complete.data.choices[0].text for the completion.
       */

      let newInteraction = {
        response: complete,
        query: content,
      };
      setSelectedInteraction(newInteraction);
      setInteractions((prev) => [newInteraction, ...prev]);
    } catch (error: any) {
      console.log(error);
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

  const openSettings = async () => {
    // Check if info is set, else call the API
    if (openAiInfo == null) {
      try {
        var info = await oaiService.getInfoAsync();
        setOpenAiInfo(info);
      } catch (error: any) {
        sharedState.setErrors((prev: any) => {
          return [...prev, error.message];
        });
      }
    }

    // Toggle the drawer
    setIsSettingsOpen(!isSettingsOpen);
  };

  useEffect(() => {
    (async () => {
      try {
        // var info = await oaiService.getInfoAsync();
        // setOpenAiInfo(info);
        // Initialise th content with the transcript
        setContent(sharedState.transcript);
      } catch (error: any) {
        sharedState.setErrors((prev: any) => {
          return [...prev, error.message];
        });
      }
    })();
  }, [sharedState]);

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
          subtitle={`Generate completions using Open AI${
            openAiInfo?.type != null
              ? " (via " +
                openAiInfo.type +
                " " +
                openAiInfo?.settings?.text?.model +
                ")"
              : ""
          }.`}
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
              onClick={openSettings}
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
                        primary={i.query}
                        secondary={
                          <React.Fragment>
                            <Typography
                              sx={{ display: "inline" }}
                              component="span"
                              variant="body2"
                              color="text.primary"
                              noWrap={true}
                            ></Typography>
                            {i.response.data.choices[0].text.length > 50
                              ? i.response.data.choices[0].text.substring(
                                  0,
                                  50
                                ) + "..."
                              : i.response.data.choices[0].text.substring(
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
              {selectedInteraction == null ? "" : selectedInteraction.query}
            </Typography>
            <Divider />
            {selectedInteraction == null
              ? ""
              : selectedInteraction.response.data.choices.map(
                  (choice: any, index: number) => {
                    return (
                      <>
                        <Typography variant="caption">
                          Response #{index + 1}:
                        </Typography>
                        <Typography variant="body1">{choice.text}</Typography>
                        <Button
                          style={{
                            marginTop: "0.5rem",
                            marginBottom: "1rem",
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
                      </>
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
        {openAiInfo != null ? (
          <TextSettings
            open={isSettingsOpen}
            settings={openAiInfo.settings.text}
            onClose={() => {
              setIsSettingsOpen(false);
            }}
            onSubmit={(settings: TextCompletionRequestSettings) => {
              let toSubmit = openAiInfo as OpenAIConfigType;
              try {
                toSubmit.settings.text = settings;
                setOpenAiInfo(toSubmit);
                setIsSettingsOpen(false);
              } catch (error) {}
            }}
          />
        ) : (
          <></>
        )}
      </Container>
    </Box>
  );
};

export default Complete;
