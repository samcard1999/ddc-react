import React from "react";

const About = () => {
  return (
    <section id="about" className="card-test about-section bg-mid-white">
      <div className="about-section-container">
        <div className="about-section-info">
          <h3>Who are we?</h3>
          <p>
            At DDC Developments, we are dedicated to transforming the
            construction industry with a strong commitment to environmental
            responsibility. By leveraging cutting-edge technologies like our
            <b>
              <i>modular systems</i>
            </b>
            , we deliver innovative and sustainable solutions that redefine
            efficiency and performance. Our disruptive approach positions us as
            industry leaders, driving progress and shaping the future of
            construction.
          </p>
        </div>
        <div className="flex flex-col">
          <img
            src="/assets/images/about-us.jpg"
            className="about-image"
            alt="about-us"
            loading="lazy"
          />
          <div className="card-shadow" />
        </div>
      </div>
    </section>
  );
};

export default About;
