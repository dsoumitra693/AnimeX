import React, { memo, useContext, useEffect, useState, useCallback } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';
import { useNavigation } from '@react-navigation/native';
import { normalize } from '../../fontsNormalisation';
import { deleteWatchList, updateWatchList } from '../../Api/users';
import { AuthContext } from '../../context/auth';

const { width, height } = Dimensions.get('window');

const Slide = memo(({ src, title, genres, animeId }) => {
  const navigator = useNavigation();

  const [isInWatchList, setIsInWatchList] = useState(false);
  const [data, setData] = useContext(AuthContext);

  const headersList = {
    Accept: '*/*',
    authorization: data.token,
    'Content-Type': 'application/json',
  };

  const bodyContent = JSON.stringify({
    animeId: animeId,
    name: title,
    imgUrl: src,
  });

  const updateLocalUser = useCallback((props) => {
    setData((prevData) => ({ ...prevData, user: { ...prevData.user, ...props } }));
  }, [setData]);

  const addToWatchList = useCallback(async () => {
    setIsInWatchList(true);
    try {
      const response = await updateWatchList({
        headers: headersList,
        data: bodyContent,
      });
      updateLocalUser({ watchList: response.watchList });
    } catch (error) {
      // Handle error
    }
  }, [headersList, bodyContent, updateLocalUser]);

  const removeFromWatchList = useCallback(async () => {
    setIsInWatchList(false);
    try {
      const response = await deleteWatchList({
        headers: headersList,
        data: bodyContent,
      });
      updateLocalUser({ watchList: response.watchList });
    } catch (error) {
      // Handle error
    }
  }, [headersList, bodyContent, updateLocalUser]);

  useEffect(() => {
    let isFound = data?.user?.watchList?.find((anime) => anime.animeId === animeId) || false;
    setIsInWatchList(isFound);
  }, [animeId, data]);

  const playNow = useCallback(() => {
    navigator.navigate('Player', { animeId: animeId, thumbnail: src });
  }, [animeId, navigator, src]);

  return (
    <View
      style={{
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
      }}
    >
      <Image source={{ uri: src }} height={height * 0.8} width={width} resizeMode="stretch" />
      <View style={styles.container}>
        <LinearGradient
          // Background Linear Gradient
          colors={['transparent', '#222']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.65 }}
          style={styles.linearGradient}
        >
          <View style={styles.textWrapper}>
            <Text style={styles.geners}>{`${genres[0]} • ${genres[1]} • ${genres[2]}`}</Text>
            <Text style={styles.title}> {title.slice(0, 15)} </Text>
          </View>
          <View style={styles.btnWrapper}>
            {!isInWatchList ? (
              <Button iconName="plus" title="My List" onPress={addToWatchList} />
            ) : (
              <Button
                iconName="check"
                title="My List"
                style={{ backgroundColor: 'green' }}
                onPress={removeFromWatchList}
              />
            )}
            <Button
              iconName="play"
              title="Watch Now"
              style={{ width: 160, backgroundColor: '#FE9F01' }}
              onPress={playNow}
            />
          </View>
        </LinearGradient>
      </View>
    </View>
  );
});

export default Slide;

const Button = memo(({ iconName, title, style, onPress }) => (
  <TouchableOpacity style={{ ...styles.btn, ...style }} onPress={onPress}>
    <Icon name={iconName} size={30} color={'#222'} />
    <Text
      style={{
        fontSize: normalize(16),
        padding: 4,
        fontFamily: 'CooperHewitt',
        color: '#222',
      }}
    >
      {title}
    </Text>
  </TouchableOpacity>
));

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    height: '30%',
    left: 0,
    width: '100%',
  },
  linearGradient: {
    flex: 1,
  },
  textWrapper: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: normalize(35),
    textAlign: 'center',
    fontWeight: '100',
    fontFamily: 'CooperHewitt',
    color: '#fff',
  },
  geners: {
    fontSize: normalize(16),
    fontWeight: '400',
    fontFamily: 'CooperHewitt',
    marginBottom: 5,
    color: '#fff',
  },
  btnWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    width: 130,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 15,
    backgroundColor: '#DDDCDD',
    borderRadius: 5,
    elevation: 3,
    color: '#222',
  },
});
