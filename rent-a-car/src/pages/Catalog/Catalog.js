import CatalogItem from "../../components/CatalogItem/CatalogItem";
import "./Catalog.Module.css";

const Catalog = () => {
    return (
        <section id="catalog-page">
            <h3 className="no-articles">No cars yet</h3>
        </section>
    );
};

export default Catalog;

/*<h1>Available Cars</h1>
            {cars
                ? cars.map(x => <CatalogItem key={x.id} car={x} />)
                : <h3 className="no-articles">No cars yet</h3>
            }*/