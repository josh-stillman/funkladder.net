import { useEffect, useRef, useState } from 'react';
import PWABadge from './PWABadge.tsx';
import './App.css';
import { enterDefaultState } from './visualizations/visualizer.ts';

import { NavPanel } from './components/NavPanel/NavPanel.tsx';
import { MUSIC_VIDEOS, type MusicVideo } from './musicVideos/musicVideos.ts';

// const h = new Hydra({ makeGlobal: false, detectAudio: false }).synth

function App() {
  const [selectedMusicVideo, setSelectedMusicVideo] = useState<MusicVideo>(
    MUSIC_VIDEOS.patootie
  );

  const [isPlaying, setIsPlaying] = useState(false);
  const abortRef = useRef(false);

  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    if (audioRef.current) {
      audioRef.current.src = selectedMusicVideo.audioFile;
      audioRef.current.play();
    }

    setIsPlaying(true);
    abortRef.current = false;
    selectedMusicVideo.visualization(
      abortRef,
      selectedMusicVideo.lengthSeconds,
      selectedMusicVideo.bpm
    );
  };

  const stop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }

    setIsPlaying(false);
    abortRef.current = true;

    enterDefaultState();
  };

  useEffect(() => {
    enterDefaultState();
  }, []);

  return (
    <>
      <div className="app-container">
        <NavPanel play={play} stop={stop} isPlaying={isPlaying} />
        <audio ref={audioRef} />
        <PWABadge />
      </div>
    </>
  );
}

export default App;
