import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFetchMovieDetails } from '@/hooks';
import { usePlayer } from '../providers/PlayerProvider';
import { IEpisodeInfo } from '@/types';
import { formatRelativeDate } from '@/utils/relativeDateFormat';
import { filterString } from '@/utils/filterString';
import { FlashList } from '@shopify/flash-list';
import EpisoideCard from './EpisoideCard';
import CharacterCard from './CharacterCard';
import RecomendationCard from './RecomendationCard';
import { normalize } from '@/utils/fontNormalise';
import { formatNumber } from '@/utils/formatNumber';

interface VideoDetailsProps {
    movieId: string;
}

const VideoDetails = ({ movieId }: VideoDetailsProps) => {
    const { data: movieInfo } = useFetchMovieDetails(movieId)
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
                <Text style={{ color: movieInfo.color, fontSize: normalize(14), paddingLeft: 10 }}>
                    {formatNumber(movieInfo.popularity)} Likes  • {formatNumber(movieInfo.rating)} Ratings
                </Text>
                <Text style={styles.title}>{
                    !!currentEpisoide ? currentEpisoide.title || `EP${currentEpisoide.number}` : movieInfo.status
                } • {formatRelativeDate(movieInfo.startDate)} • {movieInfo.genres[0]}</Text>
                {movieInfo.description && <Text style={styles.desc}>
                    {filterString(movieInfo.description).slice(0, 575)}
                </Text>}
                {!!movieInfo.episodes.length && <View style={styles.episoideWrapper}>
                    <Text style={styles.title}>Episoide ({movieInfo.currentEpisode})</Text>
                    <FlashList
                        estimatedItemSize={150}
                        renderItem={({ item }) => (
                            <EpisoideCard
                                episode={item} key={item.id} />
                        )}
                        keyExtractor={(item) => {
                            return item.id
                        }}
                        data={availableEpisoide}
                        horizontal
                    />
                </View>}
                {!!movieInfo.characters.length && <View style={{ ...styles.episoideWrapper, marginBottom: 20 }}>
                    <Text style={styles.title}>Characters ({movieInfo.characters.length})</Text>
                    <FlashList
                        estimatedItemSize={150}
                        renderItem={({ item }) => (
                            <CharacterCard
                                character={item} key={item.id}
                            />
                        )}
                        data={movieInfo.characters}
                        horizontal
                        keyExtractor={(item) => {
                            return item.id
                        }}
                    />
                </View>}
                {!!movieInfo.recommendations.length && <View style={{ ...styles.episoideWrapper, height: 250, marginBottom: 80 }}>
                    <Text style={styles.title}>Recommendations ({movieInfo.recommendations.length})</Text>
                    <FlashList
                        estimatedItemSize={150}
                        renderItem={({ item }) => (
                            <RecomendationCard
                                movie={item}
                                color={movieInfo.color} key={item.id}
                            />
                        )}
                        keyExtractor={(item) => {
                            return item.id;
                        }}
                        data={movieInfo.recommendations}
                        horizontal
                    />
                </View>}
            </ScrollView>
        )

    return null
}

export default VideoDetails

const styles = StyleSheet.create({
    wrapper: {
        paddingTop: 10,
        flex: 1,
    },
    title: {
        color: "#fff",
        fontSize: normalize(17),
        paddingLeft: 10,
    },
    desc: {
        padding: 10,
        color: "#fff",
        fontSize: normalize(14),
    },
    episoideWrapper: {
        paddingTop: 10,
        alignItems: 'flex-start',
        flex: 1,
        width: "100%",
        height: 150,
    }
})