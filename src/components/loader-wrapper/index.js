import React from "react";
import "./style.css";

function LoaderWrapper({ children, isLoading, loader }) {
  return (
    <>
      {isLoading ? (
        <>
          <div className="Loader-wrapper">{children}</div>
          {loader}
        </>
      ) : (
        <>{children}</>
      )}
    </>
  );
}

export default LoaderWrapper;
