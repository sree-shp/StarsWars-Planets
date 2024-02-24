/* eslint-disable react/prop-types */
import "./Loading.css";
import ReactLoading from "react-loading";

function Loading() {
  return (
    <div className="loading">
      <div className="loading-heading-container">
        <h1 className="home-heading">Starwars</h1>
        <ReactLoading type="spin" color="#fbeb04" height={50} width={50} />
      </div>
    </div>
  );
}

export default Loading;
