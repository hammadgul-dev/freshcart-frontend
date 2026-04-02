import { BiPhoneCall } from "react-icons/bi"
import style from "../pages style/ContactUs.module.css"
import { CiLocationOn, CiMail } from "react-icons/ci"
import { RiLuggageCartLine } from "react-icons/ri"
import ContactForm from "./ContactForm"


function ContactUs() {
    return (
        <div className={style["contact-section"]}>

            <h1>Thanks For Visiting FreshCart </h1>
            <div className={style["info-form-wrapper"]}>
                <div className={style["contact-info"]}>
                    <div className={style.desc}>
                        <p>FreshCart is your trusted online store for fresh groceries and daily-use products.
                            We focus on quality, affordability, and fast service to make your shopping easy and reliable.
                            Your daily needs, delivered with care.</p>
                    </div>
                    <div className={style["contact-num"]}>
                        <div className={style["phone-num"]}>
                            <span><BiPhoneCall /></span>
                            <p>(012) 345-6789</p>
                        </div>
                        <div className={style["gmail"]}>
                            <span><CiMail /></span>
                            <p>freshcart@gmail.com</p>
                        </div>
                        <div className={style["address"]}>
                            <span><CiLocationOn /></span>
                            <p>Los Angeles, USA</p>
                        </div>
                    </div>
                </div>

                <div className={style["contact-form"]}>
                    <ContactForm />
                </div>
            </div>

        </div>
    )
}

export default ContactUs