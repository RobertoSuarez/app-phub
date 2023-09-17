import React from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from 'react-router-dom';

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react';

import Init from './pages/init';
import App from './App';
import theme from './theme';
import { Grafico } from './pages/Grafico';
import { History } from './pages/History';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>error</div>,
    children: [
      {
        path: '',
        element: <Navigate to="/init" replace />,
      },
      {
        path: 'init',
        element: <Init />,
      },
      {
        path: 'graph/:id',
        element: <Grafico />,
      },
      {
        path: 'history',
        element: <History />,
      },
    ],
  },
]);

const container = document.getElementById('root');
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
