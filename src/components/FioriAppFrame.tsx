import React from "react";

interface FioriAppFrameProps {
  appPath: string;
  title?: string;
}

export function FioriAppFrame({ appPath, title = "Fiori Application" }: FioriAppFrameProps) {
  return (
    <iframe
      src={appPath}
      title={title}
      style={{
        width: "100%",
        height: "100%",
        border: "none",
        display: "block",
      }}
      allow="clipboard-write"
    />
  );
}
