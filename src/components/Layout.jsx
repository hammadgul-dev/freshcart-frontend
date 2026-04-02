import { useSelector } from "react-redux";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Suspense, useEffect } from "react";

function Layout({ children }) {
    let themeSelector = useSelector(state => state.themeReducer.value)
    useEffect(() => {
        document.body.className = themeSelector ? "dark" : "light"
    }, [themeSelector])

    return (
        <Suspense fallback={<h1 style={{ textAlign: "center" }}>Loading.....</h1>}>
            <div>
                <Navbar />
                <div style={{ display: "flex", gap: "4px", marginTop: "3px", padding: "1px" }}>
                    <Sidebar />
                    {children}
                </div>
            </div>
        </Suspense>
    )
}

export default Layout