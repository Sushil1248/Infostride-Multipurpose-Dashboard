import React from "react";
import styled from "@emotion/styled";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import {default as DndSection} from './Components/SmoothDnd/Editor';

import Input from "./component/Input";

const EditorForm = styled.div(
  {
    position: "relative",
    width: "336px",
    height: "100%",
    flexDirection: "column",
    flex: "0 0 336px",
    background: "#38393a",
    paddingTop: "12px",
    boxSizing: "border-box",
    transition: "all .3s",
    transform: "translateX(-100 %)"
  },
  props => {
    return (
      props.active && {
        transform: "translateX(0)",
        transition: "none"
      }
    );
  }
);

const EditorSub = styled.div(
  {
    display: "flex",
    flexDirection: "column",
    // position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    bottom: 0,
    transition: "all .5s cubic-bezier(.2, 1, .3, 1)",
    transform: "translate(-100%)",
    boxShadow: "0 0 20px rgba(51,74,96,.16)",
    zIndex: 5,
  },
  props => {
    return (
      props.active && {
        transform: "translate(0)"
      }
    );
  }
);

const EditorSubHeader = styled.div({
  position: "relative",
  background: "#38393a",
  height: "56px",
  lineHeight: "56px",
  padding: "0 54px",
  cursor: "pointer",
  outline: "none",
  borderBottom: "1px solid #303131"
});

const EditorSubHeaderBackButton = styled.div({
  display: "block",
  position: "absolute",
  top: "50%",
  left: "24px",
  transform: "translateY(-50%)",
  transition: "all .15s ease"
});

const BackButtonSVG = styled.svg({
  display: "block",
  width: "12px",
  height: "12px",
  fill: "#fff"
});

const EditorSubHeaderTitle = styled.div({
  color: "#fff",
  fontSize: "18px",
  fontWeight: "400",
  whiteSpace: "nowrap",
  overflow: "hidden",
  textOverflow: "ellipsis"
});

const EditorSubContent = styled.div({
  flexGrow: 1,
  position: "relative",
  background: "#38393a",
  padding: "24px",
  overflow: "auto",
  overflowX: "hidden",
  overflowY: "auto"
});

export default class Sidebar extends React.Component {
  constructor() {
    super();
    this.state = {
      tabIndex: 0
    }
  }

  render() {
    return (
      <EditorForm>
        <Tabs 
          className="tabs" 
          selectedTabClassName="selected" 
          selectedTabPanelClassName="selected"
          selectedIndex={this.state.tabIndex} 
          onSelect={tabIndex => this.setState({ tabIndex })}
          >
          <TabList className="tab-title">
            <Tab className="">Section</Tab>
            <Tab className="">Content</Tab>
            <Tab className="">Forms</Tab>
            <Tab className="">Setting</Tab>
          </TabList>
      
          <TabPanel className="tab-content">
            <h4>Drag & Drop Section</h4>
            <DndSection style={{padding: "10px 24px"}} />
          </TabPanel>
          <TabPanel className="tab-content">
            <h4>Drag & Drop Content</h4>
            <div style={{padding: "10px 24px"}}>
              All Content list :
              <ul>
                <li>TEXT</li>
                <li>HTML</li>
                <li>IMAGE</li>
                <li>VIDEO</li>
                <li>DIVIDER</li>
                <li>BUTTON</li>
              </ul>
            </div>
          </TabPanel>
          <TabPanel className="tab-content-no-padding">
            <EditorSub active>
              <EditorSubHeader>
                <EditorSubHeaderBackButton>
                  <BackButtonSVG xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 12">
                    {" "}
                    <path
                      d="M11.3,5.2H2.5l4-4c0.3-0.3,0.3-0.8,0-1.1c-0.3-0.3-0.8-0.3-1.1,0L0.2,5.4C0.1,5.6,0,5.8,0,6
                    c0,0.2,0.1,0.4,0.2,0.5l5.2,5.2c0.3,0.3,0.8,0.3,1.1,0c0.3-0.3,0.3-0.8,0-1.1l-4-4h8.7C11.7,6.7,12,6.4,12,6
                    C12,5.6,11.7,5.2,11.3,5.2z" />{" "}
                  </BackButtonSVG>
                </EditorSubHeaderBackButton>
                <EditorSubHeaderTitle>Header</EditorSubHeaderTitle>
              </EditorSubHeader>
              <EditorSubContent>
                <Input label="Header Title">Goes Here</Input>
                <Input label="Header Text">Goes Here</Input>
              </EditorSubContent>
            </EditorSub>
          </TabPanel>
          <TabPanel className="tab-content">
            <h4>Setting</h4>
            <div style={{padding: "10px 24px"}}>
              Content
            </div>
          </TabPanel>
        </Tabs>
      </EditorForm>
    );
  }
}
