import 'js-polyfills/html';

import timeout from 'timeout-then';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import axios from 'axios';
import thunk from 'redux-thunk';
import httpAdapter from 'axios/lib/adapters/http';
import nock from 'nock';
import App from '../src/components/App';
import reducers from '../src/reducers';

Enzyme.configure({ adapter: new Adapter() });

axios.defaults.adapter = httpAdapter;
nock.disableNetConnect();

const host = 'http://localhost';

test('Store', async () => {
  const store = createStore(
    reducers,
    applyMiddleware(thunk),
  );

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

  nock(host)
    .post('/tasks')
    .reply(201, (uri, body) => {
      const data = JSON.parse(body);
      const response = { ...data.task, state: 'active', id: 1 };
      return response;
    });

  newTaskSubmit.simulate('submit');

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();

  newTaskInput.simulate('change', { target: { value: 'another task' } });
  expect(wrapper.render()).toMatchSnapshot();

  nock(host).post('/tasks')
    .reply(201, (uri, body) => {
      const data = JSON.parse(body);
      const response = { ...data.task, state: 'active', id: 2 };
      return response;
    });

  newTaskSubmit.simulate('submit');

  await timeout(100);

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

  nock(host).delete('/tasks/2')
    .reply(204);

  links.last().simulate('click');

  await timeout(100);

  expect(wrapper.render()).toMatchSnapshot();
});
