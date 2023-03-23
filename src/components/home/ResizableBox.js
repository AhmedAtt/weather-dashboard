import React from "react";
import { ResizableBox as ReactResizableBox } from "react-resizable";

import "react-resizable/css/styles.css";

export default function ResizableBox({
                                         children,
                                         width = 500,
                                         height = 300,
                                         resizable = true,
                                         style = {},
                                         className = "",
                                     }) {
    return (
        <div style={{ marginLeft: 20 }}>
            <div
                style={{
                    display: "inline-block",
                    width: "auto",
                    background: "white",
                    padding: ".5rem",
                    borderRadius: "0.5rem",
                    boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
                    ...style,
                }}
            >
                {resizable ? (
                    <ReactResizableBox width={width} height={height}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            className={className}
                        >
                            {children}
                        </div>
                    </ReactResizableBox>
                ) : (
                    <div
                        style={{
                            width: `${width}px`,
                            height: `${height}px`,
                        }}
                        className={className}
                    >
                        {children}
                    </div>
                )}
            </div>
        </div>
    );
}