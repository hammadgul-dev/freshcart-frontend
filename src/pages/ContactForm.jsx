import { useState } from "react"
import style from "../pages style/ContactForm.module.css"
import { apiFetch } from "../utils/apiFetch"
import Notification from "../components/Notification";
import { setMessage } from "../Redux/Slice/Notification";
import { useDispatch } from "react-redux"

function ContactForm() {
    let dispatch = useDispatch()
    let [userInfo, setUserInfo] = useState({
        userName: "",
        userEmail: "",
        userMessage: "",
    })

    async function postContactForm(userInfo) {
        try {
            let apiData = await apiFetch(`${import.meta.env.VITE_BACKEND_API}/contact-us`, {
                method: "POST",
                body: JSON.stringify(userInfo)
            })
            console.log(apiData)
            return dispatch(setMessage({ message: apiData.message }))
        }
        catch (e) {
            return dispatch(setMessage({ message: e.message || "Error Occur During Contact" }))
        }
    }

    function handleForm(e) {
        e.preventDefault()
        if (!userInfo.userName || !userInfo.userEmail || !userInfo.userMessage)
            return dispatch(setMessage({ message: "All Fields are Required" }))
        if (!userInfo.userName)
            return dispatch(setMessage({ message: "Name Is Required!" }))
        else if (!userInfo.userEmail)
            return dispatch(setMessage({ message: "Email Is Required!" }))
        else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userInfo.userEmail))
            return dispatch(setMessage({ message: "Invalid Email Address!" }))
        else if (!userInfo.userMessage)
            return dispatch(setMessage({ message: "Please enter a message" }))
        else {
            postContactForm(userInfo)
            setUserInfo({
                userName: "",
                userEmail: "",
                userMessage: ""
            })
        }
    }

    return (
        <>
            <form action="/contact-us" onSubmit={handleForm}
                method="post" className={style["contact-form"]}>
                <div className={style["form-heading"]}>
                    <h1>Contact Form</h1>
                </div>
                <div className={style["form-field"]}>
                    <input type="text" name="user_name"
                        placeholder="Name" required
                        value={userInfo.userName}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, userName: e.target.value.trim() })}
                    />
                    <input type="email" name="user_email"
                        placeholder="Email" required
                        value={userInfo.userEmail}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, userEmail: e.target.value.trim() })}
                    />
                    <textarea className={style["msg-field"]}
                        name="user_msg" placeholder="Enter Your Message"
                        value={userInfo.userMessage}
                        onChange={(e) =>
                            setUserInfo({ ...userInfo, userMessage: e.target.value.trim() })}
                    ></textarea>
                </div>
                <div className={style["submit-btn"]}>
                    <button type="submit">Submit Form</button>
                </div>
            </form>
            <Notification />
        </>
    )
}

export default ContactForm