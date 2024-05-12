import React from "react";
import styled from "@emotion/styled";

const Container = styled.div`
  position: relative;
  height: 100%;
`;

export default class DragAndDrop extends React.Component {
  state = {
    data: [
      {
        name: "1 Column",
        category: "section",
        columns: [12]
      },
      {
        name: "2 Column",
        category: "section",
        columns: [6, 6]
      },
      {
        name: "3 Column",
        category: "section",
        columns: [4, 4, 4]
      },
      {
        name: "4 Column",
        category: "section",
        columns: [3, 3, 3, 3]
      },
      {
        name: "5 Column",
        category: "section",
        columns: [2, 2, 2, 2, 2]
      },
      {
        name: "side left",
        category: "section",
        columns: [4, 8]
      },
      {
        name: "side right",
        category: "section",
        columns: [8, 4]
      }
    ]
  };

  onDragOver = e => {
    e.preventDefault();
  };

  onDrop = (ev, cat) => {
    let id = ev.dataTransfer.getData("text");
    let data = this.state.data.filter(d => {
      if (d.name === id) {
        d.category = cat;
      }
      return d;
    });
    this.setState({
      ...this.state,
      data
    });
  };

  onDragStart = (ev, id) => {
    console.log("dragstart:", id);
    console.log(ev.dataTransfer);
    ev.dataTransfer.setData("text/plain", id);
  };

  render() {
    var data = {
      section: [],
      view: []
    };

    this.state.data.forEach(x => {
      data[x.category].push(
        <div
          key={x.name}
          onDragStart={e => this.onDragStart(e, x.name)}
          draggable
          className="draggable row"
          style={{ margin: 10, marginBottom: 20, cursor: "pointer" }}
        >
          {x.columns.map((c, i) => {
            return (
              <div
                className={c === 8 ? "col-md-" + c : "col"}
                style={{
                  textAlign: "center",
                  outline: "dashed 1px #444",
                  fontSize: 10,
                  padding: "5px 0"
                }}
              >
                content
              </div>
            );
          })}
        </div>
      );
    });

    return (
      <Container className="container">
        <div className="row">
          <div className="col-md-4">{data.section}</div>
          <div
            className="col-md-8 droppable"
            onDragOver={e => this.onDragOver(e)}
            onDrop={e => this.onDrop(e, "view")}
          >
            {data.view}
          </div>
        </div>
      </Container>
    );
  }
}
