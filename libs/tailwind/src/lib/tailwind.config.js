const { appRootPath } = require('@nrwl/workspace/src/utils/app-root');
const { resolve } = require('path');

module.exports = {
  content: [
    resolve(appRootPath, 'apps/**/*.{jsx,tsx,js}'),
    resolve(appRootPath, 'libs/**/*.{jsx,tsx,js}'),
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/typography'), require('@tailwindcss/forms')],
};
