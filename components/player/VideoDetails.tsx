import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFetchMovieDetails } from '@/hooks';
import { usePlayer } from '../providers/PlayerProvider';
import { IEpisodeInfo } from '@/types';
import { formatRelativeDate } from '@/utils/relativeDateFormat';
import { filterString } from '@/utils/filterString';
import { FlashList } from '@shopify/flash-list';
import EpisoideCard from './EpisoideCard';
import { formatLikes } from '@/utils/formatLikes';

interface VideoDetailsProps {
    movieId: string;
}

const VideoDetails = ({ movieId }: VideoDetailsProps) => {
    const { data: movieInfo, isLoading, isError } = useFetchMovieDetails(movieId)
    const { setVideoPoster, availableEpisoide, setAvailableEpisoide, currentEpisoide, setCurrentEpisoide } = usePlayer()

    useEffect(() => {
        if (movieInfo && movieInfo.episodes) {
            setVideoPoster(movieInfo.trailer?.thumbnail || movieInfo.image)
            setAvailableEpisoide(movieInfo.episodes as IEpisodeInfo[])
            setCurrentEpisoide(movieInfo.episodes[0])
        }
    }, [movieInfo])
    if (movieInfo)
        return (
            <ScrollView style={styles.wrapper}>
                <Text style={styles.title}>
                    {movieInfo?.title.english || movieInfo?.title.romaji}
                </Text>
                <Text style={{ color: movieInfo.color, fontSize: 16 }}>
                    {formatLikes(movieInfo.popularity)} Likes
                </Text>
                <Text style={styles.title}>{currentEpisoide.title} - {formatRelativeDate(movieInfo.startDate)} - {movieInfo.season}</Text>
                <Text style={styles.desc}>
                    {filterString(movieInfo.description).slice(0, 575)}
                </Text>
                <View style={styles.episoideWerapper}>
                    <Text style={styles.title}>Episoide ({movieInfo.currentEpisode})</Text>
                    <FlashList
                        estimatedItemSize={150}
                        renderItem={({ item }) => (
                            <EpisoideCard episode={item} />
                        )}
                        data={availableEpisoide}
                        horizontal
                    />
                </View>
            </ScrollView>
        )

    return null
}

export default VideoDetails

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 10,
        padding: 20,
        flex: 1,
    },
    title: {
        color: "#fff",
        fontSize: 20,
    },
    desc: {
        paddingTop: 10,
        color: "#fff",
        fontSize: 14,
    },
    episoideWerapper: {
        paddingTop: 10,
        width: "100%"
    }
})