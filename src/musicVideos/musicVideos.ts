import type { RefObject } from 'react';
import { defaultVisualization } from '../visualizations/kissMyPatootie';
import patootie from '/Funk Ladder - Kiss My Patootie.m4a';
import dorks from '/Funk Ladder - The Happening Dorks.m4a';
import patootieImage from '/kiss-my-patootie-lips.png';
import dorksImage from '/dorks-processed.png';

export interface MusicVideo {
  name: string;
  spotifyLink?: string;
  audioFile: string;
  imageFile: string;
  lengthSeconds: number;
  bpm: number;
  visualization: (
    abortRef: RefObject<{ [key: number]: boolean }>,
    invocation: number,
    durationSeconds: number,
    bpm: number
  ) => void;
}

export type SONGS = 'patootie' | 'dorks';

export const MUSIC_VIDEOS: { [key in SONGS]: MusicVideo } = {
  patootie: {
    name: 'Kiss My Patootie',
    spotifyLink:
      'https://open.spotify.com/track/1v3icDfIs96cv1EEOMALCT?si=d8d2599f571c489fs',
    audioFile: patootie,
    lengthSeconds: 2 * 60 + 42,
    bpm: 139,
    visualization: defaultVisualization,
    imageFile: patootieImage,
  },
  dorks: {
    name: 'The Happening Dorks',
    bpm: 103,
    lengthSeconds: 3 * 60 + 44,
    audioFile: dorks,
    visualization: defaultVisualization,
    spotifyLink:
      'https://open.spotify.com/track/1Yn5mgyl7q8eY1kRcW40KJ?si=a6efecd3aa5b4776',
    imageFile: dorksImage,
  },
};
