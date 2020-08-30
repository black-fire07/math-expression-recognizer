import React, {useRef, useState,useEffect} from 'react';
import './App.css';
import CanvasDraw from "react-canvas-draw";
import Histogram from 'react-chart-histogram';

function App() {

  const firstcan = useRef(null)
  const contextref = useRef(null)
  const[isdraw,setdraw] = useState(false)

  useEffect(() => {
    const canvas = firstcan.current;
    canvas.width = window.innerWidth*0.2;
    canvas.height = window.innerHeight*0.4;

    const context = canvas.getContext('2d')
    context.strokeStyle = 'black'
    context.lineWidth = 5
    contextref.current = context;
  },[])

  const start = ({nativeEvent}) =>{
    const {offsetX,offsetY} = nativeEvent;
    contextref.current.beginPath()
    contextref.current.moveTo(offsetX,offsetY)
    setdraw(true)
  }
  const draw =({nativeEvent}) => {
    if(!isdraw){
      return
    }
    const{offsetX,offsetY} = nativeEvent;
    contextref.current.lineTo(offsetX,offsetY)
    contextref.current.stroke()
  } 
  const finish =() =>{
    contextref.current.closePath()
    setdraw(false)
  }
  const clear = () => {
    //firstcan.current.attributes.width = firstcan.current.attributes.width
    contextref.current.clearRect(0, 0, contextref.current.canvas.width,contextref.current.canvas.height);
  }
  const labels = ['0','1', '2', '3','4','5','6','7','8','9'];
  const data = [0,0,10,20,89,4];
 // const max = [100];
  const options = { fillColor: 'Blue', strokeColor: '#0000FF', yAxes:'100' };
  console.log(Histogram)
  return (
    <div className='out'>
    <div className='in'>
      <div className='design'>
      {/* <button onClick={handleclick}>save</button>
      <CanvasDraw/>
      <button onClick={clear}>clear</button> */}
      <canvas
      className = 'can'
      onMouseDown={start}
      onMouseMove={draw}
      onMouseUp={finish}
      ref={firstcan}/>
      
      <button className='button' onClick={clear}>clear</button>
      <br></br>
      <div className='hist'>
      <Histogram
      xLabels={labels}
      yValues={data}
      width='400'
      height='200'
      options={options}
      />
      </div>
      </div>
    </div>
    </div>
  );
}

export default App;
