import IProduct from "../models/IProduct";

function Card({ props }: IProduct) {
  return (
    <div className="card h-100" style={{ width: "18rem" }}>
      <img src={props.imageUrl} className="card-img-top card-image" alt="..." />
      <div className="card-body">
        <h5 className="card-title">{props.name}</h5>
        <p className="card-text">{props.description}</p>
        <a href="#" className="btn btn-primary btn-card">
          Купити
        </a>
      </div>
    </div>
  );
}
export default Card;
