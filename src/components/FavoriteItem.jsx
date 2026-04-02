import style from "../components style/FavoriteItem.module.css";
import Notification from "../components/Notification";
import { apiFetch } from "../utils/apiFetch";
import { useDispatch } from "react-redux";
import { setMessage } from "../Redux/Slice/Notification";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query"

function FavoriteItem() {
  let queryClient = useQueryClient()
  let dispatch = useDispatch()

  let { isLoading, error, data: favorite = [] } = useQuery({
    queryKey: ["userFavorite"], staleTime: 5000, refetchOnWindowFocus: false,
    queryFn: async () => {
      return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/favorite`)
    }
  })

  let deleteMutation = useMutation({
    mutationFn: async ({ itemId }) => {
      return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/favorite/delete/${itemId}`, {
        method: "DELETE",
      })
    },
    onSuccess: (data) => {
      dispatch(setMessage({ message: data.message }))
      if (data?.favorite)
        queryClient.invalidateQueries({ queryKey: ["userFavorite"] })
    },
    onError: (e) => {
      dispatch(setMessage({ message: e.message || "Something Went Wrong" }))
    }
  })

  return (
    <>
      <div className={style["fav-section"]}>
        <div className={style["item-wrapper"]}>
          {Array.isArray(favorite) && favorite?.length > 0 ? (
            favorite?.map((item) => (
              <div key={item._id || item.id} className={style["fav-card"]}>
                <div className={style["item-img"]}>
                  <img
                    src={
                      item.thumbnail ||
                      item.itemImg
                    }
                    alt={item.title || item.name || "No Title"}
                    onError={(e) => {
                      e.target.src =
                        "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg";
                    }}
                  />
                </div>
                <h2 className={style["item-name"]}>{item.title || item.itemName || "No Title"}</h2>
                <div className={style["remove-btn"]}>
                  <button
                    onClick={() => deleteMutation.mutate({ itemId: item._id })}
                  >Remove</button>
                </div>
              </div>
            ))
          ) : (
            <h1 className={style["empty-msg"]}>Favorite List Is Empty!</h1>
          )}
        </div>
      </div>
      <Notification />
    </>
  );
}

export default FavoriteItem;
