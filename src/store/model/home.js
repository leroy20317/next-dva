import { init } from '../services/home';

const model = {
  namespace: 'home',
  state: {
    count: 0,
  },
  effects: {
    * init(payload, {put, call}) {
      const response = yield call(init, payload);
      yield put({type: 'save', payload: 1});
    },
    * add(payload, {put, select}) {
      const count = yield select(state => state.home.count);
      yield put({type: 'save', payload: count + 1});
    },
    * minus(payload, {put, select}) {
      const count = yield select(state => state.home.count);
      yield put({type: 'save', payload: count - 1});
    },
  },
  reducers: {
    save(state, {payload}) {
      return {...state, count: payload};
    },
  },
};

export default model;
