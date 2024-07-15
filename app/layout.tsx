import type { Metadata } from "next";
import { Inter } from "next/font/google";
import './globals.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Disagro - Evento",
  description: "Creemos en la verdad como un principio absoluto",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      
      <body className={inter.className}>
        <ToastContainer />
        {children}
      </body>
    </html>
  );
}
