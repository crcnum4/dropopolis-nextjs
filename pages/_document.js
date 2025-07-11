import Document, { Html, Head, Main, NextScript } from 'next/document';
import {config, dom} from '@fortawesome/fontawesome-svg-core'
config.autoAddCss = false;

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"/>
          <style>{dom.css()}</style>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument;