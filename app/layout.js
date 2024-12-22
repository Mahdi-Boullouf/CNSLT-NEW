
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { ContextProvider } from '@/contexts/ContextProvider'
// import { ReservationProvider } from '@/contexts/ReservationContext'
import { ReservationProvider } from '@/contexts/ReservationContext'
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from '@/contexts/AuthContext'
import CnslLive from '@/components/CnslLive'
const inter = Inter({ subsets: ['latin'] })
export const metadata = {
  title: 'CNLST',
  description: 'TIKJDA SIRAIDI FOUKA',
}

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <ContextProvider >
          <ReservationProvider >
         <AuthProvider >
         {/* <CnslLive/> */}
         <Header />
        {children}
         <Footer />
         </AuthProvider>
         </ReservationProvider >
         <Toaster />

         </ContextProvider>
 
         </body>
    </html>
  )
}
