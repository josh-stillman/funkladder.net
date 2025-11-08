import type { RefObject } from 'react';
import { s0, s1, s2, s3, o0, o1, o2, o3, src, osc, h } from './hydraInstance';
// export const h = new Hydra({ makeGlobal: false, detectAudio: false }).synth

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const randomInt = (max: number) => Math.floor(Math.random() * (max + 1));

export const randomSignedInt = (absMax: number) =>
  randomInt(absMax) * (Math.round(Math.random()) ? 1 : -1);

export const visualize = async ({
  abortRef,
  durationMS,
  operations,
  randomize = true,
}: {
  abortRef: RefObject<boolean>;
  durationMS: number;
  operations: Array<() => void>;
  randomize?: boolean;
}) => {
  const opDuration = durationMS / operations.length;

  console.log({ opDuration, durationMS, operations: operations.length });

  while (!abortRef.current && operations.length) {
    const i = randomInt(operations.length - 1);
    operations[i]();
    console.log('operation', operations[i].name);
    operations.splice(i, 1);
    await sleep(opDuration);
  } // revert to pickign random ones?

  enterDefaultState();
  // set is playing to false.
};

export const enterDefaultState = () => {
  s0.initImage('./kiss-my-patootie-lips.png');

  // render static picture
  src(s0).out(o1);
  osc(3).out(o2);

  src(o1).modulate(o2).out(o0);
};
