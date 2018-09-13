import 'js-polyfills/html';

import React from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducers from '../src/reducers';
import App from '../src/components/App';

Enzyme.configure({ adapter: new Adapter() });

test('Store', () => {
  const store = createStore(reducers);

  const vdom = (
    <Provider store={store}>
      <App />
    </Provider>
  );
  const wrapper = mount(vdom);
  expect(wrapper.render()).toMatchSnapshot();

  const newTaskInput = wrapper.find('input[type="text"]');
  const newTaskSubmit = wrapper.find('button[type="submit"]');

  newTaskInput.simulate('change', { target: { value: 'na-na' } });
  expect(wrapper.render()).toMatchSnapshot();

  newTaskSubmit.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();

  newTaskInput.simulate('change', { target: { value: 'another task' } });
  expect(wrapper.render()).toMatchSnapshot();

  newTaskSubmit.simulate('submit');
  expect(wrapper.render()).toMatchSnapshot();

  const link = wrapper.find('.app-toggle-state').first();
  link.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  const activeFilterButton = wrapper.find('.app-filter-active');
  const finishedFilterButton = wrapper.find('.app-filter-finished');

  activeFilterButton.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  finishedFilterButton.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  const allFilterButton = wrapper.find('.app-filter-all');

  allFilterButton.simulate('click');
  expect(wrapper.render()).toMatchSnapshot();

  const links = wrapper.find('.app-remove-task');
  links.last().simulate('click');
  expect(wrapper.render()).toMatchSnapshot();
});
