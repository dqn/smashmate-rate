"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";

const fetchIntervalMillis = 5_000;
const counterAnimationDurationSec = 2;

function fetchRate(id: string): Promise<number> {
  return fetch(`/api/rate/${id}`)
    .then((res) => res.json())
    .then((json) => json.rate);
}

type RateProps = {
  id: string;
};

const Rate: React.FC<RateProps> = ({ id }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [prevRate, setPrevRate] = useState(1500);
  const [rate, setRate] = useState(0);

  useEffect(() => {
    const update = () => {
      fetchRate(id)
        .then((rate) => {
          setRate(rate);

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
    <span>
      <CountUp
        start={prevRate}
        end={rate}
        duration={counterAnimationDurationSec}
        useEasing
      />
    </span>
  );
};

type Props = {
  params: {
    id: string;
  };
};

const Home: React.FC<Props> = (props) => {
  return (
    <div className="font-mono text-9xl text-black text-stroke-2 text-stroke-white">
      <Rate id={props.params.id} />
    </div>
  );
};

export default Home;
