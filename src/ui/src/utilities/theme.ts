import { createTheme, responsiveFontSizes,  } from "@mui/material/styles";

// Create a dark theme
let theme = createTheme({
    palette: {
        mode: 'light'        
    }
});
theme = responsiveFontSizes(theme);
export default theme;