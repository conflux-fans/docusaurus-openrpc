import { MethodObject } from "@open-rpc/meta-schema";
import React from "react";
import Params from "../Params";
import Examples from "../Examples";
import "./index.css";
import { Result } from "../Result";
interface Props {
  method: MethodObject;
}

const Content = ({ method }: Props) => {
  console.log(method)
  return (
    <div>
      <p>{method.summary}</p>
      <Params params={method.params} />
      <Result result={method.result} />
      <Examples examples={method.examples} method={method} />
    </div>
  );
};

export default Content;
