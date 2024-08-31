import globals from "globals";
import pluginJs from "@eslint/js";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
	{
		ignores: ["**/lightbox-plus-jquery"],
		languageOptions: { globals: globals.browser },
	},
	pluginJs.configs.recommended,
	eslintConfigPrettier,
];
