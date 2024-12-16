import { MethodObject } from "@open-rpc/meta-schema";
import { render } from "mustache";
export type GenerateMarkdownDocParameters = {
  title: string;
  description: string;
  sidebar_label: string;
  method: string;
};
export function generateMarkdownDoc(args: GenerateMarkdownDocParameters) {
  const template = `---
title: {{title}}
{{#description}}
description: {{description}}
{{/description}}
sidebar_label: {{sidebar_label}}
---
import Content from '@theme/content'

<Content method={ {{{method}}} }/>

    `;

  return render(template, args);
}
