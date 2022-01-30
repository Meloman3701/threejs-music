import React, { memo, useCallback, useEffect, useRef, useState } from 'react';
import styles from './style.module.scss';
import PlayButton from './PlayButton';
import gsap from 'gsap';
import WaveSurfer from 'wavesurfer';
import _ from 'lodash';

const Track = ({ onProgressChange, onPlayChange, data, playing }) => {
  const [progress, setProgress] = useState(0);
  const wavesurfer = useRef();

  useEffect(() => {
    wavesurfer.current = WaveSurfer.create({
      container: document.querySelector('#wave'),
      backend: 'MediaElement',
      height: 0
    });

    wavesurfer.current.load(data.url);

    wavesurfer.current.on('audioprocess', _.throttle(onProgress, 100));
  }, []);

  useEffect(() => {
    !playing && wavesurfer.current.pause()
  }, [playing])

  const onClickHandler = useCallback(() => {
    playing ? wavesurfer.current.pause() : wavesurfer.current.play()
    onPlayChange(playing ? null : data.url);
  }, [playing]);

  const onProgress = useCallback(pos => {
    const duration = wavesurfer.current.backend.buffer?.duration || 0;
    const peaks = wavesurfer.current.backend.mergedPeaks || [];
    const peakIndex = Math.round(gsap.utils.mapRange(0, duration, 0, peaks.length, pos));
    const progress = gsap.utils.mapRange(0, duration, 0, 100, pos);
    setProgress(progress);
    onProgressChange(peaks[peakIndex]);
  })

  return (
    <div className={styles.item}>
      <div>
        <PlayButton progress={progress} isPlaying={playing} onClick={onClickHandler} />
      </div>
      <div>
        <div>{data.title}</div>
        <div className={styles.name}>{data.band}</div>
      </div>
    </div>
  )
}

export default memo(Track);
