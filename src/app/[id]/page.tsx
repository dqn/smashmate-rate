"use client";

import { useEffect, useState } from "react";
import CountUp from "react-countup";
import Marquee from "react-fast-marquee";

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
  const isOmu = props.params.id === "omu";

  return (
    <div className="text-9xl text-white text-stroke-4 text-stroke-black">
      <Rate id={props.params.id} />
      {isOmu && (
        <div className="w-[280px]">
          <Marquee
            className="text-7xl text-stroke-0 bg-black/90 font-sans h-[120px] py-6"
            gradient={false}
            speed={250}
          >
            うめきの言い訳一覧:「カフェイン取りすぎて体調不良(ウメブラ)」、「元々出る気無かったけど無理して出た+コントローラーも壊れた(デルタ)」、「頑張りすぎて体調崩した(篝火ザクレイ戦後)」、「ヘッドフォンが自分のじゃないと…(マエスマ)」、「疲労が取れてない(鬼灯火、vsオムアツ敗戦)」。かになべ「あれは勝者に失礼だからやめた方がいい、反省して欲しい」
          </Marquee>
        </div>
      )}
    </div>
  );
};

export default Home;
