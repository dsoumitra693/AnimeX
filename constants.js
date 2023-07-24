import { normalize } from "./fontsNormalisation"

export const COLORS = {
  white: '#fff'
}

export const FONT = {
  base: normalize(20)
}

export const defaultProfileImg = 'https://instagram.frdp2-1.fna.fbcdn.net/v/t51.2885-19/343705837_535050125510932_6693990171811190295_n.jpg?stp=dst-jpg_s150x150&_nc_ht=instagram.frdp2-1.fna.fbcdn.net&_nc_cat=104&_nc_ohc=HmSulimPhasAX9x4gGJ&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfBtCU2xMd7noR7AmeqvYF0o5t9Tl04GPDGV7WVMYcIdYw&oe=64624818&_nc_sid=8fd12b'

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
  tabBarButton: () => null,
  headerShown: false,
}

export const AuthConfig = {
  GOOGLE: {
    logo: "https://o.remove.bg/downloads/cab8ca77-d2d2-4a05-a425-2be7f9bd4520/image-removebg-preview.png",
    title: "Sign In With Google"
  },

}