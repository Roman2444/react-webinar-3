import React from "react";
import "./style.css";
 

function Loader({children, ...props}) {
  return (
      <div {...props} className='Loader'>
          {children}
      </div>
  );
};

export default Loader;
