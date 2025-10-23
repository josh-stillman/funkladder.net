import { createRef, useEffect } from 'react'
import PWABadge from './PWABadge.tsx'
import './App.css'
import Hydra from 'hydra-synth';

const h = new Hydra({ makeGlobal: false, detectAudio: false }).synth


function App() {

  const canvasRef = createRef<HTMLCanvasElement>();

  useEffect(() => {
   h.osc().rotate().out();
  }, [])

  return (
    <>
    {/* <h1>hello</h1> */}
    <div className='app-container'>


    <canvas ref={canvasRef}/>
      <PWABadge />
          </div>
    </>
  )
}

export default App
