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
    stop();
    enterDefaultState(video.imageFile);
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [showNavPanel, setShowNavPanel] = useState(true);
  const abortRef = useRef<{ [key: number]: boolean }>({ 0: false });

  const [invocation, setInvocation] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.src = selectedMusicVideo.audioFile;
      audioRef.current.play();
    }

    setIsPlaying(true);
    // increment invocation;
    setInvocation(i => i++);
    abortRef.current = { ...abortRef.current, [invocation]: false };

    selectedMusicVideo.visualization(
      abortRef,
      invocation,
      selectedMusicVideo.lengthSeconds,
      selectedMusicVideo.bpm
    );
  }, [abortRef, audioRef, selectedMusicVideo, invocation]);

  const stop = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    abortRef.current = { ...abortRef.current, [invocation]: true };
    //

    enterDefaultState(selectedMusicVideo.imageFile);
  }, [audioRef, abortRef, selectedMusicVideo, invocation]);

  useEffect(() => {
    enterDefaultState(selectedMusicVideo.imageFile);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // cinema mode on press
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

  return (
    <>
      <div className="app-container">
        {showNavPanel && (
          <NavPanel
            play={play}
            stop={stop}
            isPlaying={isPlaying}
            chooseSong={chooseSong}
          />
        )}
        <audio ref={audioRef} />
        <PWABadge />
      </div>
    </>
  );
}

export default App;
