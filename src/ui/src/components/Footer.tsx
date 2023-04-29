import React, { FC, ReactElement, useEffect } from "react";
import { Box, Container, Grid, Link, Typography, colors } from "@mui/material";
import CodeIcon from '@mui/icons-material/Code';
import FavoriteIcon from '@mui/icons-material/Favorite';
import GitHubIcon from '@mui/icons-material/GitHub';
import { infoService } from "../services/infoService";

export const Footer: FC = (): ReactElement => {
    const [appInfo, setAppInfo] = React.useState<any>({});
    useEffect(() => {
        (async () => {                          
            try{
                var about = await infoService.getAppInfoAsync();
                setAppInfo(about);
            }
            catch(error) {
                console.error(error);
            }
        })();
      }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "auto",
        paddingTop: "1rem",
        paddingBottom: "1rem",
      }}
    >
      <Container maxWidth="lg">        
        <Grid container direction="column" alignItems="center" >
          <Grid item xs={12}>
            <Typography color="black" variant="inherit" style={{              
              display: 'flex'
            }}>
                <CodeIcon fontSize="medium" style={{ color: colors.grey[700] }} />
                &nbsp;with&nbsp;
                <FavoriteIcon fontSize="small" style={{ color: colors.red[400]}} />
                &nbsp;at&nbsp;
                <Link href={appInfo.repositoryOptional || ""} target="_blank" rel="noreferrer" color="inherit">
                    <GitHubIcon fontSize="small" />
                </Link>
            </Typography>
          </Grid>          
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;