import React from "react";
function Preload(props) {
  return <div id={props.load ? "preloader" : "preloader-none"}></div>;
}

export default Preload;
