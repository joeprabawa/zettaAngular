export const reducing = (params: any[], component: any) => {
  let total = 0;
  return params.reduce((acc, val, _, arr) => {
    component == "playlist"
      ? ((acc["totalDuration"] = total += val.duration),
        (acc["totalSongs"] = arr.length))
      : (acc["totalPrice"] = total += val.price);
    return acc;
  }, {});
};
