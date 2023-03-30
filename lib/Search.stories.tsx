import { ComponentMeta, ComponentStory } from '@storybook/react';
import Search from './Search';

const ACCESS_TOKEN = 'pk_54cdfba3dfaeef6a7636976b03e6afc0930a336d9a0f33eb';

export default {
  title: 'Search',
  component: Search
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => <Search {...args} />;

export const Example = Template.bind({});
Example.args = {
  accessToken: ACCESS_TOKEN
};
