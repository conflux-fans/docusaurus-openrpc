import React from "react";
import { MethodObject } from "@open-rpc/meta-schema";

interface Props {
  params: MethodObject["params"];
}

function Params({ params }: Props) {
  if (params.length === 0) return null;

  return (
    <div>
      <div style={{ display: "flex" }}>
        <h2>Params </h2>
      </div>
    </div>
  );
}

export default Params;
