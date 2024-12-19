import { MethodObject } from "@open-rpc/meta-schema";
import { render } from "mustache";
export type GenerateMarkdownDocParameters = {
  sidebar_label: string;
  method: MethodObject;
};
export function generateMarkdownDoc({
  method,
  sidebar_label,
}: GenerateMarkdownDocParameters) {
  const { name, summary, description } = method;
  const template = `---
title: {{name}}
{{#description}}
description: {{description}}
{{/description}}
sidebar_label: {{sidebar_label}}
---
import Content from '@theme/content'

<Content method={ {{{method}}} }/>

    `;

  return render(template, {
    method: JSON.stringify(method),
    name,
    summary,
    description,
    sidebar_label,
  });
}
