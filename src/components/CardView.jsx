import style from "../components style/CardView.module.css"
import { useDispatch } from "react-redux"
import { setProductView } from "../Redux/Slice/CardView"

function CardView() {
  let dispatch = useDispatch()

  return (
    <div className={style["user-choice"]}>
      <div>
        <button onClick={(e) => dispatch(setProductView(e.target.textContent.trim().toLowerCase()))}>Products</button>
        <span>|</span>
        <button
          onClick={(e) =>
            dispatch(setProductView(e.target.textContent.trim().toLowerCase()))
          }>Groceries</button>
      </div>
    </div>
  )
}

export default CardView
