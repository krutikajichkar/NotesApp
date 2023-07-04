import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function Loader() {
  return (
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)"}}>
      <Box lg={{ display: "flex" }}>
        <CircularProgress size={100} thickness={2}/>
      </Box>
    </div>
  );
}