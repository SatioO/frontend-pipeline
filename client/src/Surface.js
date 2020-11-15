import Credits from './Credits';
import Friends from './modules/Friends';

function Surface() {
  return (
    <div className="container">
      <div className="card">
        <Friends />
      </div>
      <Credits />
    </div>
  );
}

export default Surface;
