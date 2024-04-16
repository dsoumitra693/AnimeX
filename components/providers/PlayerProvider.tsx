import React, { useContext, useState } from 'react'

interface IPlayerContext {
    position: number; setPosition: (ms: number) => void;
    videoSource: string;
    setVideoSource: (url: string) => void;
    availableQuality: string[]
    setAvailableQuality: (qualityArr: string[]) => void;
    videoQuality: string;
    setVideoQuality: (quality: string) => void;

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
    const [videoSource, setVideoSource] = useState<string>("")
    const [videoQuality, setVideoQuality] = useState<string>("default")
    const [availableQuality, setAvailableQuality] = useState<string[]>([])

    return (
        <PlayerContext.Provider value={{ availableQuality, position, setAvailableQuality, setPosition, setVideoQuality, setVideoSource, videoQuality, videoSource }}>
            {children}
        </PlayerContext.Provider>
    )
}

export default PlayerProvider