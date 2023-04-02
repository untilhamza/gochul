"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import MuiLink from "@mui/material/Link";
import Link from "next/link";
import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import PageHeader from "./PageHeader";
import { useSession } from "next-auth/react";
import { signOut, signIn } from "next-auth/react";

const lightColor = "rgba(255, 255, 255, 0.7)";

interface HeaderProps {
  onDrawerToggle: () => void;
}

export default function Header(props: HeaderProps) {
  const { onDrawerToggle } = props;
  const [tabValue, setTabValue] = React.useState<number>(0);
  const { data: session } = useSession();

  const avatarUrl = session?.user?.image || "/images/face.png";

  return (
    <React.Fragment>
      <AppBar color="primary" position="sticky" elevation={0}>
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid sx={{ display: { sm: "none", xs: "block" } }} item>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={onDrawerToggle}
                edge="start"
              >
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs />
            <Grid item>
              <Link
                href="https://www.yoidoenglishministry.org/"
                target="_blank"
                className="text-white hover:text-blue-100"
              >
                Go to YEM
              </Link>
            </Grid>
            <Grid item>
              <Tooltip title="Alerts • No alerts">
                <IconButton color="inherit">
                  <NotificationsIcon />
                </IconButton>
              </Tooltip>
            </Grid>
            <Grid item>
              <IconButton color="inherit" sx={{ p: 0.5 }}>
                <Avatar src={avatarUrl} alt="My Avatar" />
              </IconButton>
            </Grid>
            <Grid item>
              {session && (
                <Button color="inherit" onClick={() => signOut()}>
                  Logout
                </Button>
              )}
              {!session && (
                <Button color="inherit" onClick={() => signIn()}>
                  sign in
                </Button>
              )}
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}
