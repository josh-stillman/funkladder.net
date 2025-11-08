import './NavPanel.css';

interface Props {
  play: () => void;
  stop: () => void;
  isPlaying: boolean;
}
export const NavPanel = ({ play, stop, isPlaying }: Props) => {
  return (
    <section className="navPanel">
      <div>nav section</div>
      <div>controls section</div>
      <button onClick={isPlaying ? stop : play}>
        {isPlaying ? 'Stop' : 'Play'}
      </button>
    </section>
  );
};
