"use client";
import * as React from "react";
import CustomThemeProvider from "./CustomThemeProvider";
import Typography from "@mui/material/Typography";
import CssBaseline from "@mui/material/CssBaseline";
import { usePathname } from "next/navigation";
import Toolbar from "@mui/material/Toolbar";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import HelpIcon from "@mui/icons-material/Help";
import { useRouter } from "next/navigation";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface PageLayoutProps {
  pageName: string;
  children?: React.ReactNode;
  tabs: PageTab[];
}

const PageHeader: React.FC<PageLayoutProps> = ({
  pageName,
  children,
  tabs,
}) => {
  const [tabValue, setTabValue] = React.useState<string>("new-report");
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="sticky top-0">
      <CustomThemeProvider>
        <CssBaseline />
        <div className="static z-0 bg-[#009be5] text-white">
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
        </div>
        <div className="static z-0 bg-[#009be5] text-white">
          <PageTabs tabs={tabs} />
        </div>
        {children}
      </CustomThemeProvider>
    </div>
  );
};

export default PageHeader;

const PageTabs: React.FC<{ tabs: PageTab[] }> = ({ tabs }) => {
  const router = useRouter();
  const pathname = usePathname()?.split("/")[1];
  console.log("pathname", pathname);
  return tabs && tabs.length ? (
    <Tabs
      value={pathname}
      textColor="inherit"
      onChange={(e, value) => {
        router.push(`/${value}`);
      }}
    >
      {tabs.map((tab, index) => (
        <Tab label={tab.label} value={tab.path} key={index} />
      ))}
    </Tabs>
  ) : null;
};
