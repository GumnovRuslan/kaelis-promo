'use client'

import styles from './styles.module.scss';

import { useEffect, useRef, useState } from 'react';

const VideoCard = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [userPaused, setUserPaused] = useState(false);

  const handleVideoClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setUserPaused(false);
      } else {
        videoRef.current.pause();
        setUserPaused(true);
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      async (entries) => {
        for (const entry of entries) {
          try {
            if (entry.isIntersecting && !userPaused) {
              await video.play();
            } else {
              video.pause();
            }
          } catch (error) {
            console.log('Playback control error:', error);
          }
        }
      },
      {
        threshold: 0.6, // расстояние до попадание в зону видимости
        rootMargin: '0px'
      }
    );

    observer.observe(video);

    return () => observer.disconnect();
  }, [userPaused]);

  return (
    <div className={styles.card}>
      <video 
        playsInline
        loop
        muted
        ref={videoRef}
        onTouchEnd={handleVideoClick}
        className={styles.card__video}
        width="100%"
        controls={!userPaused}
      >
          <source src="/video/test_video.mp4" type="video/mp4" />
      </video>
    </div>
  )
}

export default VideoCard;