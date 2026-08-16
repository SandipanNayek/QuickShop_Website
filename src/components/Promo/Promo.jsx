import "./Promo.css";
import { useEffect, useState } from "react";
import headphone from "../../assets/hp.webp";

function Promo() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 23,
    days: 5,
    minutes: 59,
    seconds: 35,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, days, minutes, seconds } = prev;

        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;

          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;

            if (hours > 0) {
              hours--;
            } else {
              hours = 23;

              if (days > 0) {
                days--;
              }
            }
          }
        }

        return { hours, days, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="promo">

      <div className="promo-left">

        <span className="promo-tag">
          Categories
        </span>

        <h2>
          Enhance Your
          <br />
          Music Experience
        </h2>

        <div className="promo-timer">

          <div className="circle">
            <h3>{String(timeLeft.hours).padStart(2, "0")}</h3>
            <p>Hours</p>
          </div>

          <div className="circle">
            <h3>{String(timeLeft.days).padStart(2, "0")}</h3>
            <p>Days</p>
          </div>

          <div className="circle">
            <h3>{String(timeLeft.minutes).padStart(2, "0")}</h3>
            <p>Minutes</p>
          </div>

          <div className="circle">
            <h3>{String(timeLeft.seconds).padStart(2, "0")}</h3>
            <p>Seconds</p>
          </div>

        </div>

        <button className="buy-btn">
          Buy Now!
        </button>

      </div>

      <div className="promo-right">
        <img
          src={headphone}
          alt="Headphone"
        />
      </div>

    </section>
  );
}

export default Promo;