import { useQueries } from 'react-query';
import { getTopRatedTvShows, getTvShows } from '../api';
import { makeImagePath } from '../utils';
import VideoSlider from '../components/VideoSlider';

import styled from 'styled-components';

const Wrapper = styled.main`
  height: 100%;
`;

const Loader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 5rem;
`;

const Visual = styled.section<{ $bgImg: string }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
  padding: 4rem 2rem 2rem 2rem;
  height: 100%;
  background-image: linear-gradient(rgba(0, 0, 0, 0.8) 4rem, rgba(0, 0, 0, 0)),
    url(${(props) => props.$bgImg});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 3rem;
`;

const Overview = styled.p`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  font-size: 1.25rem;
  line-height: 1.25;
  overflow: hidden;
`;

const TvShows = () => {
  const result = useQueries([
    {
      queryKey: ['tvShows', 'onTheAirTvShows'],
      queryFn: getTvShows,
    },
    {
      queryKey: ['tvShows', 'topRatedTvShows'],
      queryFn: getTopRatedTvShows,
    },
  ]);

  const [{ data: onTheAir }, { data: topRated }] = result;

  const finishLoading = result.some((result) => result.isLoading);

  return (
    <Wrapper>
      {finishLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Visual
            $bgImg={makeImagePath(onTheAir?.results[0].backdrop_path || '')}
          >
            <Title>{onTheAir?.results[0].name}</Title>
            <Overview>{onTheAir?.results[0].overview}</Overview>
            <VideoSlider tvShows={onTheAir} />
          </Visual>
        </>
      )}
    </Wrapper>
  );
};

export default TvShows;
