import React, {useEffect, useMemo, useState} from "react";
import {get} from "lodash";
import Filters, {IFilterModel} from "./Filters";
import VideoGameRow from "./VideoGameRow";
import {VideoGameModel} from "../../types";
import {VideoGameService} from "../../services";

const VideoGames = () => {
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<IFilterModel>();
  const [games, setGames] = useState<VideoGameModel[]>([]);

  useEffect(() => {
    VideoGameService.search().then((data) => {
      setGames(data);
    }).finally(() => {
      setLoading(false);
    });
  }, []);

  const filteredGames = useMemo(() => {
    let result = games;
    if (filter?.name) {
      const search = filter.name.toLowerCase();
      result = result.filter((item) => item.name.toLowerCase().includes(search));
    }
    if (filter?.minScore) {
      result = result.filter((item) => Math.round(item.rating / 10) >= +filter.minScore);
    }
    if (filter?.orderBy) {
      result = result.sort((a, b) => {
        const value1 = get(a, filter.orderBy);
        const value2 = get(b, filter.orderBy);
        let result = typeof value1 === 'string' ? value1.localeCompare(value2) : value1 - value2;
        if (filter?.orderDir === 'desc') {
          result = -result;
        }

        return result;
      });
    }
    return result;
  }, [games, filter]);

  return (
    <div className="w-full flex max-md:flex-col items-start">
      <Filters className="w-full md:w-64 md:mr-6 mb-8" onChange={setFilter} />

      <div className="w-full md:w-0 flex-grow">
        {filteredGames.map((item, i) => (
          <VideoGameRow key={i} game={item} />
        ))}

        {loading && (
          <div className="bg-navy text-lg text-center p-8">Loading ...</div>
        )}

        {!loading && !filteredGames.length && (
          <div className="bg-navy text-lg text-center p-8">No results found</div>
        )}
      </div>
    </div>
  );
};

export default VideoGames;
