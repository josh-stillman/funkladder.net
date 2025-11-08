import type { RefObject } from 'react';
import { kissMyPatootieVisualization } from '../visualizations/kissMyPatootie';
import patootie from '/patootie.m4a';

export interface MusicVideo {
  name: string;
  spotifyLink?: string;
  audioFile: string; // todo: update
  lengthSeconds: number;
  bpm: number;
  visualization: (
    abortRef: RefObject<boolean>,
    durationSeconds?: number,
    bpm?: number
  ) => void;
}

export const MUSIC_VIDEOS: { [key: string]: MusicVideo } = {
  patootie: {
    name: 'Kiss My Patootie',
    spotifyLink:
      'https://open.spotify.com/track/1v3icDfIs96cv1EEOMALCT?si=d8d2599f571c489fs',
    audioFile: patootie,
    lengthSeconds: 2 * 60 + 42,
    bpm: 139,
    visualization: kissMyPatootieVisualization,
  },
  // dorks: {
  //   name: 'The Happening Dorks',
  //   spotifyLink:
  //     'https://open.spotify.com/track/1Yn5mgyl7q8eY1kRcW40KJ?si=a6efecd3aa5b4776',
  // },
};
