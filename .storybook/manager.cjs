import { addons } from '@storybook/addons';
import { create } from '@storybook/theming';

const theme = create({
  base: 'light',
  brandTitle: 'EnhanceDocs',
  brandUrl: 'https://github.com/enhancedocs',
  brandImage: '/logo-enhance-docs.png',
  colorPrimary: '#000000',
  colorSecondary: '#3663eb',
});

addons.setConfig({ theme });
