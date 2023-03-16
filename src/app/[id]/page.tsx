"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

const fetchIntervalMillis = 5_000;
const counterAnimationDurationSec = 2;

function fetchRate(id: string): Promise<{ rate: number; rank: number }> {
  return fetch(`/api/rate/${id}`).then((res) => res.json());
}

type RateProps = {
  id: string;
};

const RateAndRank: React.FC<RateProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [prevRate, setPrevRate] = useState(1500);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const update = () => {
      fetchRate(id)
        .then(({ rate }) => {
          setRate(rate);
          setIsError(false);

          setTimeout(() => {
            setPrevRate(rate);
          }, counterAnimationDurationSec * 1_000);
        })
        .catch(() => setIsError(true))
        .finally(() => setIsLoading(false));
    };

    update();

    const intervalId = setInterval(update, fetchIntervalMillis);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  if (isLoading) {
    return <span>...</span>;
  }

  if (isError) {
    return <span>N/A</span>;
  }

  return (
    <CountUp
      start={prevRate}
      end={rate}
      duration={counterAnimationDurationSec}
      useEasing
    />
  );
};

type Props = {
  params: {
    id: string;
  };
};

const Home: React.FC<Props> = (props) => {
  return (
    <div className="text-white text-stroke-4 text-stroke-black text-9xl">
      <RateAndRank id={props.params.id} />
    </div>
  );
};

export default Home;
