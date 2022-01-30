import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from '../Editor/Editor';
import useLocalStorage from '../Hooks/useLocalStorage';

function App() {

  const [html, setHtml] = useLocalStorage('html', `<h1>Hello World!</h1>`);
  const [css, setCss] = useLocalStorage('css', '');
  const [js, setJs] = useLocalStorage(`js`, '');
  const [srcDoc, setSrcDoc] = useState('');

  useEffect(() =>{
    const timeout = setTimeout(() => {
      setSrcDoc ( `
        <html lang="en">
          <body>  ${html}   </body>
          <style>  ${css}   </style>
          <script>  ${js}   </script>
        </html>
        `)
    }, 250)

    return () => clearTimeout(timeout)

  }, [html,css,js] )

  return (
    <>
      <div className="pane top-pane">
        <Editor
          language="xml"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <Editor
          language="css"
          displayName="CSS"
          value={css}
          onChange={setCss}
        />
        <Editor
          language="javascript"
          displayName="JS"
          value={js}
          onChange={setJs}
        />
      </div>

      <div className="pane">
        <iframe
          srcDoc={srcDoc}
          title='output'
          sandbox='allow-scripts'
          frameborder="0"
          width="100%"
          height="100%"
        />
      </div>

    </>
  );
}

export default App;
