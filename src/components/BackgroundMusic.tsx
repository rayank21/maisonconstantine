import { useEffect, useRef } from 'react';

declare global {
    interface Window {
        onYouTubeIframeAPIReady: () => void;
        YT: any;
    }
}

interface BackgroundMusicProps {
    videoId: string;
    isMuted: boolean;
    volume: number; // 0-100
}

export const BackgroundMusic = ({ videoId, isMuted, volume }: BackgroundMusicProps) => {
    const playerRef = useRef<any>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Load YouTube IFrame API
        if (!window.YT) {
            const tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);
        }

        window.onYouTubeIframeAPIReady = () => {
            playerRef.current = new window.YT.Player(containerRef.current, {
                height: '0',
                width: '0',
                videoId: videoId,
                playerVars: {
                    'playsinline': 1,
                    'controls': 0,
                    'loop': 1,
                    'playlist': videoId,
                    'enablejsapi': 1,
                },
                events: {
                    'onReady': onPlayerReady,
                }
            });
        };

        // If API is already loaded (navigating back/forth)
        if (window.YT && window.YT.Player) {
            window.onYouTubeIframeAPIReady();
        }

        return () => {
            if (playerRef.current) {
                playerRef.current.destroy();
            }
        }
    }, [videoId]);

    const onPlayerReady = (event: any) => {
        event.target.setVolume(volume);
        if (isMuted) {
            event.target.mute();
        } else {
            event.target.unMute();
        }
        event.target.playVideo();
    };

    // Sync props with player
    useEffect(() => {
        if (playerRef.current && playerRef.current.setVolume) {
            playerRef.current.setVolume(volume);
            if (isMuted) {
                playerRef.current.mute();
            } else {
                playerRef.current.unMute();
                // Ensure it's playing if we unmute
                if (playerRef.current.getPlayerState() !== 1) { // 1 = playing
                    playerRef.current.playVideo();
                }
            }
        }
    }, [isMuted, volume]);

    return <div ref={containerRef} style={{ display: 'none' }} />;
};
