import { useEffect } from "react";
import { GrStatusGood } from "react-icons/gr";
import confetti from "canvas-confetti";
import style from "../components style/OrderCompleted.module.css"
import { useNavigate } from "react-router-dom";

function OrderCompleted() {
  let navigate = useNavigate()

  useEffect(() => {
  confetti({
    particleCount: 250,
    spread: 60,
    origin: { x: 0.5, y: 0.7 },
    scalar: 1.5,
    gravity : 1,
    colors: ['#00ff00', '#ffcc00', '#ff0000', '#00ffff', '#ff00ff']
  });
  return ()=> confetti.reset()
}, []);

  return (
    <div className={style["completed-section"]}>
        <div className={style.container}>
        <div className={style.icon}>
            <span><GrStatusGood /></span>
            <h2>ORDER COMPLETED</h2>
        </div>
        <p>Your order is complete! <br />Thanks for shopping with FreshCart.</p>
        <div className={style["redirect-btn"]}>
            <button 
            onClick={()=> navigate("/" , { replace : true })}
            >Continue Shopping</button>
        </div>
    </div>
</div>
  )
}

export default OrderCompleted;
