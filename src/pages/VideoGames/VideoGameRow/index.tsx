import React, {FC} from "react";
import {Badge} from "../../../components";
import {VideoGameModel} from "../../../types";

export interface IVideoGameRowProps {
  game: VideoGameModel;
}

const VideoGameRow: FC<IVideoGameRowProps> = ({
  game,
}) => {
  return (
    <div className="relative flex max-xs:flex-col items-stretch mb-3">
      <div className="w-full max-xs:h-28 xs:w-28 bg-black flex-shrink-0" />
      <div className="flex items-center justify-between flex-grow bg-navy px-4 py-2">
        <div>
          <h6 className="text-lg text-white">{game.name}</h6>
          <div className="font-title text-sm mb-2">Release Date: {game.formatReleaseDate()}</div>
          <p className="text-xs line-clamp-3">
            [Summary] {game.summary}
          </p>
        </div>

        <Badge className="max-xs:absolute top-4 right-4 text-xl ml-4">{Math.round(game.rating / 10)}</Badge>
      </div>
    </div>
  )
};

export default VideoGameRow;
