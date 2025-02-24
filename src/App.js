import React, { Fragment, useEffect, useState } from "react";
import "h8k-components";

import { image1, image2, image3, image4 } from "./assets/images";
import { Thumbs, Viewer } from "./components";

const title = "Catalog Viewer";

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1,
    },
    {
      thumb: image2,
      image: image2,
    },
    {
      thumb: image3,
      image: image3,
    },
    {
      thumb: image4,
      image: image4,
    },
  ];

  const [catalogs] = useState([...catalogsList]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoSlide, setAutoSlide] = useState(false);
  const nextImage = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % catalogs.length);
  };

  const prevImage = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? catalogs.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    let interval;
    if (autoSlide) {
      interval = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % catalogs.length);
      }, 2000);
    }
    return () => clearInterval(interval);
  }, [autoSlide, catalogs.length]);
  return (
    <Fragment>
      <h8k-navbar header={title}></h8k-navbar>
      <div className="layout-column justify-content-center mt-75">
        <div className="layout-row justify-content-center">
          <div className="card pt-25">
            <Viewer catalogImage={catalogs[activeIndex].image} />
            <div className="layout-row justify-content-center align-items-center mt-20">
              <button
                className="icon-only outlined"
                data-testid="prev-slide-btn"
                onClick={prevImage}
              >
                <i className="material-icons">arrow_back</i>
              </button>
              <Thumbs items={catalogs} currentIndex={activeIndex} />
              <button
                className="icon-only outlined"
                data-testid="next-slide-btn"
                onClick={nextImage}
              >
                <i className="material-icons">arrow_forward</i>
              </button>
            </div>
          </div>
        </div>
        <div className="layout-row justify-content-center mt-25">
          <input
            checked={autoSlide}
            onChange={() => setAutoSlide(!autoSlide)}
            type="checkbox"
            data-testid="toggle-slide-show-button"
          />
          <label className="ml-6">Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  );
}

export default App;
