import "./FlashSale.css";
import ProductCard from "./ProductCard";
import { products } from "./products";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { useState, useEffect, useRef } from "react";

function FlashSale({ searchTerm = "" }) {
  const swiperRef = useRef(null);

  const [targetDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + 3);
    return date;
  });

  const calculateTimeLeft = () => {
    const difference = targetDate - new Date();

    if (difference <= 0) {
      return {
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
      };
    }

    return {
      days: String(
        Math.floor(difference / (1000 * 60 * 60 * 24))
      ).padStart(2, "0"),

      hours: String(
        Math.floor((difference / (1000 * 60 * 60)) % 24)
      ).padStart(2, "0"),

      minutes: String(
        Math.floor((difference / (1000 * 60)) % 60)
      ).padStart(2, "0"),

      seconds: String(
        Math.floor((difference / 1000) % 60)
      ).padStart(2, "0"),
    };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (swiperRef.current) {
      swiperRef.current.update();

      if (swiperRef.current.autoplay) {
        swiperRef.current.autoplay.start();
      }
    }
  });

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="flash-sale">
      <div className="top">
        <div className="heading">
          <div className="today">
            <span></span>
            <p>Today's</p>
          </div>

          <h2>
            {searchTerm
              ? `Search Results (${filteredProducts.length})`
              : "Flash Sales"}
          </h2>
        </div>

        {!searchTerm && (
          <>
            <div className="timer">
              <div>
                <small>Days</small>
                <h3>{timeLeft.days}</h3>
              </div>

              <span>:</span>

              <div>
                <small>Hours</small>
                <h3>{timeLeft.hours}</h3>
              </div>

              <span>:</span>

              <div>
                <small>Minutes</small>
                <h3>{timeLeft.minutes}</h3>
              </div>

              <span>:</span>

              <div>
                <small>Seconds</small>
                <h3>{timeLeft.seconds}</h3>
              </div>
            </div>

            <div className="slider-buttons">
              <button className="prevBtn">
                <FaArrowLeft />
              </button>

              <button className="nextBtn">
                <FaArrowRight />
              </button>
            </div>
          </>
        )}
      </div>

      {searchTerm ? (
        <div className="products-grid">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))
          ) : (
            <h2>No products found.</h2>
          )}
        </div>
      ) : (
        <Swiper
  modules={[Navigation, Autoplay]}
  navigation={{
    prevEl: ".prevBtn",
    nextEl: ".nextBtn",
  }}
  autoplay={{
    delay: 2500,
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
  }}
  loop={true}
  speed={800}
  spaceBetween={25}
  slidesPerView={3}
  breakpoints={{
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  }}
>
          {products.map((product) => (
            <SwiperSlide key={product.id}>
              <ProductCard product={product} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </section>
  );
}
export default FlashSale;