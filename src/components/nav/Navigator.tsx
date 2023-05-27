"use client";
import * as React from "react";
import { useRouter, usePathname } from "next/navigation";
import Divider from "@mui/material/Divider";
import Drawer, { DrawerProps } from "@mui/material/Drawer";
import List from "@mui/material/List";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import SummarizeIcon from "@mui/icons-material/Summarize";
import GroupsIcon from "@mui/icons-material/Groups";
import SettingsIcon from "@mui/icons-material/Settings";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import { useSession } from "next-auth/react";
import Skeleton from "@mui/material/Skeleton";

const categories = [
  {
    id: "Leader",
    children: [
      {
        id: "Reports",
        path: "/leader/reports",
        icon: <SummarizeIcon />,
        active: true,
      },
      {
        id: "Members",
        icon: <PeopleIcon />,
        path: "/leader/members",
        active: false,
      },
      {
        id: "Group Settings",
        icon: <GroupsIcon />,
        path: "/leader/group",
        active: false,
      },
      {
        id: "Account Settings",
        icon: <SettingsIcon />,
        path: "/leader/account",
        active: false,
      },
    ],
  },
  {
    id: "User",
    children: [
      {
        id: "Reports",
        path: "/leader/reports",
        icon: <SummarizeIcon />,
        active: true,
      },
      {
        id: "Members",
        icon: <PeopleIcon />,
        path: "/leader/members",
        active: false,
      },
      {
        id: "Group Settings",
        icon: <GroupsIcon />,
        path: "/leader/group",
        active: false,
      },
      {
        id: "Account Settings",
        icon: <SettingsIcon />,
        path: "/leader/account",
        active: false,
      },
    ],
  },
  {
    id: "Admin",
    children: [
      {
        id: "Group Reports",
        icon: <SummarizeIcon />,
        path: "admin/reports",
        active: false,
      },
      {
        id: "Approvals",
        icon: <ThumbUpOffAltIcon />,
        path: "admin/approvals",
        active: false,
      },
      {
        id: "Groups",
        icon: <SettingsIcon />,
        path: "admin/groups",
        active: false,
      },
      { id: "Setting", icon: <SettingsIcon />, path: "admin-settings" },
    ],
  },
];

const item = {
  py: "2px",
  px: 3,
  color: "rgba(255, 255, 255, 0.7)",
  "&:hover, &:focus": {
    bgcolor: "rgba(255, 255, 255, 0.08)",
  },
};

const itemCategory = {
  boxShadow: "0 -1px 0 rgb(255,255,255,0.1) inset",
  py: 1.5,
  px: 3,
};

export default function Navigator(props: DrawerProps) {
  const { ...other } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  // if (!session || !session.user) return null;

  // //@ts-ignore
  // if (session.user?.role === "USER") return null;

  //if (status === "loading") return <div>Loading ...</div>;

  React.useEffect(() => {
    console.log("session", session);
  }, [session]);

  return (
    <Drawer variant="permanent" {...other}>
      <List disablePadding>
        <ListItem
          sx={{ ...item, ...itemCategory, fontSize: 22, color: "#fff" }}
        >
          Gochul
        </ListItem>
        {/* <ListItem sx={{ ...item, ...itemCategory }}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </ListItem> */}
        {/* {status === "loading" && (
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemText>Loading ...</ListItemText>
          </ListItem>
        )} */}
        {status === "unauthenticated" && (
          <ListItem sx={{ ...item, ...itemCategory }}>
            <ListItemText>Log in to see the menu</ListItemText>
          </ListItem>
        )}
        {status === "loading" &&
          categories.slice(0, 1).map(({ id, children }) => (
            <Box key={id} sx={{ bgcolor: "#101F33" }}>
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText>
                  <Skeleton
                    animation="wave"
                    variant="rectangular"
                    sx={{ bgcolor: "grey.700" }}
                  />
                </ListItemText>
              </ListItem>
              {children.map(({ id: childId, icon, active, path }) => (
                <ListItem disablePadding key={childId}>
                  {/* TODO: should be active if the path matches its path */}
                  <ListItemButton
                    selected={pathname === path}
                    sx={item}
                    onClick={() => router.push(path)}
                  >
                    <ListItemIcon>
                      <Skeleton
                        variant="circular"
                        sx={{
                          bgcolor: "grey.700",
                        }}
                      >
                        {icon}
                      </Skeleton>
                    </ListItemIcon>
                    <ListItemText>
                      <Skeleton
                        animation="wave"
                        variant="rectangular"
                        sx={{ bgcolor: "grey.700" }}
                      />
                    </ListItemText>
                  </ListItemButton>
                </ListItem>
              ))}
              <Divider sx={{ mt: 2 }} />
            </Box>
          ))}
        {status === "authenticated" &&
          session &&
          session.user &&
          //@ts-ignore
          session.user.role &&
          categories.map(({ id, children }) => (
            <>
              {/* @ts-ignore */}
              {session.user.role.toLowerCase() === id.toLowerCase() && (
                <Box key={id} sx={{ bgcolor: "#101F33" }}>
                  <ListItem sx={{ py: 2, px: 3 }}>
                    <ListItemText sx={{ color: "#fff" }}>{id}</ListItemText>
                  </ListItem>
                  {children.map(({ id: childId, icon, active, path }) => (
                    <ListItem disablePadding key={childId}>
                      {/* TODO: should be active if the path matches its path */}
                      <ListItemButton
                        selected={pathname === path}
                        sx={item}
                        onClick={() => router.push(path)}
                      >
                        <ListItemIcon>{icon}</ListItemIcon>
                        <ListItemText>{childId}</ListItemText>
                      </ListItemButton>
                    </ListItem>
                  ))}
                  <Divider sx={{ mt: 2 }} />
                </Box>
              )}
            </>
          ))}
      </List>
    </Drawer>
  );
}
