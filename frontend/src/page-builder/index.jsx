import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import PropTypes from 'prop-types';

import Canvas from './component/Canvas';
import TextBox from './component/TextBox';
import ImageBox from './component/ImageBox';
import Button from './component/Button';
import Editor from './TestComponent';
import styled from "@emotion/styled";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./MainContent";

const Container = styled.div({
    height: "100%",
    font: "normal normal 1rem/1.4 Roboto, Helvetica, Arial, sans-serif",
    margin: 0
});


const PageBuilder = () => {
    const Editor = styled.div({
        position: "relative",
        display: "flex",
        flexDirection: "row",
        height: "100%",
        minHeight: "600px",
        color: "#fff",
        fontFamily: "Roboto, Arial, sans-serif",
        webkitFontSmoothing: "antialiased",
        overflow: "hidden",
        lineHeight: "1.555",
        background: "#212121",
        paddingTop: 0,
        transition: "all .3s ease"
    });
    return (
        <DndProvider backend={HTML5Backend}>
            <div>
                <h2>Page Builder</h2>
                <Container>
                    <Editor>
                        <Sidebar />
                        <MainContent />
                    </Editor>
                </Container>
            </div>
        </DndProvider>
    );
};

PageBuilder.propTypes = {
    // Add any additional props if needed
};

export default PageBuilder;
