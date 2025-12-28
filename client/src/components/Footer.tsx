import Link from "next/link";
import React from "react";

function Footer() {
  return (
    <div className="footer">
      <p>&copy; 2025 Vinayak LMS. All rights reserved.</p>

      <div className="footer__links">
        {["About", "Privacy Policy", "Licensing", "Contact"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            scroll={false}
            className="footer__link"
          >
            {item}
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Footer;
