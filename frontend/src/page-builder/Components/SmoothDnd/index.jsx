import React from "react";
import View from './View';

const groupStyle = {
  marginLeft: "50px",
  flex: 1
};


export default function MySmoothDnd() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "stretch",
          marginTop: "50px",
          marginRight: "50px"
        }}
      >
        <div style={groupStyle}>
          <View />
        </div>
      </div>
    );
}