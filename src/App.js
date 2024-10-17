import React, { useState } from "react";
import { Drawer, Button, Box } from "@mui/material";
import Popup from "./Popup";
import "./App.css";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const App = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (openState) => () => {
    setOpen(openState);
  };

  return (
    <div className="page-component">
      <div className="title-component">
        <span className="title-content">
          <ArrowBackIosNewOutlinedIcon className="arrow-icon" />
          <h3 className="title-text">View Audience</h3>
        </span>
      </div>
      <div className="body-component">
        <Button
          variant={open ? "outlined" : "contained"}
          onClick={toggleDrawer(true)}
          sx={{ marginTop: "50px", marginLeft: "130px", textTransform: "none" }}
          className={open ? "outlined-class" : "contained"}
        >
          Save Segment
        </Button>

        <Drawer
          anchor="right"
          open={open}
          onClose={toggleDrawer(false)}
          sx={{ width: "400px" }}
        >
          <Box
            sx={{ width: 450, padding: "20px" }}
            role="presentation"
            textAlign="center"
          >
            <Popup onClose={toggleDrawer(false)} />
          </Box>
        </Drawer>
      </div>
    </div>
  );
};

export default App;
