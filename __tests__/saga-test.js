// import {runSaga} from 'redux-saga';
// import * as api from './api';

// import {saveAuthorsToList, saveAuthorsToListError} from '../src/store/actions';

// import {makeAuthorsApiRequest} from '../src/store/podcast/podcast.saga';

// describe('getPodcast', () => {
//   it('should call api and dispatch success action', async () => {
//     const dummyAuthors = {name: 'JK Rowling'};
//     const requestAuthors = jest
//       .spyOn(api, 'requestAuthors')
//       .mockImplementation(() => Promise.resolve(dummyAuthors));
//     const dispatched = [];
//     const result = await runSaga(
//       {
//         dispatch: action => dispatched.push(action),
//       },
//       makeAuthorsApiRequest,
//     );

//     expect(requestAuthors).toHaveBeenCalledTimes(1);
//     expect(dispatched).toEqual([saveAuthorsToList(dummyAuthors)]);
//     requestAuthors.mockClear();
//   });

//   it('should call api and dispatch error action', async () => {
//     const requestAuthors = jest
//       .spyOn(api, 'requestAuthors')
//       .mockImplementation(() => Promise.reject());
//     const dispatched = [];
//     const result = await runSaga(
//       {
//         dispatch: action => dispatched.push(action),
//       },
//       makeAuthorsApiRequest,
//     );

//     expect(requestAuthors).toHaveBeenCalledTimes(1);
//     expect(dispatched).toEqual([saveAuthorsToListError()]);
//     requestAuthors.mockClear();
//   });
// });

// import sinon from 'sinon';
// import * as api from './api';

// test('callApi', async (assert) => {
//   const dispatched = [];
//   sinon.stub(api, 'myApi').callsFake(() => ({
//     json: () => ({
//       some: 'value'
//     })
//   }));
//   const url = 'http://url';
//   const result = await runSaga({
//     dispatch: (action) => dispatched.push(action),
//     getState: () => ({ state: 'test' }),
//   }, callApi, url).toPromise();

//   assert.true(myApi.calledWith(url, somethingFromState({ state: 'test' })));
//   assert.deepEqual(dispatched, [success({ some: 'value' })]);
// });