import React from "react";
import Section from "components/Section/Section";
import Title from "components/Title/Title";
import headerImage from "assets/header_image.png";
import profitsImage from "assets/profits.png";
import Footer from "components/Footer/Footer";
import Header from "components/Header/Header";

const WebsiteView = () => (
    <>
        <Section url={headerImage}>
          <Header />
          <Title tag="h2" orange>Hello there</Title>
        </Section>
        <Section id="about" dark>

        </Section>
        <Section id="demo">

        </Section>
        <Section id="profits" url={profitsImage}>

        </Section>
        <Section id="contact" dark>

        </Section>
        <Footer />
    </>
);

export default WebsiteView;