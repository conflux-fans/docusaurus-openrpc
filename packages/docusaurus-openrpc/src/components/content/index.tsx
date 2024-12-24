import { MethodObject } from "@open-rpc/meta-schema";
import React from "react";
import Params from "../params";
import Examples from "../examples";
import './index.css'
interface Props {
  method: MethodObject;
}

const Content = ({ method }: Props) => {
  return (
    <div>
      <p>{method.summary}</p>
      <Params params={method.params} />
      <Examples examples={method.examples} method={method} />
    </div>
  );
};

export default Content;
