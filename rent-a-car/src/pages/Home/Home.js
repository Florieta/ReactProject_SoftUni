import ProductHero from "../../components/ProductHero/ProdustHero";
import * as React from 'react';
import withRoot from "../../withRoot";
import ProductValues from "../../components/ProductHero/ProductValues";
import ProductCategories from "../../components/ProductHero/ProductCategories";
import ProductHowItWorks from "../../components/ProductHero/ProductHowItWorks";

const Home = () => {
    return (
        <div>

            <ProductHero />
            <ProductValues />
            <ProductCategories />
            <ProductHowItWorks />

        </div>
    )
}

export default withRoot(Home);