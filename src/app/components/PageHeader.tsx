"use client";
import * as React from "react";
import CustomThemeProvider from "./CustomThemeProvider";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HelpIcon from "@mui/icons-material/Help";
import Navigator from "./Navigator";
import MainHeader from "./MainHeader";
import { useRouter } from "next/navigation";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface PageLayoutProps {
  pageName: string;
  children?: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ pageName, children }) => {
  const [tabValue, setTabValue] = React.useState<string>("new");
  const router = useRouter();

  return (
    <>
      <CustomThemeProvider>
        <CssBaseline />
        <AppBar
          component="div"
          color="primary"
          position="static"
          elevation={0}
          sx={{ zIndex: 0 }}
        >
          <Toolbar>
            <Grid container alignItems="center" spacing={1}>
              <Grid item xs>
                <Typography color="inherit" variant="h5" component="h1">
                  {pageName || "Page Name"}
                </Typography>
              </Grid>
              <Grid item>
                <Button
                  sx={{ borderColor: lightColor }}
                  variant="outlined"
                  color="inherit"
                  size="small"
                >
                  Web setup
                </Button>
              </Grid>
              <Grid item>
                <Tooltip title="Help">
                  <IconButton color="inherit">
                    <HelpIcon />
                  </IconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
        <AppBar
          component="div"
          position="static"
          elevation={0}
          sx={{ zIndex: 0 }}
        >
          <Tabs
            value={tabValue}
            textColor="inherit"
            onChange={(e, value) => {
              console.log("change", value);
              setTabValue(value);
              router.push(`/${value}`);
            }}
          >
            <Tab label="New Report" value="reports/new" />
            <Tab label="Previous Reports" value="reports" />
            {/* <Tab label="Reports Stats" />
            <Tab label="Usage" /> */}
          </Tabs>
        </AppBar>
        {children}
      </CustomThemeProvider>
    </>
  );
};

export default PageLayout;
