import { useDispatch, useSelector } from "react-redux";
import style from "../components style/Notification.module.css";
import { clearMessage } from "../Redux/Slice/Notification";
import { useEffect } from "react";

function Notification() {
  let dispatch = useDispatch()
  let { message } = useSelector(state => state.notificationReducer)

  useEffect(() => {
    let timer = setTimeout(() => {
      dispatch(clearMessage())
    }, 2000)
    return () => clearTimeout(timer)
  }, [message])

  return (
    <>
      {message && (
        <div className={style.message}>
          <p>{message}</p>
        </div>
      )}
    </>
  );
}

export default Notification;
