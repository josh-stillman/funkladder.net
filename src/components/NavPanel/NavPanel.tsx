import './NavPanel.css';
import { SlControlPlay } from 'react-icons/sl';
import { RxStop } from 'react-icons/rx';
import { SlSocialSpotify, SlSocialInstagram } from 'react-icons/sl';
import type { SONGS } from '../../musicVideos/musicVideos';

interface Props {
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
  chooseSong: (song: SONGS) => void;
}

export const NavPanel = ({ play, stop, isPlaying, chooseSong }: Props) => {
  return (
    <section className="navPanel">
      <img
        className="logo"
        src="./funk.svg"
        onClick={() => chooseSong('patootie')}
      />

      <div className="controls">
        <button onClick={isPlaying ? stop : play}>
          {isPlaying ? <RxStop /> : <SlControlPlay />}
        </button>
      </div>

      <nav className="songSelector">
        <a href="#patootie" onClick={() => chooseSong('patootie')}>
          Patootie
        </a>
        <a href="#dorks" onClick={() => chooseSong('dorks')}>
          Dorks
        </a>
      </nav>

      <div className="socials">
        <a
          href="https://www.instagram.com/funk.ladder/"
          target="_blank"
          rel="noreferrer"
        >
          <SlSocialInstagram />
        </a>
        <a
          href="https://open.spotify.com/artist/3uxQGgaTo5T6pr9C3WosKt?si=ralvD-NYSKqFm3J70KqVug"
          target="_blank"
          rel="noreferrer"
        >
          <SlSocialSpotify />
        </a>
      </div>
    </section>
  );
};
