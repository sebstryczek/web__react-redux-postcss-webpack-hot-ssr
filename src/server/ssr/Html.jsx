import React from 'react';

class Html extends React.Component {
  render () {
    const { initialState, appMarkup , styleFiles, styleElement, scriptFiles } = this.props;

    return (
      <html>
        <head>
          <meta charSet="UTF-8" />
          <title>Server Side Rendered React App!!</title>
          {
            styleFiles.map((item, index) => <link rel="stylesheet" key={index} href={item}/>)
          }
          {
            styleElement
          }
        </head>
        <body>
          <div id="app" dangerouslySetInnerHTML={{ __html: appMarkup }}></div>
          {initialState && (
            <script dangerouslySetInnerHTML={{ __html: `window.APP_STATE=${JSON.stringify(initialState)}` }}></script>
          )}
          {
            scriptFiles.map((item, index) => <script key={index} src={item}></script>)
          }
        </body>
      </html>
    );
  }
}

export default Html;
