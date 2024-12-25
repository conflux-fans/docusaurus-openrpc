import { MethodObject, Servers } from "@open-rpc/meta-schema";
import React from "react";
import Params from "../Params";
import Examples from "../Examples";
import "./index.css";
import { Result } from "../Result";
import Playground from "../Playground";

interface Props {
  method: MethodObject;
  servers: { name: string; url: string }[];
}

const Content = ({ method, servers }: Props) => {
  return (
    <div>
      <p>{method.summary}</p>
      <Playground method={method.name} servers={servers} />
      <Params params={method.params} />
      <Result result={method.result} />
      <Examples examples={method.examples} method={method} />
    </div>
  );
};

export default Content;
