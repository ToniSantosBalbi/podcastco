import { getPodcast } from '../src/api/queries';
import podcastSaga from '../src/store/podcast/podcast.saga';

describe('fetchPodcastFromApi', () => {
  const podcastSlug = 'create-reach-inspire'
  const genObject = getPodcast(podcastSlug);
  
  it('should wait for every GET_PODCAST action and call getPodcast', () => {
    expect(genObject.next().value)
      .toEqual(podcastSaga);
  });
  
  it('should be done on next iteration', () => {
    expect(genObject.next().done).toBeTruthy();
  });
});