const { mergeConfig } = require('vite');

module.exports = {
  stories: [
    '../lib/**/*.stories.mdx',
    '../lib/**/*.stories.@(js|jsx|ts|tsx)'
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions'
  ],
  framework: '@storybook/react',
  core: {
    builder: '@storybook/builder-vite'
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      css: {
        modules: {
          generateScopedName(name) {
            return name;
          }
        }
      }
    });
  },
  features: {
    storyStoreV7: true
  }
};
