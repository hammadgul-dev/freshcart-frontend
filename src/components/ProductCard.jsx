import style from "../components style/ProductCard.module.css"
import { GrFavorite } from "react-icons/gr"
import { BiStar } from "react-icons/bi"
import { useNavigate } from "react-router-dom"
import { apiFetch } from "../utils/apiFetch"
import { useDispatch } from "react-redux"
import Notification from "../components/Notification";
import { setMessage } from "../Redux/Slice/Notification";
import { useMutation, useQueryClient } from "@tanstack/react-query"


function ProductCard({ data }) {
  let queryClient = useQueryClient()
  let navigate = useNavigate()
  let dispatch = useDispatch()

  let addFavItem = useMutation({
    mutationFn: async (data) => {
      return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/favorite`,
        {
          method: "POST",
          body: JSON.stringify({
            itemImg: data.thumbnail || `${import.meta.env.VITE_BACKEND_API}/public${data.image}`,
            itemName: data.title || data.name,
            itemId: data.id || data._id
          })
        }
      )
    },
    onSuccess: (data) => {
      dispatch(setMessage({ message: data.message }))
      if (Array.isArray(data?.favorite))
        queryClient.invalidateQueries({ queryKey: ["userFavorite"] })
    },
    onError: (e) => {
      dispatch(setMessage({ message: e.message || "Failed To Add Item" }))
    }
  })

  let handleCart = useMutation({
    mutationFn: async (data) => {
      let items = {
        itemImg: data.thumbnail || `${import.meta.env.VITE_BACKEND_API}/public${data.image}`,
        itemName: data.title || data.name,
        itemRating: data.rating || 4.5,
        itemPrice: data.price || 45,
        itemCategory: data.category || "No Category",
        itemBrand: data.brand || "No Brand",
        itemQnty: 1,
      }
      return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/cart-items`, {
        method: "POST",
        body: JSON.stringify(items)
      })
    },
    onSuccess: (apiResp) => {
      dispatch(setMessage({ message: apiResp.message }))
      if (Array.isArray(apiResp?.cart))
        queryClient.invalidateQueries({ queryKey: ["userCart"] })
    },
    onError: (e) => {
      dispatch(setMessage({ message: e.message || "Failed To Add Item" }))
    }
  })

  return (
    <>
      <div className={style.card}>
        <div className={style["item-img"]}>
          <img src={data.thumbnail || `${import.meta.env.VITE_BACKEND_API}/public${data.image}` || "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"}
            alt={data.title || data.name || "No Title"}
            onError={(e) => {
              e.target.src = "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
            }}
          />
        </div>
        <span className={style["fav-icon"]}
          onClick={() => addFavItem.mutate(data)}
        ><GrFavorite /></span>
        <div className={style["item-desc"]}>
          <h2>{data.title || data.name || "No Title"}</h2>
          <div className={style["rating-price"]}>
            <div className={style["rating-wrapper"]}>
              {(() => {
                let star = []
                for (let i = 0; i < Math.floor(data.rating ? data.rating : 5); i++) {
                  star.push(<BiStar key={i} />)
                }
                return star
              })()}
            </div>
            <h2>${(Number(data.price) || 45).toFixed(2)}</h2>
          </div>
          <div className={style["category-brand"]}>
            <span>Category : <b>{data.category || "No Category"}</b></span>
            <span>Brand : <b>{data.brand || "No Brand"}</b></span>
          </div>
          <div className={style["item-warranty"]}>
            <span>Warranty : <b>{data.warrantyInformation || data.warranty || "No Warrenty"}</b></span>
          </div>
          <div className={style["action-btn"]}>
            <button
              className={style["detail-btn"]}
              onClick={() => navigate(`/detail-page/${data.id || data._id}`)}
            >Product Details</button>
            <button className={style["cart-btn"]}
              onClick={() => handleCart.mutate(data)}
            >Add To Cart</button>
          </div>
        </div>
      </div>
      <Notification />
    </>
  )
}
export default ProductCard





