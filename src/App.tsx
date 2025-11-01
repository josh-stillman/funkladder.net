import { createRef, useEffect } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'
import { enterDefaultState } from './visualizations/visualizer.ts'
import { kissMyPatootieVisualization } from './visualizations/kissMyPatootie.ts'
import audio from '../public/patootie.m4a';

// const h = new Hydra({ makeGlobal: false, detectAudio: false }).synth


function App() {

  const startPatootie = () => {
    new Audio(audio).play();
    kissMyPatootieVisualization();
  }

  // const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
   enterDefaultState();
  }, [])

  return (
    <>
    <div className='app-container'>
    <audio/>
    <button className="play-button" onClick={startPatootie}>play</button>


    {/* <canvas ref={canvasRef}/> */}
      <PWABadge />
          </div>
    </>
  )
}

export default App
