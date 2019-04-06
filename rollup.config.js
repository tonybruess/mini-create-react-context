const nodeResolve = require("rollup-plugin-node-resolve");
const { uglify } = require("rollup-plugin-uglify");
const ts = require("@wessberg/rollup-plugin-ts");

const externalModules = ["react", "gud", "tiny-warning", "prop-types"];
const extensions = [".ts", ".tsx"];

const cjs = [
	{
		input: "src/index.ts",
		output: { file: `dist/cjs/index.js`, format: "cjs", compact: true, },
		external: externalModules,
		plugins: [
			nodeResolve({ extensions }),
			ts({
				transpiler: "babel",
			}),
		]
	},
	{
		input: "src/index.ts",
		output: { file: `dist/cjs/index.min.js`, format: "cjs", compact: true, },
		external: externalModules,
		plugins: [
			nodeResolve({ extensions }),
			ts({
				transpiler: "babel",
			}),
			uglify(),
		]
	}
];

const esm = [
	{
		input: "src/index.ts",
		output: { file: `dist/esm/index.js`, format: "esm" },
		external: externalModules,
		plugins: [
			nodeResolve({ extensions }),
			ts({
				transpiler: "babel",
			}),
		]
	}
];

module.exports = cjs.concat(esm);