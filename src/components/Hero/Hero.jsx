import "./Hero.css";
import { FaArrowUp } from "react-icons/fa6";
import { useEffect, useState } from "react";

const slides = [
  {
    title: "Discover the Best Deals on",
    highlight: "Smart Watches",
    description:
      "Explore premium smart watches with amazing offers and stylish designs.",
    bgText: "WATCH",
    bgColor: "#f5f5f5",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=900",
    bgImage:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=1200",
  },
  {
    title: "Level Up Your",
    highlight: "Sports Gear",
    description:
      "Shop footballs, cricket bats, bikes and everything you need for sports.",
    bgText: "SPORT",
    bgColor: "#eefaf1",
    image:
      "https://images.unsplash.com/photo-1517466787929-bc90951d0974?w=900",
    bgImage:
      "https://images.unsplash.com/photo-1517649763962-0c623066013b?w=1200",
  },
  {
    title: "Latest",
    highlight: "Fashion Trends",
    description:
      "Find premium clothes, sneakers and stylish outfits for every season.",
    bgText: "STYLE",
    bgColor: "#fff4f4",
    image:
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=900",
    bgImage:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200",
  },
];

function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[current];

  return (
    <section
  className="hero"
  style={{
    backgroundColor: slide.bgColor,
    backgroundImage: `linear-gradient(rgba(${
      document.body.classList.contains("dark-mode") ? "0,0,0,.45" : "255,255,255,.45"
    }), rgba(${
      document.body.classList.contains("dark-mode") ? "0,0,0,.45" : "255,255,255,.45"
    })), url(${slide.bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  }}
>
      <h1 className="bg-text">{slide.bgText}</h1>

      <div className="hero-left">
        <h1 className="hero-title">
          {slide.title}
          <br />
          <span>{slide.highlight}</span>
        </h1>

        <p className="hero-description">
          {slide.description}
        </p>

        <div className="hero-buttons">
          <button className="shop-btn">
            Shop Now
          </button>

          <button className="arrow-btn">
            <FaArrowUp />
          </button>
        </div>
      </div>

      <div className="hero-right">
        <img src={slide.image} alt={slide.highlight} />
      </div>
    </section>
  );
}

export default Hero;