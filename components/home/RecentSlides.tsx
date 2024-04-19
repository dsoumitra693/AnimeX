import React, { useEffect, useRef } from "react";
import { Dimensions, Animated, View } from "react-native";
import Slide from "./Slide";
import { FlashList } from "@shopify/flash-list";
import useFetchTrending from "@/hooks/useFetchTrending";
import { ISearchMovie } from "@/types";

const { width, height } = Dimensions.get("window");

const RecentSlides = () => {
  const scrollX = new Animated.Value(0);
  const flatListRef = useRef<FlashList<ISearchMovie>>(null);

  function infiniteScroll(dataList: string | any[] | ISearchMovie | undefined) {
    const numberOfData = dataList?.length;
    let scrollValue = 0,
      scrolled = 0;

    const interval = setInterval(function () {
      scrolled++;
      if (scrolled < numberOfData) scrollValue = scrollValue + width;
      else {
        scrollValue = 0;
        scrolled = 0;
      }

      if (flatListRef.current) {
        flatListRef.current.scrollToOffset({
          animated: true,
          offset: scrollValue,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }
  let { data: trendingMovies, isLoading, isError } = useFetchTrending()

  useEffect(() => {
    const clearInfiniteScroll = infiniteScroll(trendingMovies);
    return () => {
      clearInfiniteScroll();
    };
  }, [trendingMovies]);

  return (
    <FlashList<ISearchMovie>
      data={trendingMovies}
      ref={flatListRef}
      keyExtractor={(item) => {
        return item.image.toString();
      }}
      horizontal
      pagingEnabled
      scrollEnabled
      scrollEventThrottle={16}
      decelerationRate={"fast"}
      showsHorizontalScrollIndicator={false}
      ListEmptyComponent={(props) => (
        <View
          style={{ width, height: height * 0.7, backgroundColor: "#111" }}
          {...props}
        />
      )}
      renderItem={({ item }) => {
        return <Slide movie={item} key={item.id}/>;
      }}
      estimatedItemSize={400}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
        { useNativeDriver: false }
      )}
    />
  );

};

export default RecentSlides;
