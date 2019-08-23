import React from "react";
import loading from "./loading.gif";

const Spinner = () => {
  return (
    <div>
      <img
        src={loading}
        alt="Loading..."
        style={{ width: "100px", margin: "auto", display: "block" }}
      />
    </div>
  );
};

export default Spinner;
