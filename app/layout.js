/*
 * Copyright © 2025 Ndulue Christian
 * All rights reserved.
*/

import { Geist, Geist_Mono,Pixelify_Sans} from "next/font/google";
import "./globals.css";
import { GameProvider } from "@/components/contexts/Gamecontext";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const pixelSans=Pixelify_Sans({
  subsets:["latin"],
  display:"swap", 
  weight:["400" , "500" , "600" , "700" , "400" , "500" , "600" , "700"]
})   

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en"> 
      <body
        className={`${pixelSans.className} bg-whiteGray overflow-x-hidden antialiased h-screen bg-game-gradient`}
      >
        <GameProvider>
          {children} 
        </GameProvider> 
      </body>
    </html>
  );
}


