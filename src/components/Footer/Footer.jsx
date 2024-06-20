import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="relative flex flex-col justify-center items-center py-1 w-full">
      <div>© 2024 Genuine Echo. All rights reserved.</div>
      <div>
        Made with ❤️ by{" "}
        <Link href="https://github.com/jain12feb" target="_blank">
          Prince Jain
        </Link>
        .
      </div>
    </footer>
  );
};

export default Footer;
