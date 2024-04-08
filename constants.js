import { normalize } from "./fontsNormalisation";
import { Header } from "./components";
export const COLORS = {
  white: "#fff",
};

export const FONT = {
  base: normalize(20),
};

export const defaultProfileImg =
  "https://randomuser.me/api/portraits/lego/1.jpg";

export const FEED_GENRES = [
  { title: "Must See Action Anime", id: "Action" },
  { title: "Must See Adventure Anime", id: "Adventure" },
  { title: "Must See Comedy Anime", id: "Comedy" },
  { title: "Must See Drama Anime", id: "Drama" },
  { title: "Must See Fantasy Anime", id: "Fantasy" },
  { title: "Must See Horror Anime", id: "Horror" },
  { title: "Must See Mystery Anime", id: "Mystery" },
  { title: "Must See Romance Anime", id: "Romance" },
  { title: "Must See Sci-Fi Anime", id: "Sci-Fi" },
  { title: "Must See Slice of Life Anime", id: "Slice of Life" },
  { title: "Must See Sports Anime", id: "Sports" },
  { title: "Must See Supernatural Anime", id: "Supernatural" },
  { title: "Must See Psychological Anime", id: "Psychological" },
  { title: "Must See Thriller Anime", id: "Thriller" },
  { title: "Must See Mecha Anime", id: "Mecha" },
  { title: "Must See Music Anime", id: "Music" },
  { title: "Must See Shounen Anime", id: "Shounen" },
  { title: "Must See Shoujo Anime", id: "Shoujo" },
  { title: "Must See Seinen Anime", id: "Seinen" },
  { title: "Must See Josei Anime", id: "Josei" },
  { title: "Must See Harem Anime", id: "Harem" },
  { title: "Must See Isekai Anime", id: "Isekai" },
  { title: "Must See Magic Anime", id: "Magic" },
  { title: "Must See School Anime", id: "School" },
  { title: "Must See Superpower Anime", id: "Superpower" },
  { title: "Must See Vampire Anime", id: "Vampire" },
  { title: "Must See Cyberpunk Anime", id: "Cyberpunk" },
  { title: "Must See Samurai Anime", id: "Samurai" },
  { title: "Must See Martial Arts Anime", id: "Martial Arts" },
  { title: "Must See Demons Anime", id: "Demons" },
  { title: "Must See Ecchi Anime", id: "Ecchi" },
  { title: "Must See Historical Anime", id: "Historical" },
  { title: "Must See Space Anime", id: "Space" },
  { title: "Must See Game Anime", id: "Game" },
];
export const screenOptions = {
  tabBarActiveTintColor: "#222",
  tabBarStyle: {
    display: "none",
  },
  statusBarStyle: "auto",
  statusBarTranslucent: true,
  statusBarColor: "transparent",
  statusBarStyle:"dark",
  navigationBarColor:"#222",
  header: (props) => <Header {...props} />,
};

