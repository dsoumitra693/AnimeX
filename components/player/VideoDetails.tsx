import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useFetchMovieDetails } from '@/hooks';
import { usePlayer } from '../providers/PlayerProvider';
import { ICharacter, IEpisodeInfo } from '@/types';
import { formatRelativeDate } from '@/utils/relativeDateFormat';
import { filterString } from '@/utils/filterString';
import { FlashList } from '@shopify/flash-list';
import EpisoideCard from './EpisoideCard';
import { formatLikes } from '@/utils/formatLikes';
import CharacterCard from './CharacterCard';
import MovieCard from '../MovieCard';
import RecomendationCard from './RecomendationCard';

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
                <Text style={{ color: movieInfo.color, fontSize: 16, paddingLeft: 10 }}>
                    {formatLikes(movieInfo.popularity)} Likes  • {formatLikes(movieInfo.rating)} Ratings
                </Text>
                <Text style={styles.title}>{currentEpisoide.title || `EP${currentEpisoide.number}`} • {formatRelativeDate(movieInfo.startDate)} • {movieInfo.season}</Text>
                <Text style={styles.desc}>
                    {filterString(movieInfo.description).slice(0, 575)}
                </Text>
                {movieInfo.episodes && <View style={styles.episoideWrapper}>
                    <Text style={styles.title}>Episoide ({movieInfo.currentEpisode})</Text>
                    <FlashList
                        estimatedItemSize={150}
                        renderItem={({ item }) => (
                            <EpisoideCard
                                episode={item}
                                isPlaying={item.id === currentEpisoide.id} />
                        )}
                        data={availableEpisoide}
                        horizontal
                    />
                </View>}
                {movieInfo.characters && <View style={{ ...styles.episoideWrapper, marginBottom: 20 }}>
                    <Text style={styles.title}>Characters ({movieInfo.characters.length})</Text>
                    <FlashList
                        estimatedItemSize={150}
                        renderItem={({ item }) => (
                            <CharacterCard
                                character={item}
                            />
                        )}
                        data={movieInfo.characters}
                        horizontal
                    />
                </View>}
                {movieInfo.recommendations && <View style={{ ...styles.episoideWrapper, height: 250, marginBottom: 80 }}>
                    <Text style={styles.title}>Recommendations ({movieInfo.recommendations.length})</Text>
                    <FlashList
                        estimatedItemSize={150}
                        renderItem={({ item }) => (
                            <RecomendationCard
                                movie={item}
                                color={movieInfo.color}
                            />
                        )}
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
        // padding: 20,
        flex: 1,
    },
    title: {
        color: "#fff",
        fontSize: 20,
        paddingLeft: 10,
    },
    desc: {
        padding: 10,
        color: "#fff",
        fontSize: 14,
    },
    episoideWrapper: {
        paddingTop: 10,
        alignItems: 'flex-start',
        flex: 1,
        width: "100%",
        height: 150,
    }
})