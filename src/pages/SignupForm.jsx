import style from "../pages style/SignupForm.module.css"
import signupImg from "../assets/Sign Form Image.webp"
import Notification from "../components/Notification";
import { useState } from "react"
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../utils/apiFetch"
import { useDispatch } from "react-redux";
import { clearMessage, setMessage } from "../Redux/Slice/Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query"

function SignupForm() {
    let queryClient = useQueryClient()
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let [userInfo, setInfo] = useState({
        firstName: "",
        lastName: "",
        userEmail: "",
        userPassword: "",
    })

    function handleForm(e) {
        e.preventDefault()
        if (!userInfo.firstName || !userInfo.lastName || !userInfo.userEmail || !userInfo.userPassword)
            return dispatch(setMessage({ message: "All Fields are Required" }))
        else if (!isNaN(userInfo.firstName))
            return dispatch(setMessage({ message: "First Name Must be String" }))
        else if (!isNaN(userInfo.lastName))
            return dispatch(setMessage({ message: "Last Name Must be String" }))
        else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(userInfo.userEmail))
            return dispatch(setMessage({ message: "Invalid Email" }))
        else if (userInfo.userPassword.length < 8)
            return dispatch(setMessage({ message: "Password Is Too Short" }))
        else {
            signupMutation.mutate(userInfo)
        }
    }

    let signupMutation = useMutation({
        mutationFn: async (userInfo) => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/signup`, {
                method: "POST",
                body: JSON.stringify(userInfo)
            })
        },
        onSuccess: (data) => {
            dispatch(setMessage({ message: data.message }))
            queryClient.setQueryData(["authUser"], { isLogged: true })
            setTimeout(() => navigate("/"), 700)
        },
        onError: (e) => {
            dispatch(setMessage({ message: e.message || "Signup Failed" }))
        }
    })


    return (
        <div className={style["signup-section"]}>
            <div className={style["signup-wrapper"]}>
                <div className={style["signup-img"]}>
                    <img src={signupImg} alt="img" />
                    <div className={style["contact-msg"]}>
                        <h1>Create Your <br /> Account</h1>
                        <p>Join FreshCart and enjoy <br /> fresh shopping every day.</p>
                    </div>
                </div>

                <form className={style.form}
                    method="post"
                    onSubmit={handleForm}
                >
                    <div className={style["form-heading"]}>
                        <h1>Sign Up</h1>
                    </div>
                    <div className={style["form-field"]}>
                        <input type="text" name="first_name"
                            placeholder="First Name" required spellCheck="false"
                            onChange={(e) => setInfo({ ...userInfo, firstName: e.target.value.trim() })}
                        />
                        <input type="text" name="last_name"
                            placeholder="Last Name" required spellCheck="false"
                            onChange={(e) => setInfo({ ...userInfo, lastName: e.target.value.trim() })}
                        />
                        <input type="email" name="user_email"
                            placeholder="Email" required spellCheck="false"
                            onChange={(e) => setInfo({ ...userInfo, userEmail: e.target.value.trim() })}
                        />
                        <input type="password" name="user_password"
                            placeholder="Password" required spellCheck="false"
                            onChange={(e) => setInfo({ ...userInfo, userPassword: e.target.value.trim() })}
                        />
                    </div>
                    <button className={style["signup-btn"]}>Sign Up</button>
                </form>
            </div>
            <Notification />
        </div>
    )
}

export default SignupForm