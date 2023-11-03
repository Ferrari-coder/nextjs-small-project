import React from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "./logo.png";

const Navbar = () => {
  return (
    <nav>
      <Image
        src={Logo}
        alt="mylogo"
        width={70}
        quality={100}
        placeholder="empty" 
        // no blur needed
      />
      <h1>Learning Next</h1>
      <Link href="/">Dashboard</Link>
      <Link href="/tickets">Tickets</Link>
    </nav>
  );
};

export default Navbar;
