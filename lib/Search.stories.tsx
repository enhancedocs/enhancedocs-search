import { useState } from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import Search from './Search';
import SearchModal from './components/search-modal/SearchModal';

const ENHANCED_CONFIG = {
  projectId: '646a4e6158de6ee4ab3076cd',
  accessToken: 'pk_919329ca3f52aeae4ba58aa1021f4a63eba7454d54ca86c7'
};

export default {
  title: 'Search',
  component: Search
} as ComponentMeta<typeof Search>;

const Template: ComponentStory<typeof Search> = (args) => {
  const [currentTheme, setCurrentTheme] = useState('light');

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
    enhancedSearch: ENHANCED_CONFIG
  }
};

export const CustomTheme = Template.bind({});
CustomTheme.args = {
  config: {
    enhancedSearch: ENHANCED_CONFIG
  },
  theme: {
    primaryColor: '#009485'
  }
};
