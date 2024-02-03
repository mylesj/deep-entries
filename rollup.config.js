import pkg from './package.json' with { type: 'json' }

export default {
	input: 'src/index.js',
	output: [{ file: pkg.exports, format: 'es' }],
}
