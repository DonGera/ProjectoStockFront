import React from "react";
import { FaFacebook, FaTwitter} from "react-icons/fa";

export const Footerx = () => {
  return (
    <div className="footer">
      <h1
        style={{
          color: "black",
          textAlign: "center",
          marginTop: "10px",
        }}
      >
        DP STOCK
      </h1>
      <div>
        <a href="*" className="icon" padding="3px">
          Twitter <FaTwitter />
        </a>

        <a href="*" className="icon">
          Facebook <FaFacebook />
        </a>

        <h5
          style={{
            color: "black",
            textAlign: "left",
            marginTop: "3px",
          }}
        >
          © 2024 DP, Inc.
        </h5>
      </div>
    </div>
  );
};
