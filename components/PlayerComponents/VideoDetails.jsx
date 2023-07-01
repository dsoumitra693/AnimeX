import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import { normalize } from '../../fontsNormalisation'



const getEngName = (namesStr) => {
    let nameArr = namesStr?.split(',')
    return nameArr?.find(name => (/^[a-zA-Z0-9"': ]+$/.test(name.trim())))
}


const VideoDetails = ({ currentEpisode, setEpisode, videoDetails, thumbnail }) => {
    const { title, description, releaseDate, otherName: name, episodes, type } = videoDetails
    const [descTextLen, setDescTextLen] = useState(420)
    const [showFullDesc, setShowFullDesc] = useState(false)

    useEffect(() => {
        let _descLen = showFullDesc ? description.length : 420
        setDescTextLen(_descLen)
    }, [showFullDesc])


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>{getEngName(name) || title} {episodes && `Episodes ${currentEpisode?.number}`}</Text>
            <Text style={styles.stats}>
                <Text style={styles.statsHighlight}>68.6K </Text>reviwes {' •  '}
                <Text style={styles.statsHighlight}>379 </Text>comments
            </Text>
            <View style={styles.tagsContainer}>
                <Tag text={`Produced: ${releaseDate}`} bgColor={'lightpink'} />
                <Tag text={'13+'} bgColor={'skyblue'} />
                <Tag text={type} bgColor={'lightgreen'} />
                <Tag text={'Ultra HD'} />
            </View>
            <View style={styles.btnWrapper}>
                <Btn iconName={'md-heart-outline'} onPress={() => { }} isActive={false} />
                <Btn iconName={'md-heart-dislike-outline'} onPress={() => { }} isActive={false} />
                <Btn iconName={'ios-share-social-outline'} onPress={() => { }} isActive={false} />
                <Btn iconName={'ios-download-outline'} onPress={() => { }} isActive={false} />
            </View>
            <View style={styles.descWrapper}>
                <Text style={styles.title}> Description</Text>

                <Text style={styles.descText}>
                    {description?.slice(0, descTextLen)}
                    <TouchableWithoutFeedback onPress={() => setShowFullDesc(prev => !prev)}>
                        <Text style={{ fontWeight: 800 }}>  ...{showFullDesc ? 'show less' : 'show more'}</Text>
                    </TouchableWithoutFeedback>
                </Text>
            </View>
            {!!episodes?.length && <View style={styles.episodeWrapper}>
                <Text style={styles.title}> Episodes</Text>
                {episodes?.map((episode, id) => {
                    return <EpisodeCard thumbnail={thumbnail} name={name} title={title} currentEpisode={currentEpisode} episode={episode} setEpisode={setEpisode} key={id} />
                })}
            </View>}
        </ScrollView>
    )
}

const Tag = ({ text, bgColor }) => (
    <View style={styles.tags(bgColor)}>
        <Text style={styles.tagText}>{text}</Text>
    </View>
)

const Btn = ({ iconName, onPress, isActive }) => (
    <TouchableOpacity style={styles.btn} onPress={onPress}>
        <Icon name={iconName} size={25} color={'#777'} />
    </TouchableOpacity>
)
const EpisodeCard = ({ name, title, thumbnail, episode: {
    id: animeId, number: episodeNumber
}, setEpisode, currentEpisode }) => {


    const playEpisode = () => {
        if (currentEpisode.id != animeId) setEpisode({ id: animeId, number: episodeNumber })
    }
    return (
        <TouchableOpacity style={styles.episodeCard} onPress={playEpisode}>
            <View style={styles.thumbnail}>
                <Image source={{ uri: thumbnail }} style={{ height: '100%', width: '100%' }} resizeMode='stretch' />
                <Icon name={'ios-play-circle-outline'} size={25} color={'#eee'} style={{ position: 'absolute', }} />
            </View>
            <View style={styles.episodedetails}>
                <Text style={{ ...styles.title, fontSize: normalize(15) }}>{episodeNumber}. Episode ({getEngName(name) || title})</Text>
            </View>
            <View>
                <Icon name={'ios-download-outline'} size={25} color={'#eee'} style={{ position: 'absolute', }} />
            </View>
        </TouchableOpacity>
    )
}

export default VideoDetails

const styles = StyleSheet.create({
    container: {
        width: '100%',
        padding: 20,
    },
    tagsContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center'
    },
    title: {
        fontSize: normalize(20),
        fontFamily: 'CooperHewitt',
        letterSpacing: 0.75,
        color: '#fff'
    },
    details: {
        fontSize: normalize(17),
        paddingVertical: 8,
        fontFamily: 'CooperHewitt',
    },
    tags: (bgColor) => ({
        padding: 4,
        marginRight: 7,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: bgColor ?? '#FE9F01',
        borderRadius: 5,
    }),
    tagText: {
        fontSize: normalize(14),
        fontFamily: 'CooperHewitt',
        color: '#000'
    },
    btnWrapper: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingVertical: 15
    },
    btn: {
        paddingVertical: 7,
        paddingHorizontal: 24,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#777'
    },
    stats: {
        fontSize: normalize(15),
        color: '#fff',
        fontFamily: 'CooperHewitt',
        paddingVertical: 5,
    },
    statsHighlight: {
        fontSize: normalize(16),
        color: '#fe9f01',
    },
    descWrapper: {
        width: '100%',
        paddingVertical: 10,
    },
    descText: {
        fontSize: normalize(15),
        color: '#fff',
        fontFamily: 'CooperHewitt',
        paddingVertical: 5,
        lineHeight: 23
    },
    episodeWrapper: {
        width: '100%',
        paddingVertical: 10,
        height: '100%'
    },
    episodeCard: {
        width: '95%',
        height: 100,
        padding: 5,
        marginBottom:15,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    thumbnail: {
        backgroundColor: 'grey',
        width: '30%',
        height: '100%',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden'
    },
    episodedetails: {
        width: '50%'
    }
})