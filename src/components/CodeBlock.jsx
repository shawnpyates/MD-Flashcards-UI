/* eslint react/prop-types: 0 */
import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { coy } from 'react-syntax-highlighter/dist/esm/styles/prism';

function CodeBlock({ value, language }) {
  return (
    <SyntaxHighlighter language={language} style={coy}>
      {value}
    </SyntaxHighlighter>
  );
}

export default CodeBlock;
