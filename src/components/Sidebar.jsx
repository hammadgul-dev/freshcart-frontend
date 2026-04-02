import style from "../components style/Sidebar.module.css"
import { FaCartShopping } from "react-icons/fa6"
import { FaPhoneAlt, FaUserAlt } from "react-icons/fa"
import { AiFillHome } from "react-icons/ai"
import { MdFavorite } from "react-icons/md"
import { BiLogOut } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { apiFetch } from "../utils/apiFetch"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { setMessage } from "../Redux/Slice/Notification"
import Notification from "../components/Notification";
import { useEffect } from "react"

function Sidebar() {
    let queryClient = useQueryClient()
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let sidebarSelector = useSelector(state => state.sidebarReducer.value)

    let { isLoading: favLoading, error: favError, data: favorite = [] } = useQuery({
        queryKey: ["userFavorite"], staleTime: 5000, refetchOnWindowFocus: false,
        queryFn: async () => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/favorite`)
        },
    })

    let { isLoading: cartLoading, error: cartError, data: cartItem = [] } = useQuery({
        queryKey: ["userCart"], staleTime: 5000, refetchOnWindowFocus: false,
        queryFn: async () => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/cart-items`)
        }
    })


    async function handelLogout() {
        try {
            let apiData = await apiFetch(`${import.meta.env.VITE_BACKEND_API}/logout`, { method: "POST" })
            dispatch(setMessage({ message: apiData.message }))
            queryClient.clear()
            setTimeout(() => { navigate("/") }, 2000)
        }
        catch (e) {
            dispatch(setMessage({ message: e.message || "LogOut Error" }))
        }
    }


    return (
        <>
            {sidebarSelector && (
                <div style={{ position: "relative" }}>
                    <div className={style["sidebar-section"]}>
                        <div className={style.home}
                            onClick={() => navigate("/")}
                        >
                            <span><AiFillHome /></span>
                            <h5>Home</h5>
                        </div>
                        <div className={style.about}
                            onClick={() => navigate("/about-us")}
                        >
                            <span><FaUserAlt /></span>
                            <h5>About</h5>
                        </div>
                        <div className={style.contact}
                            onClick={() => navigate("/contact-us")}
                        >
                            <span><FaPhoneAlt /></span>
                            <h5>Contact</h5>
                        </div>
                        <div className={style.cartItem}
                            onClick={() => {
                                navigate("/cart-page")
                            }}
                        >
                            <span><FaCartShopping /></span>
                            {cartItem?.length > 0 && <p className={style["item-count"]}>{cartItem?.length}</p>}
                            <h5>Cart</h5>
                        </div>
                        <div className={style.favProduct}
                            onClick={() => navigate("/favorite")}
                        >
                            <span><MdFavorite /></span>
                            {favorite?.length > 0 && <p className={style["fav-count"]}>{favorite?.length}</p>}
                            <h5>Favorite</h5>
                        </div>
                        <div className={style.logOut}
                            onClick={handelLogout}>
                            <span><BiLogOut /></span>
                            <h5>Log Out</h5>
                        </div>
                    </div>
                </div>

            )}
            <Notification />
        </>
    )

}

export default Sidebar