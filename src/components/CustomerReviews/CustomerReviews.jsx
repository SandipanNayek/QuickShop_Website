import "./CustomerReviews.css";

const reviews = [
  {
    id: 1,
    name: "Rahul Sharma",
    image:
      "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    review:
      "Amazing shopping experience. Fast delivery and excellent product quality. Highly recommended!",
  },
  {
    id: 2,
    name: "Priya Das",
    image:
      "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    review:
      "The customer support was outstanding. I received my order within two days.",
  },
  {
    id: 3,
    name: "Amit Roy",
    image:
      "https://randomuser.me/api/portraits/men/15.jpg",
    rating: 4,
    review:
      "Very good quality products at affordable prices. Definitely shopping again.",
  },
];

function CustomerReviews() {
  return (
    <section className="reviews-section">

      <div className="reviews-heading">
        <span>Testimonials</span>
        <h2>What Our Customers Say</h2>
      </div>

      <div className="reviews-grid">

        {reviews.map((review) => (

          <div
            className="review-card"
            key={review.id}
          >

            <img
              src={review.image}
              alt={review.name}
            />

            <h3>{review.name}</h3>

            <div className="stars">
              {"★".repeat(review.rating)}
              {"☆".repeat(5 - review.rating)}
            </div>

            <p>{review.review}</p>

          </div>

        ))}

      </div>

    </section>
  );
}

export default CustomerReviews;