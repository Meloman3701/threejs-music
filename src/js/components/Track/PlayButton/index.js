import React, { memo } from 'react';
import gsap from 'gsap'
import styles from './style.module.scss';

const PlayButton = ({ progress, isPlaying, ...props }) => {
  const dashArray = 126;
  const dashOffset = gsap.utils.mapRange(0, 100, dashArray, 0, progress);

  return (
    <div className={styles.button} {...props}>
      <svg viewBox='22 22 44 44' className="circle">
        <circle
          strokeLinecap='round'
          cx='44'
          cy='44'
          r='20.2'
          stroke='#8E9096'
          strokeWidth='0.6'
          fill='none'
          strokeDasharray='126'
          strokeDashoffset='0'
          transform='rotate(-90) translate(-88 0)'
        />
        {progress && (
          <circle
            className='progress-circle'
            strokeLinecap='round'
            cx='44'
            cy='44'
            r='20.2'
            stroke='white'
            strokeWidth='2.5'
            fill='none'
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            transform='rotate(-90) translate(-88 0)'
          />
        )}
      </svg>
      <div className={styles.icon}>
        {isPlaying ? <i className="fas fa-pause" /> : <i className="fas fa-play" />}
      </div>
    </div>
  )
}

export default memo(PlayButton);
