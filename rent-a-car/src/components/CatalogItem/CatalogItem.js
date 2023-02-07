import { Link } from 'react-router-dom';
import "./CatalogItem.Module.css";

const CatalogItem = ({ car }) => {
    
    return (
        <div className="allCars">
            <div className="allCars-info">
                <img src={car.imageUrl} alt="carImage"/>
                <h2>{car.make}  {car.model} {car.makeYear}</h2>
                <h4>Category: {car.categoryName}</h4>
                <Link to={`/catalog/${car.id}`} className="details-button">
                    Details
                </Link>
            </div>
        </div>
    );
};

export default CatalogItem;