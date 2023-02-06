"use client";
import React, { useState } from "react";
import { FormControl } from "@mui/material";
import FormLabel from "@mui/material/FormLabel";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

const ReportSubmission = () => {
  const [membersPresent, setMembersPresent] = useState<any>([
    { name: "red" },
    { name: "blue" },
    { name: "pink" },
  ]);
  const [eventsActivities, setEventsActivities] = useState<any>("");
  const [online, setOnline] = useState<any>(false);
  const [prayerRequests, setPrayerRequests] = useState<any>("");

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(
      "Report submitted: ",
      membersPresent,
      eventsActivities,
      online,
      prayerRequests
    );
  };

  // return <h1>test</h1>;

  return (
    <Box
      component="div"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "100%" },
      }}
    >
      <form onSubmit={handleSubmit}>
        <Stack>
          <FormControl component="fieldset">
            <FormLabel component="legend">Members Present</FormLabel>
            {/* {membersPresent.map((member: any) => {
              return (
                <FormControlLabel
                  key={member.name}
                  control={
                    <Checkbox
                      checked={membersPresent.indexOf(member) !== -1}
                      onChange={(e) => {
                        const newMembersPresent = [...membersPresent];
                        if (e.target.checked) {
                          newMembersPresent.push(member);
                        } else {
                          newMembersPresent.splice(
                            newMembersPresent.indexOf(member),
                            1
                          );
                        }
                        setMembersPresent(newMembersPresent);
                      }}
                      name={member}
                    />
                  }
                  label={member}
                />
              );
            })} */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={membersPresent.indexOf("member1") !== -1}
                  onChange={(e) => {
                    const newMembersPresent = [...membersPresent];
                    if (e.target.checked) {
                      newMembersPresent.push("member1");
                    } else {
                      newMembersPresent.splice(
                        newMembersPresent.indexOf("member1"),
                        1
                      );
                    }
                    setMembersPresent(newMembersPresent);
                  }}
                  name="member1"
                />
              }
              label="Member 1"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={membersPresent.indexOf("member1") !== -1}
                  onChange={(e) => {
                    const newMembersPresent = [...membersPresent];
                    if (e.target.checked) {
                      newMembersPresent.push("member1");
                    } else {
                      newMembersPresent.splice(
                        newMembersPresent.indexOf("member1"),
                        1
                      );
                    }
                    setMembersPresent(newMembersPresent);
                  }}
                  name="member1"
                />
              }
              label="Member 1"
            />{" "}
            <FormControlLabel
              control={
                <Checkbox
                  checked={membersPresent.indexOf("member1") !== -1}
                  onChange={(e) => {
                    const newMembersPresent = [...membersPresent];
                    if (e.target.checked) {
                      newMembersPresent.push("member1");
                    } else {
                      newMembersPresent.splice(
                        newMembersPresent.indexOf("member1"),
                        1
                      );
                    }
                    setMembersPresent(newMembersPresent);
                  }}
                  name="member1"
                />
              }
              label="Member 1"
            />
            {/* Add more members as needed */}
          </FormControl>
          <TextField
            label="Events/Activities"
            value={eventsActivities}
            onChange={(e) => setEventsActivities(e.target.value)}
            margin="normal"
            required
            rows={4}
            multiline
            variant="standard"
          />
          <FormControl component="fieldset">
            <FormLabel component="legend">Location</FormLabel>
            <FormControlLabel
              control={
                <Radio
                  checked={online}
                  onChange={(e) => setOnline(true)}
                  value="online"
                  name="location"
                />
              }
              label="Online"
            />
            <FormControlLabel
              control={
                <Radio
                  checked={!online}
                  onChange={(e) => setOnline(false)}
                  value="offline"
                  name="location"
                />
              }
              label="Offline"
            />
          </FormControl>
          <TextField
            label="Prayer Requests"
            value={prayerRequests}
            onChange={(e) => setPrayerRequests(e.target.value)}
            margin="normal"
            rows={4}
            multiline
            required
            variant="standard"
          />
          <Button type="submit" variant="contained" color="primary">
            Submit Report
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default ReportSubmission;
