import {
  ContentDescriptorObject,
  JSONSchema,
  MethodObject,
  MethodObjectParams,
  Servers,
} from "@open-rpc/meta-schema";
import React from "react";
import Params from "../Params";
import Examples from "../Examples";
import "./index.css";
import { Result } from "../Result";
import Playground from "../Playground";
import Form from "@rjsf/bootstrap-4";
import validator from "@rjsf/validator-ajv8";
import { RJSFSchema, UiSchema } from "@rjsf/utils";
import "bootstrap/dist/css/bootstrap.min.css";
interface Props {
  method: MethodObject;
  servers: { name: string; url: string }[];
}

const convertOpenApiSchemaToJsonSchema = (schema: any): any => {
  if (!schema) return schema;

  let convertedSchema = { ...schema };

  if (convertedSchema.nullable === true) {
    if (convertedSchema.type) {
      convertedSchema.type = Array.isArray(convertedSchema.type)
        ? [...convertedSchema.type, "null"]
        : [convertedSchema.type, "null"];
    }

    delete convertedSchema.nullable;
  }

  if (convertedSchema.properties) {
    const newProperties: Record<string, any> = {};
    Object.keys(convertedSchema.properties).forEach((key) => {
      newProperties[key] = convertOpenApiSchemaToJsonSchema(
        convertedSchema.properties[key]
      );
    });
    convertedSchema.properties = newProperties;
  }

  if (convertedSchema.items) {
    convertedSchema.items = convertOpenApiSchemaToJsonSchema(
      convertedSchema.items
    );
  }

  return convertedSchema;
};

const createJsonSchema = (params: MethodObjectParams): RJSFSchema => {
  const properties: Record<string, JSONSchema> = {};
  const required: string[] = [];

  params.forEach((element) => {
    if ("$ref" in element) {
      return;
    }

    // 转换 schema
    properties[element.name] = convertOpenApiSchemaToJsonSchema(element.schema);
    if (element.required) {
      required.push(element.name);
    }
  });

  return {
    type: "object" as const,
    properties: properties,
    required: required,
  };
};

const uiSchema: UiSchema = {
  "ui:description": "",
  "ui:submitButtonOptions": {
    norender: true,
  },
  

  
};

const Content = ({ method, servers }: Props) => {
  return (
    <div>
      {method.params && (
        <Form
          liveValidate
          uiSchema={uiSchema}
          schema={createJsonSchema(method.params)}
          validator={validator}
          onChange={console.log}
          showErrorList={false}
        />
      )}
      <p>{method.summary}</p>
      <Playground method={method} servers={servers} />
      <Params params={method.params} />
      <Result result={method.result} />
      <Examples examples={method.examples} method={method} />
    </div>
  );
};

export default Content;
