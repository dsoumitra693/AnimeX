import React, { useEffect, useState, useRef } from "react";
import { getTopAiringMovie } from "../../apiCall";
import { FlatList, Text, View } from "react-native";
import Slide from "./Slide";

const RecentSlides = () => {
  const [trendingMovies, setTrendingMovies] = useState([]);
  const flatListRef = useRef(null);

  useEffect(() => {
    (async function () {
      let _trendingMovies = await getTopAiringMovie();

      setTrendingMovies(_trendingMovies.slice(0, 5));
    })();
  }, []);

  const autoSlide = () => {
    if (
      flatListRef.current &&
      Array.isArray(trendingMovies) && // Check if trendingMovies is an array
      trendingMovies?.length > 0
    ) {
      const currentIndex = flatListRef.current.currentIndex || 0;
      const nextIndex = (currentIndex + 1) % trendingMovies.length;
      flatListRef.current.scrollToIndex({ index: nextIndex, animated: true });
    }
  };

  useEffect(() => {
    const intervalId = setInterval(autoSlide, 1000);

    return () => clearInterval(intervalId);
  }, [ trendingMovies]);

  if (trendingMovies.length == 0) return;
  return (
    <FlatList
      ref={flatListRef}
      data={trendingMovies}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      keyExtractor={(item) => item?.id?.toString()}
      renderItem={({ item }) => (
        <Slide
          src={item?.image}
          title={item?.title}
          type={item?.type}
          movieId={item?.id}
        />
      )}
    />
  );
};

export default RecentSlides;
