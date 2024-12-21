import React from "react";
import { MethodObject } from "@open-rpc/meta-schema";

interface Props {
  examples: MethodObject["examples"];
}

function Examples({ examples }: Props) {
  if (typeof examples === "undefined" || examples.length === 0) return null;

  return (
    <div>
      <h2>{examples.length > 1 ? "Examples" : "Example"}</h2>

      <h3>Request</h3>
      
      <h3>Response</h3>
    </div>
  );
}

export default Examples;
