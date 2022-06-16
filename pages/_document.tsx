import React from 'react';
import Document, {Html, Head, Main, NextScript} from 'next/document';
import createEmotionCache from '@/lib/createEmotionCache';
import createEmotionServer from '@emotion/server/create-instance';
import {ServerStyleSheets as MaterialServerStyleSheets} from '@mui/styles';
import {CacheProvider} from '@emotion/react';
import CleanCSS from 'clean-css';

const cleanCSS = new CleanCSS();

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

MyDocument.getInitialProps = async (ctx) => {
  const cache = createEmotionCache();
  const {extractCriticalToChunks} = createEmotionServer(cache);
  const sheets = new MaterialServerStyleSheets();

  const originalRenderPage = ctx.renderPage;

  ctx.renderPage = () =>
    originalRenderPage({
      // eslint-disable-next-line react/display-name
      enhanceApp: (App: any) => (props) => sheets.collect(<App {...props} />),
      enhanceComponent: (Component) => (props) =>
        (
          <CacheProvider value={cache}>
            <Component {...props} />
          </CacheProvider>
        ),
    });

  const initialProps = await Document.getInitialProps(ctx);

  const emotionsStyles = extractCriticalToChunks(initialProps.html);
  const emotionStyleTags = emotionsStyles.styles.map((style) => (
    <style
      data-eomtion={`${style.key} ${style.ids.join(' ')}`}
      key={style.key}
      dangerouslySetInnerHTML={{__html: style.css}}
    />
  ));

  let css = sheets.toString();
  if (css) {
    css = cleanCSS.minify(css).styles;
  }

  return {
    ...initialProps,
    styles: [
      ...React.Children.toArray(initialProps.styles),
      <style id="jss-server-side" key="jss-server-side">
        {css}
      </style>,
      ...emotionStyleTags,
    ],
  };
};
