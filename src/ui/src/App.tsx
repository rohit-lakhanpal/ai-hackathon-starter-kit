import React, { useState } from "react";
import { Box, CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes as appRoutes } from "./utilities/routes";
import theme from './utilities/theme';

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { SharedState } from "./state/SharedState";

function App() {  
  const [transcript, setTranscript] = useState<string>("");
  const [errors, setErrors] = useState<any>([]);
  const [warnings, setWarnings] = useState<any>([]);
  const binErrors = (idx: number) => {
    // remove the warning at idx
    setErrors((prev:any) => {
        return prev.filter((e:any, i:number) => {
            return i !== idx;
        })
    });
  };
  const binWarnings = (idx: number) => {
    // remove the warning at idx
    setWarnings((prev:any) => {
        return prev.filter((e:any, i:number) => {
            return i !== idx;
        })
    });
}  

  const sharedState: SharedState = {
    transcript,
    setTranscript,
    errors,
    setErrors,
    binErrors,
    warnings,
    setWarnings,
    binWarnings
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box height="100vh" display="flex" flexDirection="column">
        <Router>
          <Navbar />
          <Routes>
            {appRoutes.map((route) => (
              <Route
                key={route.key}
                path={route.path}
                element={React.createElement(route.component, {sharedState})}
              />
            ))}
          </Routes>
          <Footer />
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;
