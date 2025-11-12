import { useCallback, useEffect, useRef, useState } from 'react';
import PWABadge from './PWABadge.tsx';
import './App.css';
import { enterDefaultState } from './visualizations/visualizer.ts';

import { NavPanel } from './components/NavPanel/NavPanel.tsx';
import {
  MUSIC_VIDEOS,
  type MusicVideo,
  type SONGS,
} from './musicVideos/musicVideos.ts';

function App() {
  const [selectedMusicVideo, setSelectedMusicVideo] = useState<MusicVideo>(
    window.location.hash === '#dorks'
      ? MUSIC_VIDEOS.dorks
      : MUSIC_VIDEOS.patootie
  );

  const chooseSong = (song: SONGS) => {
    const video = MUSIC_VIDEOS[song];
    setSelectedMusicVideo(video);
    stopAudio();

    // load audio
    setCanPlay(false);
    if (audioRef.current) {
      audioRef.current.src = video.audioFile;
    }

    enterDefaultState(video.imageFile);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [showNavPanel, setShowNavPanel] = useState(true);
  const [canPlay, setCanPlay] = useState(false);
  const abortRef = useRef<{ [key: number]: boolean }>({ 0: false });

  const [invocation, setInvocation] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.src = selectedMusicVideo.audioFile;
      audioRef.current.play();
    }

    setIsPlaying(true);

    const currentInvocation = invocation + 1;
    setInvocation(currentInvocation);

    abortRef.current = { ...abortRef.current, [invocation]: false };

    selectedMusicVideo.visualization(
      abortRef,
      currentInvocation,
      selectedMusicVideo.lengthSeconds,
      selectedMusicVideo.bpm
    );
  }, [abortRef, audioRef, selectedMusicVideo, invocation, setInvocation]);

  const stopAudio = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    abortRef.current = { ...abortRef.current, [invocation]: true };
  }, [audioRef, abortRef, invocation]);

  const stop = useCallback(() => {
    stopAudio();
    enterDefaultState(selectedMusicVideo.imageFile);
  }, [selectedMusicVideo, stopAudio]);

  useEffect(() => {
    enterDefaultState(selectedMusicVideo.imageFile);

    // load audio
    if (audioRef.current) {
      audioRef.current.src = selectedMusicVideo.audioFile;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cinema mode on press space bar
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === ' ') {
        if (isPlaying) {
          stop();
          setShowNavPanel(true);
        } else {
          setShowNavPanel(false);
          play();
        }
        event.preventDefault();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isPlaying, stop, play]);

  useEffect(() => {
    const handleSongEnded = () => {
      enterDefaultState(selectedMusicVideo.imageFile);
      setIsPlaying(false);
    };

    audioRef.current?.addEventListener('ended', handleSongEnded);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current?.removeEventListener('ended', handleSongEnded);
    };
  }, [audioRef, selectedMusicVideo]);

  useEffect(() => {
    const handleCanPlay = () => {
      console.log('canplay', selectedMusicVideo);
      setCanPlay(true);
    };

    audioRef.current?.addEventListener('canplay', handleCanPlay);

    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      audioRef.current?.removeEventListener('canplay', handleCanPlay);
    };
  }, [audioRef, selectedMusicVideo]);

  return (
    <>
      <div className="app-container">
        {showNavPanel && (
          <NavPanel
            play={play}
            stop={stop}
            isPlaying={isPlaying}
            chooseSong={chooseSong}
            canPlay={canPlay}
          />
        )}
        <audio ref={audioRef} />
        <PWABadge />
      </div>
    </>
  );
}

export default App;
