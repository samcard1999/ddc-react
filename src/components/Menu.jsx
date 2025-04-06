import React from "react";

const Menu = () => {
  function scrollToSection(id) {
    console.log("hola");
    const element = document.getElementById(id);
    const targetPosition =
      element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 800; // Duración del desplazamiento en milisegundos
    let startTime = null;

    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = ease(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
      t /= d / 2;
      if (t < 1) return (c / 2) * t * t + b;
      t--;
      return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
  }

  return (
    <nav role="navigation">
      <div id="menuToggle">
        {/*
    A fake / hidden checkbox is used as click reciever,
    so you can use the :checked selector on it.
    */}
        <input type="checkbox" id="menuCheckbox" />
        {/*
    Some spans to act as a hamburger.
    
    They are acting like a real hamburger,
    not that McDonalds stuff.
    */}
        <span />
        <span />
        <span />
        {/*
    Too bad the menu has to be inside of the button
    but hey, it's pure CSS magic.
    */}
        <ul id="menu">
          {/* 
      We can use a label here to close upon click (when doing same page navigation), this
      does require a slight bit of JS.
      */}
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <button onClick={() => scrollToSection("about")}>About</button>
          </li>
          <li>
            <button onClick={() => scrollToSection("projects")}>
              Projects
            </button>
          </li>
          {/* These just close the menu */}
          <li>
            <button onClick={() => scrollToSection("footer")}>Contact</button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Menu;
