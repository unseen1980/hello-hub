import React from "react";

interface FioriAppFrameProps {
  appPath: string;
  title?: string;
}

export function FioriAppFrame({ appPath, title = "Fiori Application" }: FioriAppFrameProps) {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <iframe
        src={appPath}
        title={title}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          border: "none",
        }}
        allow="clipboard-write"
      />
    </div>
  );
}
