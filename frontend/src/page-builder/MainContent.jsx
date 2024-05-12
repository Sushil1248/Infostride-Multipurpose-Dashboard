import React from "react";
import styled from "@emotion/styled";
import Tasks from "./Components/Tasks/Task";
import DragAndDrop from "./Components/DragAndDrop/DragAndDrop";
import MySmoothDnd from "./Components/SmoothDnd/index";

const EditorPreview = styled.div({
  boxSizing: "border-box",
  position: "relative",
  margin: "0 auto",
  width: "100%",
  maxWidth: "100%",
  height: "100%",
  transition: ".2s",
  overflowY: "scroll"
});

export default class MainContent extends React.Component {
  render() {
    return (
      <EditorPreview>
        <MySmoothDnd />
      </EditorPreview>
    );
  }
}
