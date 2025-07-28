// components/JsonViewer.jsx
"use client";
import React from 'react';
import JsonView from '@uiw/react-json-view';
import { darkTheme } from '@uiw/react-json-view/dark';
import { lightTheme } from '@uiw/react-json-view/light';
import { nordTheme } from '@uiw/react-json-view/nord';
import { githubLightTheme } from '@uiw/react-json-view/githubLight';
import { githubDarkTheme } from '@uiw/react-json-view/githubDark';
import { vscodeTheme } from '@uiw/react-json-view/vscode';
import { gruvboxTheme } from '@uiw/react-json-view/gruvbox';
import { monokaiTheme } from '@uiw/react-json-view/monokai';
import { basicTheme } from '@uiw/react-json-view/basic';

const JsonViewer = ({ data }) => {
    return (
        <div style={{ padding: '0.5rem', borderRadius: '4px', backgroundColor: '#4d4d4dff', fontFamily: 'monospace' }}>


            <JsonView value={data}
                collapsed={2}
                shortenTextAfterLength={50}
                displayDataTypes={false}
                style={vscodeTheme}
            />

            {/* <JsonView value={data} collapsed={2} style={nordTheme} /> */}
            {/* <JsonView value={data} collapsed={2} style={githubLightTheme} /> */}
            {/* <JsonView value={data} collapsed={2} style={githubDarkTheme} /> */}
            {/* <JsonView value={data} collapsed={2} style={gruvboxTheme} /> */}

            {/* <JsonView value={data} collapsed={2} style={monokaiTheme} /> */}
            {/* <JsonView value={data} collapsed={2} style={basicTheme} /> */}
        </div>
    );
};

export default JsonViewer;