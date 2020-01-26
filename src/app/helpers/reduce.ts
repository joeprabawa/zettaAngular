import { Song } from "../interfaces/Song";

export const reducing = (params: any[]): Song => {
  let totalDur = 0;
  return params.reduce((acc, val, _, arr) => {
    acc["totalDuration"] = totalDur += val.duration;
    acc["totalSongs"] = arr.length;
    return acc;
  }, {});
};
