import style from "../pages style/AboutUs.module.css"
import img1 from "../assets/Products/Product About.webp"
import img2 from "../assets/Grocery/Grocery About.webp"

function AboutUs() {
  return (
    <div className={style["about-container"]}>
      <div className={style["scroll-wrapper"]}>
        <div className={style["product-about"]}>
          <div className={style["product-img"]}>
            <img src={img1} alt="product Image" />
          </div>
          <div className={style["product-desc"]}>
            <h1>We provide top-quality products for your everyday needs.</h1>
            <p>Explore our wide range of premium products carefully selected to make your daily life easier and more enjoyable.</p>
          </div>
        </div>
        <div className={style["grocery-about"]}>
          <div className={style["grocery-img"]}>
            <img src={img2} alt="Grocery Image" />
          </div>
          <div className={style["grocery-desc"]}>
            <h1>Providing fresh and high-quality groceries to meet your everyday needs.</h1>
            <p>From farm-fresh vegetables to pantry essentials — everything delivered right to your door.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AboutUs