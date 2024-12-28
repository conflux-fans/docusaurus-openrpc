import React, { useState } from "react";
import Codes from "./codes";
import Tabs from "@theme-original/Tabs";
import TabItem from "@theme-original/TabItem";
import CodeBlock from "@theme-original/CodeBlock";
import { MethodObject } from "@open-rpc/meta-schema";

interface Props {
  servers: { name: string; url: string }[];
  method: MethodObject;
}

const Playground = ({ servers, method }: Props) => {
  const [url, setUrl] = useState(
    servers.filter((serve) => serve.url.startsWith("http"))[0]?.url || ""
  );

  return (
    <div>
     


      <Tabs>
        {Codes.map((code, index) => {
          return (
            <TabItem key={index} value={code.name} label={code.name}>
              <div>
                <CodeBlock language={code.language} showLineNumbers>
                  {code.getCode(url, method.name)}{" "}
                </CodeBlock>
              </div>
            </TabItem>
          );
        })}
      </Tabs>
    </div>
  );
};

export default Playground;
