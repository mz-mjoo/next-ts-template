import '../styles/globals.css';
import App, {AppContext, AppProps} from 'next/app';
import {
  CssBaseline,
  StyledEngineProvider,
  ThemeProvider as MuiThemeProvider,
} from '@mui/material';
import {useEffect} from 'react';
import createEmotionCache from '@/lib/createEmotionCache';
import {CacheProvider, EmotionCache} from '@emotion/react';
import muiTheme from '@/lib/theme/muiTheme';
import Head from 'next/head';
import {ThemeProvider as EmotionThemeProvider} from '@emotion/react';
import emotionTheme from '@/lib/theme/emotionTheme';
import axios from 'axios';
import {QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';
import queryClient from '@/lib/react-query/client';
import {RecoilRoot} from 'recoil';

const clientSideEmotionCache = createEmotionCache();

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

axios.interceptors.request.use(
  (req) => {
    return req;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    return Promise.reject(error);
  },
);

const MyApp = (props: MyAppProps) => {
  const {Component, pageProps, emotionCache = clientSideEmotionCache} = props;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement!.removeChild(jssStyles);
    }
  }, []);

  return (
    <CacheProvider value={emotionCache}>
      <StyledEngineProvider injectFirst>
        <Head>
          <title>연습용</title>
        </Head>

        <RecoilRoot>
          <QueryClientProvider client={queryClient}>
            <EmotionThemeProvider theme={emotionTheme}>
              <MuiThemeProvider theme={muiTheme}>
                <CssBaseline />
                <Component {...pageProps} />
              </MuiThemeProvider>
            </EmotionThemeProvider>
            <ReactQueryDevtools />
          </QueryClientProvider>
        </RecoilRoot>
      </StyledEngineProvider>
    </CacheProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);
  return {
    ...appProps,
  };
};
