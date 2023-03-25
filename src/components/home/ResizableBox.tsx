import React from "react";
import {ResizableBox as ReactResizableBox} from "react-resizable";

import "react-resizable/css/styles.css";

type ResizableBoxProps = {
    children: React.ReactNode;
}

export default function ResizableBox({children}: ResizableBoxProps) {

    const width = 500;
    const height = 300;
    const resizable = true;
    const className = "";

    return (
        <div style={{marginLeft: 20}}>
            <div
                style={{
                    display: "inline-block",
                    width: "auto",
                    background: "white",
                    padding: ".5rem",
                    borderRadius: "0.5rem",

                }}
            >
                {resizable ? (
                    <ReactResizableBox width={width} height={height}>
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            className=""
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