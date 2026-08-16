import "./Categories.css";
import { categories } from "./categories";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

function Categories() {
  return (
    <section className="categories">
      {/* Header */}
      <div className="category-header">
        <div>
          <div className="category-tag">
            <span></span>
            <p>Categories</p>
          </div>

          <h2>Browse By Category</h2>
        </div>

        <div className="category-buttons">
          <button className="catPrev">
            <FaArrowLeft />
          </button>

          <button className="catNext">
            <FaArrowRight />
          </button>
        </div>
      </div>

     

      <Swiper
        modules={[Navigation, Autoplay]}
        navigation={{
          prevEl: ".catPrev",
          nextEl: ".catNext",
        }}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true,
        }}
        loop={true}
        speed={700}
        spaceBetween={20}
        slidesPerView={4}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {categories.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="category-card">
              <img src={item.image} alt={item.title} />

              <h3>{item.title}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}

export default Categories;