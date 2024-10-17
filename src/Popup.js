import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  TextField,
  Typography,
  MenuItem,
  Box,
  FormControl,
  OutlinedInput,
} from "@mui/material";
import { Remove } from "@mui/icons-material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import "./Popup.css";

const Popup = ({ onClose }) => {
  const [segmentName, setSegmentName] = useState("");
  const [schemas, setSchemas] = useState([]);
  const [newSchema, setNewSchema] = useState({
    value: "",
    label: "",
    track: "",
  });

  // Initial schema options
  const initialSchemaOptions = [
    { label: "First Name", value: "first_name", track: "user" },
    { label: "Last Name", value: "last_name", track: "user" },
    { label: "Gender", value: "gender", track: "group" },
    { label: "Age", value: "age", track: "user" },
    { label: "Account Name", value: "account_name", track: "group" },
    { label: "City", value: "city", track: "group" },
  ];

  // Calculate available options for the dropdown
  const availableOptions = initialSchemaOptions.filter(
    (option) => !schemas.some((schema) => schema.value === option.value)
  );

  const handleAddSchema = () => {
    if (newSchema.value) {
      setSchemas([...schemas, newSchema]);
      setNewSchema({ value: "", label: "", track: "" }); // Reset the newSchema state
    }
  };

  const handleRemoveSchema = (index) => {
    const updatedSchemas = schemas.filter((_, i) => i !== index);
    setSchemas(updatedSchemas);
  };

  // Format the data to send to the server
  const handleSaveSegment = async () => {
    const formattedData = {
      segment_name: segmentName,
      schema: schemas.map((schema) => ({
        [schema.value]: schema.label,
      })),
    };

    console.log("Sending data to server:", formattedData);

    try {
      // Sending data using axios
      const response = await axios.post(
        "https://eow7rt2zouice33.m.pipedream.net",
        formattedData
      );
      if (response.status === 200) {
        alert("Save Segment is Successfully");
        onClose(); // Close the popup
      }
      console.log("Success:", response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="over-all-component">
      <div className="popup header-component">
        <Button
          onClick={onClose}
          sx={{
            textTransform: "none",
            alignItems: "center",
            textAlign: "unset",
          }}
        >
          <ArrowBackIosNewOutlinedIcon className="arrow-icon" />
          <h3 className="header-text">Saving Segment</h3>
        </Button>
      </div>

      <div className="popup body-components">
        <Typography variant="body1" textAlign={"unset"} marginBottom={"10px"}>
          Enter the name of the Segment
        </Typography>
        <FormControl sx={{ width: "100%" }} variant="outlined">
          <OutlinedInput
            fullWidth
            placeholder="Name of the segment"
            value={segmentName}
            onChange={(e) => setSegmentName(e.target.value)}
            sx={{
              height: "30px", // Adjust this value to set the desired height
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "gray", // Change the border color if needed
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "blue", // Change border color on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "blue", // Change border color when focused
              },
              "& .MuiOutlinedInput-input": {
                padding: "8px", // Adjust padding to control text area
              },
            }}
          />
        </FormControl>

        <Typography variant="body1" marginBottom={"10px"} marginTop={"10px"}>
          To save your segment, you need to add the schemas to build the query
        </Typography>

        {/* Display schema options */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            paddingLeft: "45%",
          }}
        >
          <Box
            sx={{
              backgroundColor: "green",
              width: 10,
              height: 10,
              borderRadius: "50%",
              marginRight: 1,
            }}
          ></Box>
          <Typography variant="caption">- User Tracks</Typography>
          <Box
            sx={{
              backgroundColor: "red",
              width: 10,
              height: 10,
              borderRadius: "50%",
              marginRight: 1,
              marginLeft: 2,
            }}
          ></Box>
          <Typography variant="caption">- Group Tracks</Typography>
        </Box>

        {/* Display the added schemas */}
        {schemas.map((schema, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", marginBottom: "5px" }}
          >
            <Box
              sx={{
                backgroundColor: schema.track === "user" ? "green" : "red",
                width: 10,
                height: 10,
                borderRadius: "50%",
                marginRight: 1,
              }}
            ></Box>
            <TextField
              select
              fullWidth
              value={schema.value} // Use the value for each schema
              variant="outlined"
              margin="dense"
              InputProps={{
                style: { height: "30px" },
              }}
            >
              <MenuItem value={schema.value}>{schema.label}</MenuItem>
            </TextField>
            <Button onClick={() => handleRemoveSchema(index)}>
              <Remove />
            </Button>
          </Box>
        ))}

        {/* New Dropdown for adding schemas */}
        <FormControl fullWidth variant="outlined" sx={{ marginBottom: 1 }}>
          <TextField
            select
            label="Add schema to segment"
            value={newSchema.value} // Correctly bind value to newSchema.value
            onChange={(e) => {
              const selectedOption = initialSchemaOptions.find(
                (option) => option.value === e.target.value
              );
              if (selectedOption) {
                setNewSchema(selectedOption); // Set the selected option directly
              } else {
                setNewSchema({ value: "", label: "", track: "" }); // Reset if no option is selected
              }
            }}
            variant="outlined"
            margin="dense"
            InputProps={{
              style: {
                height: "30px",
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              },
            }}
            sx={{
              "& .MuiInputLabel-root": {
                position: "absolute",
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
              },
              "& .MuiInputLabel-shrink": {
                transform: "translate(0, -1.2rem) scale(0.90)",
                left: "0",
                top: "0",
              },
            }}
          >
            {availableOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </FormControl>

        {/* Button to add the selected schema */}
        <Button
          variant="outlined"
          color="primary"
          onClick={handleAddSchema}
          className="add-schema-button"
        >
          + Add new schema
        </Button>
      </div>

      <div className="popup footer-component">
        <Button
          variant="contained"
          className="custom-save-segment-button"
          onClick={handleSaveSegment}
        >
          Save the Segment
        </Button>
        <Button
          variant="outlined"
          onClick={onClose}
          className="custom-cancel-button"
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default Popup;
