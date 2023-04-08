import { Link } from "react-router-dom";
import error from '../../assets/error.jpg'
import "./Error.Module.css";

const ErrorPage = ({
    children
}) => {
    return (
        <section id="catalog-page" className="error-page">
            <h1 className="title">Error 404</h1>
            <img className="image" src={error} alt="error" />
            <p>Oops! The page you are looking for could not be found.</p>
            <div className='link'>
            <Link to='/'>Back to the homepage...</Link>
            {children && <p className="no-articles">{children}</p>}
            </div>
        </section>
    );
}

export default ErrorPage;