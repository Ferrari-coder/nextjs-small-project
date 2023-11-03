import "./globals.css";
import { Rubik } from "next/font/google"; //how to apply custom fonts in next

//components 
import Navbar from "./components/Navbar";

const rubik = Rubik({ subsets: ["latin"] }); //save it in a variable

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      {/* //do the font variable name .classname */}
      <body className={rubik.className}> 
        <Navbar />
        {children}
      </body>   
    </html>
  );
}
