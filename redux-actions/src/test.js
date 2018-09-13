import { createStore } from 'redux';
import reducers from './reducers';
import { addTask, removeTask, updateTask } from './actions';

const buildTask = id => ({ id, text: Math.random() });

test('Store', () => {
  const store = createStore(reducers);
  expect(store.getState()).toEqual({
    tasks: {},
  });

  store.dispatch(removeTask({ id: 1 }));
  expect(store.getState()).toEqual({
    tasks: {},
  });

  const task1 = buildTask(1);
  store.dispatch(addTask({ task: task1 }));
  expect(store.getState()).toEqual({
    tasks: { 1: task1 },
  });

  const task2 = buildTask(2);
  store.dispatch(addTask({ task: task2 }));
  expect(store.getState()).toEqual({
    tasks: { 1: task1, 2: task2 },
  });

  const mTask2 = buildTask(2);
  store.dispatch(addTask({ task: mTask2 }));
  expect(store.getState()).toEqual({
    tasks: { 1: task1, 2: mTask2 },
  });

  store.dispatch(removeTask({ id: task2.id }));
  expect(store.getState()).toEqual({
    tasks: { 1: task1 },
  });

  const updatedTask1 = { ...task1, text: 'updated text' };
  store.dispatch(updateTask({ task: updatedTask1 }));
  expect(store.getState()).toEqual({
    tasks: { 1: updatedTask1 },
  });
});
