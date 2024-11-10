import { render } from "mustache";
export type GenerateMarkdownDocParameters = {
	title: string;
	description: string;
	sidebar_label: string;
	content: string;
};
export function generateMarkdownDoc(args: GenerateMarkdownDocParameters) {
	const template = `---
title: {{title}}
{{#description}}
description: {{description}}
{{/description}}
sidebar_label: {{sidebar_label}}
---

{{content}}

    `;

	return render(template, args);
}
