import WaveSurfer from 'wavesurfer';
import gsap from 'gsap';
import _ from 'lodash';

// export default function(url) {
//   const wavesurfer = WaveSurfer.create({
//     container: document.querySelector('#wave'),
//     backend: 'MediaElement',
//     height: 0
//   });

//   wavesurfer.load(url);

//   const onProgressHandler = callback => {
//     function onProgress(pos) {
//       const duration = wavesurfer.backend.buffer?.duration || 0;
//       const peaks = wavesurfer.backend.mergedPeaks || [];
//       const peakIndex = Math.round(gsap.utils.mapRange(0, duration, 0, peaks.length, pos));
//       const progress = gsap.utils.mapRange(0, duration, 0, 100, pos);
  
//       callback(progress, peaks[peakIndex]);
//     }

//     return wavesurfer.on('audioprocess', _.throttle(onProgress, 100));
//   }

//   return {
//     wavesurfer: wavesurfer,
//     onProgress: onProgressHandler
//   }
// }

// const wavesurfer = WaveSurfer.create({
//   container: document.querySelector('#wave'),
//   backend: 'MediaElement',
// });

// wavesurfer.load('./32215.mp3');

// export const load = url => wavesurfer.load(url);
// export const play = () => wavesurfer.play();
// export const pause = () => wavesurfer.pause();
// export const toggle = () => wavesurfer.isPlaying() ? pause() : play();

// export const onProgress = callback => {
//   wavesurfer.on('audioprocess', _.throttle(onProgress, 100));

//   function onProgress(pos) {
//     const duration = wavesurfer.backend.buffer?.duration || 0;
//     const peaks = wavesurfer.backend.mergedPeaks || [];
//     const peakIndex = Math.round(gsap.utils.mapRange(0, duration, 0, peaks.length, pos));
//     const progress = gsap.utils.mapRange(0, duration, 0, 100, pos);

//     callback(progress, peaks[peakIndex]);
//   }
// }
