"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Content = void 0;
exports.validateOptions = validateOptions;
const schema_utils_js_1 = require("@open-rpc/schema-utils-js");
const options_1 = require("./src/options");
const fs_1 = require("fs");
const openRPC_1 = require("./src/openRPC");
const content_1 = __importDefault(require("./src/components/content"));
exports.Content = content_1.default;
const path_1 = __importDefault(require("path"));
async function pluginOpenRPCDocs(context, options) {
    return {
        name: "docusaurus-openrpc",
        async loadContent() {
            const rpcDocument = await (0, schema_utils_js_1.parseOpenRPCDocument)(options.openRPCPath);
            return {
                openrpc: rpcDocument,
            };
        },
        async contentLoaded({ content, actions }) {
            const { openrpc } = content;
            const outputPath = `${options.outputPath}`;
            // check the outputPath dir exists
            if (!(0, fs_1.existsSync)(outputPath)) {
                try {
                    (0, fs_1.mkdirSync)(outputPath);
                }
                catch (err) {
                    throw new Error(`Failed to create dir ${outputPath}`);
                }
            }
            for (const method of openrpc.methods) {
                if (!("$ref" in method)) {
                    const content = (0, openRPC_1.generateMarkdownDoc)({
                        sidebar_label: method.name,
                        method: method,
                    });
                    const fileName = `${method.name}.mdx`;
                    const filePath = `${outputPath}/${fileName}`;
                    try {
                        (0, fs_1.writeFileSync)(filePath, content);
                    }
                    catch (err) {
                        throw new Error(`Failed to write ${filePath}`);
                    }
                }
            }
            // _category_
            try {
                (0, fs_1.writeFileSync)(`${outputPath}/_category_.json`, JSON.stringify({ ...options.category }, null, 2));
            }
            catch (err) {
                throw new Error(`Failed to write ${outputPath}/sidebar.js`);
            }
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
        getThemePath() {
            // Returns the path to the directory where the theme components can
            // be found.
            return path_1.default.join(__dirname, "./src/components");
        },
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
function validateOptions({ options, validate }) {
    const validatedOptions = validate(options_1.OptionsSchema, options);
    return validatedOptions;
}
exports.default = pluginOpenRPCDocs;
