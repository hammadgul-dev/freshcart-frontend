import { useEffect, useState } from "react"
import { CiStar } from "react-icons/ci"
import style from "../components style/ProductDetail.module.css"
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { useQuery } from "@tanstack/react-query"

function ProductDetail() {
    let [item, setItem] = useState(null)
    let navigate = useNavigate()
    let { id } = useParams()

    let { data: grocery = [] } = useQuery({
        queryKey: ["groceryData"], staleTime: Infinity,
        queryFn: async () => {
            let apiData = await fetch(`${import.meta.env.VITE_BACKEND_API}/grocery`)
            return apiData.products
        }
    })

    let { data: product = [] } = useQuery({
        queryKey: ["productData"], staleTime: Infinity,
        queryFn: async () => {
            let api = await fetch(`${import.meta.env.VITE_BACKEND_API}/product`)
            let apiData = await api.json()
            return apiData.products
        }
    })

    useEffect(() => {
        let findingId = product?.find(p => p.id === Number(id)) ||
            grocery?.find(g => g._id === id)

        if (!findingId) {
            alert("ID Not Found!")
            setTimeout(() => { navigate("/") }, 1000)
        }
        else {
            setItem(findingId)
        }
    }, [id, product, grocery])

    return (
        <>
            {
                item && (
                    <div className={style["detail-section"]}>
                        <div className={style["detail-wrapper"]}>
                            <div className={style["item-img"]}>
                                <img src={item.thumbnail || item.image || "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"}
                                    alt={item.title || item.name || "No Title"}
                                    onError={(e) => {
                                        e.target.src = "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                                    }}
                                />
                            </div>
                            <div className={style["item-detail"]}>
                                <h2 className={style.header}>{item.title || item.name || "No Title"}</h2>
                                <div className={style["info-wrapper"]}>
                                    <div className={style["product-meta"]}>
                                        <div className={style["product-tag"]}>
                                            <div style={{ display: "flex", flexDirection: "column", gap: "7px" }}>
                                                <p>Category : <b>{item.category || "No Category"}</b></p>
                                                <p>Brand : <b>{item.brand || "No Brand"}</b></p>
                                            </div>
                                            <div className={style["item-price"]}>
                                                <h1 className={style["item-price"]}>${(Number(item.price) || 45).toFixed(2)}</h1>
                                            </div>
                                        </div>
                                        <div className={style["product-status"]}>
                                            <p>Availability : <b>{item.availabilityStatus || item.status || "Out Of Stock"}</b></p>
                                            <p>Rating : <b>{item.rating} <span style={{ fontSize: "20px" }}><CiStar /> </span></b></p>
                                        </div>
                                        <div className={style["delivery-info"]}>
                                            <p>Delivery Info : <b>{item.shippingInformation || item.shipping || "Ships In 3 Days"}</b></p>
                                        </div>
                                    </div>
                                </div>
                                <div className={style["desc-wrapper"]}>
                                    <p>{item.description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        </>
    )
}

export default ProductDetail