"use client";

import { useEffect, useState } from "react";

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
  const [rate, setRate] = useState(0);

  useEffect(() => {
    fetchRate(id)
      .then((rate) => setRate(rate))
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <span>loading...</span>;
  }

  if (isError) {
    return <span>N/A</span>;
  }

  return <span>{rate}</span>;
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
