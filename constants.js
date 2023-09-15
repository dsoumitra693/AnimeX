import { normalize } from "./fontsNormalisation"

export const COLORS = {
  white: '#fff'
}

export const FONT = {
  base: normalize(20)
}

export const defaultProfileImg = 'https://randomuser.me/api/portraits/lego/1.jpg'

export const FEED_GENRES = [
  {
    title: 'Must See Action ',
    id: 'action'
  },
  {
    title: 'Most Romantic',
    id: 'romantic'
  },
  {
    title: 'Popular Comedy',
    id: 'comedy'
  },
  {
    title: 'Popular Crime',
    id: 'crime'
  },
  {
    title: 'Popular Supernatural',
    id: 'supernatural'
  },
  {
    title: 'Popular Investigation',
    id: 'investigation'
  },
  {
    title: 'Popular Adventure',
    id: 'adventure'
  },
  {
    title: 'Popular Horror',
    id: 'horror'
  },
]
export const screenOptions = {
  tabBarActiveTintColor: '#222',
  tabBarStyle: {
    display: "none",
  },
  headerShown: false,
}