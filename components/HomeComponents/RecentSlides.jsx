import { Dimensions, FlatList } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import Slide from './Slide'
import { getTopAiringAimne } from '../../apiCall'


const WINDOW_WIDTH = Dimensions.get("window").width
let CurrentSlide = 0
let IntervalTime = 4000
let timerId

const RecentSlides = () => {
    //get top airing anime
    const [topAiringAinme, setTopAiringAinme] = useState({})

    useEffect(() => {
        (async function () {
            let _topAiringAinme = await getTopAiringAimne()
            setTopAiringAinme(_topAiringAinme)
        })()
    }, [])


    const flatList = useRef(null)

    goToNextPage = () => {
        if (CurrentSlide >= 9) CurrentSlide = -1;
        if (flatList !== null) {
            flatList.current.scrollToIndex({
                index: ++CurrentSlide,
                animated: true,
            })
        }
    }
    startAutoPlay = () => {
        timerId = setInterval(goToNextPage, IntervalTime)
    }

    stopAutoPlay = () => {
        if (timerId)
            clearInterval(timerId)
    }

    useEffect(() => {
        if(topAiringAinme) startAutoPlay()
        return () => stopAutoPlay()
    }, [topAiringAinme])


    return (
        <FlatList
            horizontal
            data={topAiringAinme}
            ref={flatList}
            showsHorizontalScrollIndicator={false}
            snapToAlignment="start"
            decelerationRate={"fast"}
            snapToInterval={WINDOW_WIDTH}
            renderItem={({ item }) => {

                return <Slide src={item.image} title={item.title} genres={item.genres} animeId={item.id}/>
            }}
            keyExtractor={item => item.id}
        />
    )
}

export default RecentSlides