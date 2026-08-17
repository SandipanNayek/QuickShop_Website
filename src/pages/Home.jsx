
import Hero from "../components/Hero/Hero";
import FlashSale from "../components/FlashSale/FlashSale";
import Categories from "../components/Categories/Categories.jsx";
import Promo from "../components/Promo/Promo.jsx";
import Products from "../components/Products/Products.jsx";
import Footer from "../components/Footer/Footer";
import CustomerReviews from "../components/CustomerReviews/CustomerReviews";
import RecentlyViewed from "../components/RecentlyViewed/RecentlyViewed";

function Home({ searchTerm }) {
  return (
    <>
      <Hero />

      <FlashSale searchTerm={searchTerm} />

      <Categories />

      <Promo />

      <Products searchTerm={searchTerm} />

      <RecentlyViewed/>

      <CustomerReviews/>

      <Footer />
    </>
  );
}


export default Home;