const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const nodeResolve = require("rollup-plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");
const pkg = require("./package.json");

function isBareModuleId(id) {
	return !id.startsWith(".") && !id.includes(pkg.name + "/");
}
const extensions = [".ts", ".tsx"];

const cjs = [
	{
		input: "src/index.ts",
		output: { file: `dist/cjs/index.js`, format: "cjs", compact: true, },
		external: isBareModuleId,
		plugins: [
			nodeResolve({ extensions }),
			babel({ exclude: /node_modules/, extensions }),
			commonjs({ extensions }),
		]
	},
	{
		input: "src/index.ts",
		output: { file: `dist/cjs/index.min.js`, format: "cjs", compact: true, },
		external: isBareModuleId,
		plugins: [
			nodeResolve({ extensions }),
			babel({ exclude: /node_modules/, extensions }),
			uglify(),
		]
	}
];

const esm = [
	{
		input: "src/index.ts",
		output: { file: `dist/esm/index.js`, format: "esm" },
		external: isBareModuleId,
		plugins: [
			nodeResolve({ extensions }),
			babel({
				exclude: /node_modules/,
				extensions,
			}),
		]
	}
];

module.exports = cjs.concat(esm);