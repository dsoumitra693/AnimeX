import { IEpisodeInfo } from '@/types';
import React, { useContext, useState } from 'react'

interface IPlayerContext {
    position: number; setPosition: (ms: number) => void;
    videoSource: string;
    setVideoSource: (url: string) => void;
    videoPoster: string;
    setVideoPoster: (url: string) => void;
    availableQuality: string[]
    setAvailableQuality: (qualityArr: string[]) => void;
    videoQuality: string;
    setVideoQuality: (quality: string) => void;
    currentEpisoide: IEpisodeInfo
    setCurrentEpisoide: (episodes: IEpisodeInfo) => void
    availableEpisoide: IEpisodeInfo[]
    setAvailableEpisoide: (episodesArr: IEpisodeInfo[]) => void;
    color:string;
    setColor:(color:string)=>void
}

interface PlayerProviderProps {
    children: React.ReactNode;
}

export const usePlayer = () => {
    const context = useContext(PlayerContext);
    if (!context) {
        throw new Error("usePeopleContext must be used within a PeopleProvider");
    }
    return context;
};

const PlayerContext = React.createContext<IPlayerContext | null>(null);

const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
    const [position, setPosition] = useState<number>(0)
    const [color, setColor] = useState("#000")
    const [videoSource, setVideoSource] = useState<string>("")
    const [videoPoster, setVideoPoster] = useState<string>("")
    const [videoQuality, setVideoQuality] = useState<string>("default")
    const [availableQuality, setAvailableQuality] = useState<string[]>([])
    const [currentEpisoide, setCurrentEpisoide] = useState<IEpisodeInfo>({
        airDate: 0,
        description: "",
        image: "",
        imageHash: "",
        number: 0,
        id: "",
        title: ""
    })
    const [availableEpisoide, setAvailableEpisoide] = useState<IEpisodeInfo[]>([])

    return (
        <PlayerContext.Provider value={{ color, setColor, videoPoster, setVideoPoster,currentEpisoide, setCurrentEpisoide, availableEpisoide, setAvailableEpisoide, availableQuality, position, setAvailableQuality, setPosition, setVideoQuality, setVideoSource, videoQuality, videoSource }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider