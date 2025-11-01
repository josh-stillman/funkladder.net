import { s0, s1, s2, s3, o0, o1, o2, o3, src, osc, h } from './hydraInstance';
// export const h = new Hydra({ makeGlobal: false, detectAudio: false }).synth

function sleep(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const randomInt = (max: number) =>
   Math.floor((Math.random() * max + 1));


export const visualize = async ({ durationMS, operations, randomize = true }: { durationMS: number; operations: Array<() => void>; randomize?: boolean; }) => {
  const opDuration = durationMS / operations.length;

  //shuffle

  for (let i = 0; i < operations.length; i++) {

    const op = randomize ? randomInt(operations.length -1) : i;
    operations[op]();
    console.log("operation", operations[op].name)
    await sleep(opDuration);
  }

  enterDefaultState();

  // const i = 0;
  // const interval = setInterval(() => {
  //   operations[i]
  // }, opDuration)
}

export const enterDefaultState = () => {
  // run npx http-server --cors in /Documents
    s0.initImage("./kiss-my-patootie-lips.png")

    // render static picture
    src(s0).out(o1);

  // src(s0).out(o1)

    osc(3).out(o2)

    src(o1).modulate(o2).out(o0)
    // o0.smooth(0.5);

  //  h.osc().rotate().out();
}
