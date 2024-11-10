import type { LoadContext, Plugin } from "@docusaurus/types";
import { parseOpenRPCDocument } from "@open-rpc/schema-utils-js";
import { OptionsSchema } from "./src/options";
import type { OpenrpcDocument } from "@open-rpc/meta-schema";

type PluginOptions = {
	id?: string;
	openRPCPath?: string;
	outputPath?: string;
};

type LoadedContent = {
	openrpc: OpenrpcDocument;
};

async function pluginOpenRPCDocs(
	context: LoadContext,
	options: PluginOptions,
): Promise<Plugin<LoadedContent>> {
	return {
		name: "docusaurus-openrpc",

		async loadContent() {
			const rpcDocument = await parseOpenRPCDocument(options.openRPCPath);

			return { openrpc: rpcDocument };
		},

		async contentLoaded({ content, actions }) {
			// The contentLoaded hook is done after loadContent hook is done.
			// `actions` are set of functional API provided by Docusaurus (e.g. addRoute)
		},

		async postBuild(props) {
			// After docusaurus <build> finish.
		},

		// // TODO
		// async postStart(props) {
		// 	// docusaurus <start> finish
		// },

		// TODO
		// afterDevServer(app, server) {
		// 	// https://webpack.js.org/configuration/dev-server/#devserverbefore
		// },

		// TODO
		// beforeDevServer(app, server) {
		// 	// https://webpack.js.org/configuration/dev-server/#devserverafter
		// },

		// configureWebpack(config, isServer, utils, content) {
		// 	// Modify internal webpack config. If returned value is an Object, it
		// 	// will be merged into the final config using webpack-merge;
		// 	// If the returned value is a function, it will receive the config as the 1st argument and an isServer flag as the 2nd argument.
		// },

		// getPathsToWatch() {
		// 	// Paths to watch.
		// },

		// getThemePath() {
		// 	// Returns the path to the directory where the theme components can
		// 	// be found.
		// },

		// getClientModules() {
		// 	// Return an array of paths to the modules that are to be imported
		// 	// in the client bundle. These modules are imported globally before
		// 	// React even renders the initial UI.
		// },

		// extendCli(cli) {
		// 	// Register an extra command to enhance the CLI of Docusaurus
		// },

		// injectHtmlTags({ content }) {
		// 	// Inject head and/or body HTML tags.
		// },

		// async getTranslationFiles({ content }) {
		// 	// Return translation files
		// },

		// translateContent({ content, translationFiles }) {
		// 	// translate the plugin content here
		// },

		// translateThemeConfig({ themeConfig, translationFiles }) {
		// 	// translate the site themeConfig here
		// },

		// async getDefaultCodeTranslationMessages() {
		// 	// return default theme translations here
		// },
	};
}

export function validateOptions({ options, validate }: any) {
	const validatedOptions = validate(OptionsSchema, options);
	return validatedOptions;
}

export default pluginOpenRPCDocs;
