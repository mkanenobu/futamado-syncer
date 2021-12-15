import React, { useState, useMemo, useEffect } from "react";
import YTPlayer from "youtube-player";
import type { YouTubePlayer } from "youtube-player/dist/types";
import { lastElm } from "../helpers/array-helper";
import styles from "./Player.module.scss";

/**
 * initialize player
 */
const usePlayer = (params: {
  videoId: string;
  elmId: string;
}): YouTubePlayer | null => {
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  useEffect(() => {
    if (player) {
      player.destroy();
    }
    setPlayer(
      YTPlayer(params.elmId, {
        videoId: params.videoId,
        width: Math.floor(window.innerWidth * 0.7),
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.videoId]);

  return player;
};

/**
 * create player element
 */
const EmbedElm: React.VFC<{ playerId: string }> = (props) => {
  return <div id={props.playerId} />;
};

const getVideoIdFromUrl = (url: string): string => lastElm(url.split("/"));

interface PlayerProps {
  initialUrl?: string;
  playerId: string;
  controller: React.RefObject<YouTubePlayer>;
}

export const Player: React.VFC<PlayerProps> = (props) => {
  const [url, setUrl] = useState(props.initialUrl);

  const videoId = useMemo(() => (url ? getVideoIdFromUrl(url) : ""), [url]);

  const player = usePlayer({ elmId: props.playerId, videoId });

  useEffect(() => {
    if (player) {
      // @ts-ignore
      props.controller.current = player;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [player]);

  return (
    <div className={styles.container}>
      <input type="url" onChange={(e) => setUrl(e.target.value)} value={url} />
      <EmbedElm playerId={props.playerId} />
    </div>
  );
};
