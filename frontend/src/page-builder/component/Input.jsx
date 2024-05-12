import React, { Component } from "react";
import styled from "@emotion/styled";
import Label from "./Label";

const TextBox = styled.input({
  boxSizing: "border-box",
  color: "#fff",
  fontSize: "13px",
  fontWeight: "400",
  background: "#303131",
  borderRadius: "2px",
  border: "none",
  width: "100%",
  height: "32px",
  outline: "none",
  lineHeight: "20px",
  padding: "6px 16px",
  margin: 0,
  transition: "all .1s ease"
});

class Input extends Component {
  render() {
    return (
      <div css={{ margin: "0 0 24px" }}>
        <label>
          <Label>{this.props.label}</Label>
          <TextBox placeholder={this.props.placeholder} />
        </label>
      </div>
    );
  }
}

export default Input;
