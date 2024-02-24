/* eslint-disable react/prop-types */
import "./ResidentCard.css";

function ResidentCard({ name, gender, height, mass }) {
  return (
    <div className="resident-card">
      <div className="resident-name">{name}</div>
      <div className="resident-gender">{gender}</div>
      <div className="resident-height">
        <div className="">{height}</div>
        <div>Height</div>
      </div>
      <div className="resident-mass">
        <div className="">{mass}</div>
        <div>Mass</div>
      </div>
    </div>
  );
}

export default ResidentCard;
