import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import Track from '../Track';
import createObject from '../../plane';

const App = () => {
  const [active, setActive] = useState();
  const planeObject = useRef();

  const items = [
    {
      url: './linkin_park.mp3',
      band: 'Linkin Park',
      title: 'Numb'
    },
    {
      url: './manson.mp3',
      band: 'Marilyn Manson',
      title: 'Running To The Edge Of The World'
    },
    {
      url: './jackson.mp3',
      band: 'Matty Carter + Ariel',
      title: "They Don't Care About Us"
    },
    {
      url: './eminem.mp3',
      band: 'Eminem, Dido',
      title: "Stan"
    },
    {
      url: './MEMORIES.mp3',
      band: 'MEMORIES!',
      title: "347aidan"
    },
  ]

  useEffect(() => {
    const canvas = document.querySelector('canvas.webgl');
    planeObject.current = createObject(canvas);
  }, []);

  const updateScale = useCallback(peak => {
    if (peak < 0) return;

    const scale = gsap.utils.mapRange(0, 1, 0.2, 0.7, peak);
  
    gsap
      .timeline()
      .to(planeObject.current.material, { displacementScale: scale, duration: 0.1 })
      .to(planeObject.current.material, { displacementScale: 0.4, duration: 1 });
  }, []);

  const onPlayChange = useCallback((url) => {
    setActive(url)
  }, []);

  return (
    <div>
      {items.map(item => (
        <Track
          key={item.url}
          data={item}
          playing={item.url == active}
          onProgressChange={updateScale}
          onPlayChange={onPlayChange}
        />
      ))}
    </div>
  )
}

export default memo(App);
