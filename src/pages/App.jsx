import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductFilter from "../components/ProductFilter";
import ProductList from "../components/ProductList";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import CardView from "../components/CardView";

function App() {
  let themeSelector = useSelector(state => state.themeReducer.value)

  useEffect(() => {
    document.body.className = themeSelector ? "dark" : "light"
  }, [themeSelector])

  return (
    <>
      <Navbar />
      <div>
        <div
          style={{
            position: "relative",
            display: "flex",
            gap: "3px",
            marginTop: "3px",
            padding: "1px"
          }}
        >
          <Sidebar />
          <div
            style={{
              height: "600px",
              padding: "2px",
              width: "100%",
              display: "flex",
              gap: "5px",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <CardView />
            <ProductFilter />
            <ProductList />
          </div>
        </div >
      </div>
    </>
  );
}

export default App;