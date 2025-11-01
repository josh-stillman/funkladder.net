import Hydra from 'hydra-synth';

export const h = new Hydra({ makeGlobal: false, detectAudio: false }).synth
export const { s0, s1, s2, s3, o0, o1, o2, o3, src, osc } = h;

