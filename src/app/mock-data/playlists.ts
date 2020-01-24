import { Playlist } from "../interfaces/Playlist";

export const PLAYLISTS: Playlist[] = [
  {
    name: "The 1975",
    totalDuration: 9,
    totalSongs: 2,
    description: "List of The 1975 Songs",
    songs: [
      {
        title: "Love It If We Made It",
        artist: "The 1975",
        duration: 4
      },
      {
        title: "How To Draw A Petrichor",
        artist: "The 1975",
        duration: 5
      }
    ]
  },
  {
    name: "Kopikustik",
    totalDuration: 5,
    totalSongs: 2,
    description:
      "More than a coffee, this is all of your favorite accoustic songs.",
    songs: [
      {
        title: "Cigarettes of ours",
        artist: "Ardhito Pramono",
        duration: 3
      },
      {
        title: "Walking Back Home",
        artist: "Vira Talisa",
        duration: 2
      }
    ]
  },
  {
    name: "Anime Hits",
    totalDuration: 13,
    totalSongs: 3,
    description: "Listen to your favorite Anime songs, all in one playlist.",
    songs: [
      {
        title: "Renai Circulation",
        artist: "Kana Hanazawa",
        duration: 4
      },
      {
        title: "Platinum Disco",
        artist: "Tsukihi Phoenix",
        duration: 4
      },
      {
        title: "Silhouette",
        artist: "KANA-BOON",
        duration: 5
      }
    ]
  }
];
