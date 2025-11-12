import type { RefObject } from 'react';
import {
  s0,
  // s1,
  // s2,
  // s3,
  o0,
  o1,
  o2,
  o3,
  src,
  osc,
  h,
  noise,
  voronoi,
  shape,
  // render,
} from './hydraInstance';
import { randomInt, visualize } from './visualizer';

export const defaultVisualization = (
  abortRef: RefObject<{ [key: number]: boolean }>,
  invocation: number,
  durationSeconds: number,
  bpm: number
) => {
  h.bpm = bpm;

  const operations = [
    rotate,
    rotate2,
    waveSwirl,
    superTrippy,
    multipleImages,
    blobMild,
    blobWild,
    voronoi1,
    triangles,
    // renderMe,
    rotatingBar,
    rotatingSquare,
    spotlight,
    pixelate,
    trippyBigLips,
    rotatingTrippyBigLips,
    smallLips,
    repeatStretch,
    windowpane,
  ];

  return visualize({
    durationMS: durationSeconds * 1000,
    operations,
    abortRef,
    invocation,
    bpm,
  });
};

const randomSource = () => {
  const sources = [noise, voronoi, shape, osc];
  const randomSource = sources[randomInt(sources.length - 1)];
  return randomSource;
};

// bpm = 37.5
//setup

// // run npx http-server --cors in /Documents
// s0.initImage("http://localhost:8080/kiss-my-patootie-lips.png")

// // render static picture
// src(s0).out(o0)

// // waves
// src(s0).out(o1)

// osc(10).out(o2)

// src(o1).modulate(o2).out(o0)

// rotate it

const rotate = () => {
  src(s0).out(o1);
  osc(10).rotate().out(o2);
  src(o1).modulate(o2).out(o0);
};

// osc(10).rotate().out(o2)

const rotate2 = () => {
  src(s0).out(o1);
  osc(10).rotate(90).out(o2);
  src(o1).modulate(o2).out(o0);
};

// // rotate it again, swirly
// osc(10).rotate(90).out(o2)

const waveSwirl = () => {
  src(s0).out(o1);
  osc(2, -2).out(o2);
  src(o1).modulate(o2).out(o0);
};

// // waving back and forth
// osc(2, -2).out(o2)

// // super trippy
// osc(10).rotate(90).kaleid().out(o2)
const superTrippy = () => {
  src(s0).out(o1);
  osc(10).rotate(90).kaleid().out(o2);
  src(o1).modulate(o2).out(o0);
};

// // multiple images
// src(s0).repeat().out(o1)
const multipleImages = () => {
  src(s0).repeat().out(o1);
  osc(2, -2).out(o2);
  src(o1).modulate(o2).out(o0);
};

// // blobs mild
// noise(1).colorama().rotate(90).out(o2)
const blobMild = () => {
  src(s0).out(o1);
  noise(1).colorama().rotate(90).out(o2);
  src(o1).modulate(o2).out(o0);
};

// // blobs intense
// noise(2).colorama().rotate(90).out(o2)
const blobWild = () => {
  src(s0).out(o1);
  noise(2).colorama().rotate(90).out(o2);
  src(o1).modulate(o2).out(o0);
};

// // voronoi
// voronoi(3).out(o2)
const voronoi1 = () => {
  src(s0).out(o1);
  voronoi(3).out(o2);
  src(o1).modulate(o2).out(o0);
};

// // add triangles
// shape(3).repeat(3, 2).scrollX(0, 0.1).out(o3)
// src(o1).modulate(o2).modulate(o3).out(o0)
const triangles = () => {
  src(s0).out(o1);
  voronoi(3).out(o2);
  shape(3).repeat(3, 2).scrollX(0, 0.1).out(o3);
  src(o1).modulate(o2).modulate(o3).out(o0);
};

// // change color
// src(s0).color(-1, -1).out(o1)

// // show each output
// render()
// const renderMe = () => {
//   render();
// };

// // rotating bar in the middle
// osc(5).out(o2)
// src(o1).modulate(o2).diff(shape(2, 0.5).rotate(0, 0.1)).out(o0)
const rotatingBar = () => {
  src(s0).out(o1);
  osc(5).out(o2);
  src(o1).modulate(o2).diff(shape(2, 0.5).rotate(0, 0.1)).out(o0);
};
// // rotating square.
// src(o1).modulate(o2).diff(shape(4, 0.5).color(-1, -2).rotate(0, 0.1)).out(o0)
const rotatingSquare = () => {
  src(s0).out(o1);
  randomSource()(3).out(o2);
  src(o1).modulate(o2).diff(shape(4, 0.5).color(-1, -2).rotate(0, 0.1)).out(o0);
};

// // spotlight
// src(o1).modulate(o2).mult(shape(32, .5)).out(o0)
const spotlight = () => {
  src(s0).out(o1);
  randomSource()(3).out(o2);
  src(o1).modulate(o2).mult(shape(32, 0.5)).out(o0);
};

// // pixelate
// voronoi().pixelate(30, 30).out(o2)
const pixelate = () => {
  src(s0).out(o1);
  voronoi().pixelate(30, 30).out(o2);
  src(o1).modulate(o2).out(o0);
};

// // trippy big lips
// src(o1).modulateScale(osc(4)).out(o0)
const trippyBigLips = () => {
  src(s0).out(o1);
  randomSource()(randomInt(10)).out(o2);
  src(o1)
    .modulateScale(osc(randomInt(10)))
    .out(o0);
};

// // rotating trippy lips
// src(o1).modulateRotate(noise(1)).out(o0)

const rotatingTrippyBigLips = () => {
  src(s0).out(o1);
  randomSource()(randomInt(10)).out(o2);
  src(o1).modulateRotate(noise(1)).out(o0);
};

// // small lips
// src(o1).modulateScale(noise(1)).out(o0)
const smallLips = () => {
  src(s0).out(o1);
  randomSource()(randomInt(10)).out(o2);
  src(o1).modulateScale(noise(1)).out(o0);
};

// // repeat / stretch
// src(o1).modulateRepeat(noise(1)).out(o0)
const repeatStretch = () => {
  src(s0).out(o1);
  randomSource()(randomInt(10)).out(o2);
  src(o1).modulateRepeat(noise(1)).out(o0);
};

// // windowpane
// src(o1).modulateRepeat(noise(1)).mult(shape(4, .5).repeat().scrollX(2, .5).scrollY(2, .3)).out(o0)
const windowpane = () => {
  src(s0).out(o1);
  randomSource()(randomInt(10)).out(o2);
  src(o1)
    .modulateRepeat(noise(1))
    .mult(shape(4, 0.5).repeat().scrollX(2, 0.5).scrollY(2, 0.3))
    .out(o0);
};
