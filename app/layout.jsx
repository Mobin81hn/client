import Header from '@/components/header';
import './../styles/globals.css';
import Footer from '@/components/footer';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ContextProvider from '@/context/contextProvider';

export default function RootLayout({ children }) {
  return (
    <html lang="fa-IR">
      <body>
        <ContextProvider>
          <Header/>
          {children}
          <Footer/>
          <ToastContainer/>
        </ContextProvider>
      </body>
    </html>
  )
}
