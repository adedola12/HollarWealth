import React from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import Band from "../components/Band";
import Brand from "../components/Brand";
import Delivery from "../components/Delivery";
import Offer from "../components/Offer";
import Testimony from "../components/Testimony";
import Subscribe from "../components/Subscribe";
import Blog from "../components/Blog";
import Footer from "../components/Footer";
import Reveal from "../components/motion/Reveal";

const Home = () => {
  return (
    <div>
      <Hero />
      <Reveal>
        <Band />
      </Reveal>
      <Reveal>
        <LatestCollection />
      </Reveal>
      <Reveal>
        <Brand />
      </Reveal>
      <Reveal>
        <BestSeller />
      </Reveal>
      <Reveal>
        <Delivery />
      </Reveal>
      <Reveal>
        <Offer />
      </Reveal>
      <Reveal>
        <Testimony />
      </Reveal>
      <Reveal>
        <Subscribe />
      </Reveal>
      <Reveal>
        <Blog />
      </Reveal>
      <Footer />
    </div>
  );
};

export default Home;
