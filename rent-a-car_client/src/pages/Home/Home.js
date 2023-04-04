import * as React from 'react';
import HomeCard from "../../components/HomeElements/HomeCard";
import HomeValues from "../../components/HomeElements/HomeValues";
import HomeCategories from "../../components/HomeElements/HomeCategories";
import HomeHowItWorks from "../../components/HomeElements/HomeHowItWorks";
import withRoot from "../../withRoot";

const Home = () => {
    return (
        <div>

            <HomeCard />
            <HomeValues />
            <HomeCategories />
            <HomeHowItWorks />

        </div>
    )
}

export default withRoot(Home);