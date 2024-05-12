import React from "react";
import styled from '@emotion/styled';
import Container from "./Dnd/Container";
import Draggable from "./Dnd/Draggable";
import { applyDrag, generateItems } from "./Dnd/utils";

const Section_View = styled.div`
  text-align: center;
  cursor: grab;
  border: dashed 1px #444;
  font-size: 10px;
  padding: 5px 0;
  min-height: 50px;
`;

export default class View extends React.Component {
  state = {
    views:[
      {
        columns: [12]
      },
      {
        columns: [6, 6]
      },
    ],
  };

  render() {

    return (
      <Container
        groupName="1"
        getChildPayload={i => this.state.views[i]}
        onDrop={e =>
          this.setState({ views: applyDrag(this.state.views, e) })
        }
      >
        {this.state.views.map((p, i) => {
          return (
            <Draggable key={i}>
              <div className="row" style={{marginBottom: 10}}>
                {p.columns.map((c, j) => {
                  return (
                    <Section_View
                      key={i + "" + j}
                      className={c === 8 ? "col-md-" + c : "col"}
                      data-key={i + "" + j}
                    >
                      content
                  </Section_View>
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