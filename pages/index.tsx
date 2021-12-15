import React, { useRef, useCallback, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import type { YouTubePlayer } from "youtube-player/dist/types";
import styles from "../styles/Home.module.scss";
import { Player } from "../src/components/Player";
import { Spacer } from "../src/components/Spacer";

const parseNumber = (str: string): number => {
  const num = parseInt(str, 10);
  if (isNaN(num)) {
    throw new Error(`Invalid number: ${str}`);
  }
  return num;
};

const Home: NextPage = () => {
  const a = useRef<YouTubePlayer>(null);
  const b = useRef<YouTubePlayer>(null);

  const [offsetSeconds, setOffsetSeconds] = useState("-35");
  const [seekTo, setSeekTo] = useState("60");

  const playVideo = useCallback(() => {
    if (a.current && b.current) {
      a.current.playVideo();
      b.current.seekTo(parseNumber(offsetSeconds), true);
      b.current.playVideo();
    }
  }, [a, b, offsetSeconds]);

  const seekBoth = useCallback(
    (seconds: number) => {
      if (a.current && b.current) {
        a.current.seekTo(seconds, true);
        b.current.seekTo(seconds + parseNumber(offsetSeconds), true);
      }
    },
    [a, b, offsetSeconds]
  );

  const pause = useCallback(() => {
    if (a.current && b.current) {
      a.current.pauseVideo();
      b.current.pauseVideo();
    }
  }, [a, b]);

  return (
    <div className={styles.container}>
      <Head>
        <title>二窓Syncer</title>
        <meta name="description" content="YouTubeの動画２つをSyncさせるやつ" />
      </Head>

      <main className={styles.main}>
        <div className={styles.controlContainer}>
          <button onClick={() => playVideo()}>play</button>
          <button onClick={() => pause()}>pause</button>
          <div>
            <input
              type="number"
              value={seekTo}
              onChange={(e) => {
                setSeekTo(e.target.value);
              }}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                seekBoth(parseNumber(seekTo));
              }}
            >
              seek
            </button>
          </div>
          <div>
            offset:{" "}
            <input
              type="number"
              value={offsetSeconds}
              onChange={(e) => {
                setOffsetSeconds(e.target.value);
              }}
            />
          </div>
        </div>
        <Spacer height={"2rem"} />
        <div>
          A
          <Player
            controller={a}
            playerId={"player-A"}
            initialUrl={"https://youtu.be/NC-4W3S-WXo"}
          />
        </div>

        <Spacer height={"2rem"} />
        <div>
          B
          <Player
            controller={b}
            playerId={"player-B"}
            initialUrl={"https://youtu.be/svEQsLaq0v8"}
          />
        </div>
      </main>
    </div>
  );
};

export default Home;
