import { terser } from 'rollup-plugin-terser';

export default {
  input: 'design-system.css',
  output: {
    file: './design-system.css',
    format: 'es',
  },
  plugins: [terser()],
};
