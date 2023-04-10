import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Search from './Search';

const ENHANCED_SEARCH_CONFIG = {
  projectId: '642c2d009557653a6d46cdda',
  accessToken: 'pk_c237abe4951408b069e6482ad7b4214ea7ce6901bf699dbe'
};

const DOC_SEARCH_CONFIG = {
  apiKey: 'VknaNXobIMS1DocvqohOZxDwfP4jqYO2',
  host: '824vz69qrn0af371p-1.a1.typesense.net',
  collection: 'ni61t27j9poqkf5bp_1680796654'
};

export default {
  title: 'Search',
  component: Search
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => {
  const [currentTheme, setCurrentTheme] = useState('light')

  function toggleMode() {
    if (currentTheme == 'light') {
      document.documentElement.classList.remove('light');
      document.documentElement.classList.add('dark');
      setCurrentTheme('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
      setCurrentTheme('light');
    }
  }

  return (
    <div>
      <div>
        {currentTheme} theme
        <button onClick={toggleMode} style={{ marginLeft: 8, marginBottom: 32, cursor: 'pointer' }}>
          {currentTheme == 'light' ? '🌝' : '🌚'}
        </button>
      </div>
      <Search {...args} />
    </div>
  );
};

export const EnhancedSearch = Template.bind({});
EnhancedSearch.args = {
  config: {
    enhancedSearch: ENHANCED_SEARCH_CONFIG
  }
};

export const EnhancedAndDocSearch = Template.bind({});
EnhancedAndDocSearch.args = {
  config: {
    enhancedSearch: ENHANCED_SEARCH_CONFIG,
    docSearch: DOC_SEARCH_CONFIG
  }
};

export const CustomTheme = Template.bind({});
CustomTheme.args = {
  config: {
    enhancedSearch: ENHANCED_SEARCH_CONFIG
  },
  theme: {
    primaryColor: '#bdbe22'
  }
};
