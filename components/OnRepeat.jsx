import { useEffect, useRef, useState } from "react";
import { onRepeat } from "../content/portfolio";

const BARS = 5;
const LEVELS = 6;
const RING = 2 * Math.PI * 34;

const formatTime = (seconds) => `0:${String(Math.floor(seconds)).padStart(2, "0")}`;

// A custom mini player for the song's 30-second preview. The equalizer reads the real audio through the Web Audio API.
const OnRepeat = () => {
  const audioRef = useRef(null);
  const barsRef = useRef([]);
  const audioGraph = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(30);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    if (!playing || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const { analyser } = audioGraph.current;
    const bars = barsRef.current;
    const data = new Uint8Array(analyser.frequencyBinCount);
    let frame;
    const draw = () => {
      analyser.getByteFrequencyData(data);
      const band = Math.floor(data.length * 0.6 / BARS);
      bars.forEach((bar, index) => {
        let sum = 0;
        for (let i = index * band; i < (index + 1) * band; i += 1) sum += data[i];
        const level = Math.max(1, Math.round((sum / band / 255) * LEVELS * 1.3));
        bar.style.setProperty("--level", Math.min(LEVELS, level));
      });
      frame = requestAnimationFrame(draw);
    };
    frame = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(frame);
      bars.forEach((bar) => bar.style.setProperty("--level", 1));
    };
  }, [playing]);

  const toggle = async () => {
    const audio = audioRef.current;
    if (!audioGraph.current) {
      const context = new AudioContext();
      const analyser = context.createAnalyser();
      analyser.fftSize = 64;
      context.createMediaElementSource(audio).connect(analyser);
      analyser.connect(context.destination);
      audioGraph.current = { context, analyser };
    }
    await audioGraph.current.context.resume();
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setFailed(true);
      }
    } else {
      audio.pause();
    }
  };

  const progress = duration ? time / duration : 0;

  return <div className={playing ? "player is-playing" : "player"}>
    <audio
      ref={audioRef}
      src={onRepeat.previewUrl}
      preload="none"
      crossOrigin="anonymous"
      onPlay={() => setPlaying(true)}
      onPause={() => setPlaying(false)}
      onEnded={() => setTime(0)}
      onTimeUpdate={(event) => setTime(event.currentTarget.currentTime)}
      onLoadedMetadata={(event) => setDuration(event.currentTarget.duration)}
      onError={() => setFailed(true)}
    />

    <div className="player-disc" aria-hidden="true">
      <svg viewBox="0 0 72 72">
        <circle cx="36" cy="36" r="34" className="player-ring-track" />
        <circle cx="36" cy="36" r="34" className="player-ring" strokeDasharray={RING} strokeDashoffset={RING * (1 - progress)} />
      </svg>
      <span className="player-vinyl"><img src={onRepeat.artworkUrl} alt="" width="200" height="200" loading="lazy" /></span>
    </div>

    <div className="player-text">
      <span className="player-label">On repeat</span>
      <strong>{onRepeat.title}</strong>
      <span>{onRepeat.artist}</span>
      <span className="player-meta">
        {failed ? "Preview unavailable" : `${formatTime(time)} / ${formatTime(duration)}`} · <a href={onRepeat.spotifyUrl} target="_blank" rel="noreferrer">Full song ↗</a>
      </span>
    </div>

    <div className="player-eq" aria-hidden="true">
      {Array.from({ length: BARS }, (_, index) => <i key={index} ref={(element) => { barsRef.current[index] = element; }} />)}
    </div>

    <button type="button" className="player-button" onClick={toggle} disabled={failed} aria-label={playing ? `Pause ${onRepeat.title}` : `Play a preview of ${onRepeat.title} by ${onRepeat.artist}`}>
      {playing ? "❚❚" : "▶"}
    </button>
  </div>;
};

export default OnRepeat;
