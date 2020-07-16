import glob from 'glob';
import babel from 'rollup-plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import { version } from './package.json';

const name = 'beautiful-react-hooks';
const banner = `/* ${name} version: ${version} */`;

const standardOpts = {
  name, banner, exports: 'named', minifyInternalExports: true, preserveModules: true,
};

// CommonJS (for Node) and ES module (for bundlers) build.
// (We could have three entries in the configuration array
// instead of two, but it's quicker to generate multiple
// builds from a single configuration where possible, using
// an array for the `output` option, where we can specify
// `file` and `format` for each target)
const config = [{
  input: glob.sync('./src/**/*.js'),
  strictDeprecations: true,
  output: [
    { ...standardOpts, dir: 'dist', format: 'cjs' },
    { ...standardOpts, dir: 'dist/esm', format: 'esm' },
  ],
  external: ['react', 'react-dom', 'lodash.debounce', 'lodash.throttle'],
  plugins: [
    resolve(),
    babel({
      comments: false,
      presets: ['@babel/preset-env'],
    }),
  ],
}];

export default config;
