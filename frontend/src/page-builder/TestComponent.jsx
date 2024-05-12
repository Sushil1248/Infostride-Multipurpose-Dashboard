import React from "react";
import styled from "@emotion/styled";
import Container from "./Dnd/Container";
import Draggable from "./Dnd/Draggable";
import { applyDrag, generateItems } from "./Dnd/utils";

const Section_Editor = styled.div`
  text-align: center;
  cursor: grab;
  border: solid 1px #555;
  margin-bottom: 10px;
  font-size: 10px;
  padding: 5px 0;
  background-color: #303131;
`;

export default class Editor extends React.Component {
  state = {
    section: [
      {
        name: "1 Column",
        columns: [12],
      },
      {
        name: "2 Column",
        columns: [6, 6],
      },
      {
        name: "3 Column",
        columns: [4, 4, 4],
      },
      {
        name: "4 Column",
        columns: [3, 3, 3, 3],
      },
      {
        name: "5 Column",
        columns: [2, 2, 2, 2, 2],
      },
      {
        name: "8 Column",
        columns: [2, 2, 2, 2, 2, 2, 2, 2],
      },
      {
        name: "side left",
        columns: [4, 8],
      },
      {
        name: "side right",
        columns: [8, 4],
      },
    ],
  };

  render() {
    return (
      <Container
        groupName="1"
        behaviour="copy"
        getChildPayload={(i) => this.state.section[i]}
        onDrop={(e) =>
          this.setState({ section: applyDrag(this.state.section, e) })
        }
        style={this.props.style}
      >
        {this.state.section.map((p, i) => {
          return (
            <Draggable key={i} className="draggable">
              <div className="row">
                {p.columns.map((c, j) => {
                  return (
                    <Section_Editor
                      key={i + "" + j}
                      className={c === 8 ? "col-md-" + c : "col"}
                      data-key={i + "" + j}
                    >
                      content
                    </Section_Editor>
                  );
                })}
              </div>
            </Draggable>
          );
        })}
      </Container>
    );
  }
}
