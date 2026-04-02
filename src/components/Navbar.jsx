import { RiLuggageCartLine } from "react-icons/ri"
import style from "../components style/Navbar.module.css"
import { BiSearch } from "react-icons/bi"
import { FaBars } from "react-icons/fa"
import { apiFetch } from "../utils/apiFetch"
import { MdOutlineDarkMode, MdOutlineWbSunny } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { handleSidebar } from "../Redux/Slice/SidebarSlice"
import { handleTheme } from "../Redux/Slice/ThemeSlice"
import img from "../assets/User Avtar.webp"
import { handleUserSearch } from "../Redux/Slice/FilterSlice"
import { useQuery } from "@tanstack/react-query"

function Navbar() {
    let themeSelector = useSelector(state => state.themeReducer.value)
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let { data: isLogged = false } = useQuery({
        queryKey: ["authUser"],
        staleTime: Infinity,
        retry: false,
        queryFn: async () => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/signup/verify-token`)
        }
    })

    return (
        <div className={style.navbar}>
            <div className={style["left-section"]}>
                <h2 onClick={() => dispatch(handleSidebar())}><FaBars /></h2>
                <h1 onClick={() => navigate("/")}><span><RiLuggageCartLine /></span>FreshCart</h1>
            </div>
            <div className={style["search-box"]}>
                <span><BiSearch /></span>
                <input type="text"
                    name="user_search"
                    placeholder="Search Products & Groceries"
                    spellCheck="false"
                    onChange={(e) => {
                        dispatch(handleUserSearch(e.target.value.trim().toLowerCase()))
                        navigate("/")
                    }}
                />
            </div>
            <div className={style["right-section"]}>
                <div className={style["theme-btn"]}>
                    <span onClick={() =>
                        dispatch(handleTheme())}>{themeSelector ? <MdOutlineDarkMode /> : <MdOutlineWbSunny />}</span>
                    {
                        isLogged ? (
                            <div className={style["user-img"]}>
                                <img src={img} alt="User Avtar" />
                            </div>
                        ) : (
                            <button className={style["signup-btn"]}
                                onClick={() => navigate("/signup-form")}
                            >Sign Up</button>
                        )
                    }
                </div>

            </div>
        </div>
    )
}

export default Navbar