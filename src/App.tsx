import { RouterProvider } from 'react-router-dom';
import { router } from "./routes";
import { Toaster } from 'sonner'
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { ThemeProvider } from './components/theme/theme-provider';


export function App() {
  return (
    <HelmetProvider>
      <Helmet titleTemplate="%s | pizza.shop" />
      <Toaster richColors />
      <ThemeProvider storageKey="pizza-shop-thme" defaultTheme="dark">

        <RouterProvider router={router} />

      </ ThemeProvider>
    </HelmetProvider >
  );
}
