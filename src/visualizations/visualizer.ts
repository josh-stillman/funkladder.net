import type { RefObject } from 'react';
import {
  s0,
  /*s1, s2, s3,*/
  o0,
  o1,
  o2,
  // o3,
  src,
  osc,
  h,
} from './hydraInstance';
import { MUSIC_VIDEOS } from '../musicVideos/musicVideos';

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const randomInt = (max: number) => Math.floor(Math.random() * (max + 1));

export const randomSignedInt = (absMax: number) =>
  randomInt(absMax) * (Math.round(Math.random()) ? 1 : -1);

export const visualize = async ({
  abortRef,
  invocation,
  durationMS,
  operations,
  bpm,
  randomize = true,
}: {
  abortRef: RefObject<{ [key: number]: boolean }>;
  invocation: number;
  durationMS: number;
  operations: Array<() => void>;
  randomize?: boolean;
  bpm: number;
}) => {
  const beatDurationSeconds = 60 / bpm;
  const measure = beatDurationSeconds * 4;

  h.bpm = bpm;

  const opDuration = measure * 2 * 1000;

  const turns = Math.round(durationMS / opDuration);

  // shuffle
  for (let i = 0; i < turns; i++) {
    if (abortRef.current[invocation]) {
      break;
    }
    const op = randomize ? randomInt(operations.length - 1) : i;
    operations[op]();
    console.log('operation', operations[op].name);
    await sleep(opDuration);
  }

  enterDefaultState();
  // set is playing to false.
};

export const loadImageS0 = (image: string) => {
  s0.initImage(image);
};

export const enterDefaultState = (image = MUSIC_VIDEOS.patootie.imageFile) => {
  loadImageS0(image);

  src(s0).out(o1);
  osc(3).out(o2);

  src(o1).modulate(o2).out(o0);
};
