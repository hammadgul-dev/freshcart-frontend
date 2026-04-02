import style from "../pages style/CartPage.module.css"
import Notification from "../components/Notification";
import { IoStar } from "react-icons/io5"
import { BiTrashAlt } from "react-icons/bi"
import { AiOutlineShoppingCart } from "react-icons/ai"
import { MdReceiptLong } from "react-icons/md"
import { useNavigate } from "react-router-dom"
import { apiFetch } from "../utils/apiFetch"
import { useDispatch } from "react-redux"
import { useState } from "react"
import { useEffect } from "react"
import { setMessage } from "../Redux/Slice/Notification";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";


function CartPage() {
    let queryClient = useQueryClient()
    let [discount, setDiscount] = useState(null)
    let [prices, setPrices] = useState({
        total: 0,
        discount: 0,
        finalAmount: 0,
    })
    let navigate = useNavigate()
    let dispatch = useDispatch()

    let { isLoading, error, data: cart = [] } = useQuery({
        queryKey: ["userCart"], staleTime: 5000, refetchOnWindowFocus: false,
        queryFn: async () => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/cart-items`)
        }
    })

    useEffect(() => {
        if (Array.isArray(cart) && cart.length > 0) {
            let total = cart.reduce((prev, curr) => {
                return prev + Number(curr.itemPrice) * Number(curr.itemQnty)
            }, 0)
            setPrices({
                total: cart.totalPrice || total,
                discount: cart.totalDiscount || 0,
                finalAmount: cart.finalAmount || total
            })
        }
        else {
            setPrices({ total: 0, discount: 0, finalAmount: 0 })
        }
    }, [JSON.stringify(cart)])


    let handleCartDelete = useMutation({
        mutationFn: async (id) => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/cart-items/delete/${id}`, { method: "DELETE" })
        },
        onSuccess: (apiResp) => {
            dispatch(setMessage({ message: apiResp.message }))
            if (Array.isArray(apiResp?.cart))
                queryClient.invalidateQueries({ queryKey: ["userCart"] })
        },
        onError: (e) => {
            dispatch(setMessage({ message: e.message || "Failed To Delete Item" }))
        }
    })

    let handleQnty = useMutation({
        mutationFn: async ({ itemId, action }) => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/cart-items/update/${itemId}`, {
                method: "PATCH",
                body: JSON.stringify({ action })
            })
        },
        onSuccess: (apiData) => {
            dispatch(setMessage({ message: apiData.message }))
            if (apiData?.cart)
                queryClient.invalidateQueries({ queryKey: ["userCart"] })
        },
        onError: (e) => {
            dispatch(setMessage({ message: e.message || "Failed To Update" }))
        }
    })

    let handleDiscount = useMutation({
        mutationFn: async (discountCode) => {
            return await apiFetch(`${import.meta.env.VITE_BACKEND_API}/cart-items/discount/${discountCode}`, {
                method: "POST"
            })
        },
        onSuccess: (apiData) => {
            if (apiData?.totalPrice) {
                setPrices(prev => ({
                    ...prev,
                    total: apiData.totalPrice,
                    discount: apiData.discount,
                    finalAmount: apiData.finalAmount
                }))
            }
            dispatch(setMessage({ message: apiData.message }))
        },
        onError: (e) => {
            dispatch(setMessage({ message: e.message || "Failed To Apply Discount" }))
        }
    })

    function handleDownload() {
        if (Array.isArray(cart) && cart.length > 0) {
            let headers = "Name,Price,Category,Brand,Quantity,Rating"
            let cartsItem = cart.map(item =>
                `${item.itemName || "No Title"},${item.itemPrice || 0},${item.itemCategory || "No Category"},${item.itemBrand || "No Brand"},${item.itemQnty || 0},${item.itemRating || 5.0}`
            )
            let billSummary = [
                `Total : $${prices.total}`,
                `Discount : $${prices.discount}`,
                `Final Amount : $${prices.finalAmount}`
            ]
            let csvContent = [headers, ...cartsItem, ...billSummary].join("\n")

            let blob = new Blob([csvContent], { type: "text/csv" })
            let link = document.createElement("a")
            link.href = URL.createObjectURL(blob)
            link.download = "My Cart.csv"
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            URL.revokeObjectURL(link.href)
        }
        else {
            return dispatch(setMessage({ message: "Cart Is Empty!" }))
        }
    }

    return (
        <>
            <div className={style["cart-section"]}>

                <div className={style["cart-item"]}>
                    <div className={style["cart-heading"]}>
                        <h1><span><AiOutlineShoppingCart /></span>Your Orders</h1>
                    </div>
                    <div className={style["cart-wrapper"]}>
                        {Array.isArray(cart) && cart.length > 0 ? (
                            cart.map(item => (
                                <div key={item._id} className={style["item-card"]}>
                                    <div className={style["img-wrapper"]}>
                                        <img src={item.thumbnail || item.itemImg || "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"}
                                            alt={item.title || item.name || "No Title"}
                                            onError={(e) => {
                                                e.target.src = "https://www.slntechnologies.com/wp-content/uploads/2017/08/ef3-placeholder-image.jpg"
                                            }}
                                        />
                                    </div>
                                    <div className={style["item-description"]}>
                                        <h3>{item.title || item.itemName || "No Title"}</h3>
                                        <div className={style["price-rating"]}>
                                            <h2>${(Number(item.price || item.itemPrice) || 45).toFixed(2)}</h2>
                                            <span className={style.rating}>{item.itemRating || item.rating || 4.5} <p><IoStar /></p></span>
                                        </div>
                                        <div className={style["category-brand"]}>
                                            <span>Category : <b>{item.itemCategory || item.category || "No Category"}</b></span>
                                            <span>Brand : <b>{item.itemBrand || item.brand || "No Brand"}</b></span>
                                        </div>
                                        <div className={style["deleteBtn-qntyCtrl"]}>
                                            <div className={style["qnty-ctrl"]}>
                                                <span
                                                    onClick={() => handleQnty.mutate({ itemId: item._id, action: "dec" })}
                                                >-</span>
                                                <p className={style["selected-qnty"]}>{item.itemQnty}</p>
                                                <span
                                                    onClick={() => handleQnty.mutate({ itemId: item._id, action: "inc" })}
                                                >+</span>
                                            </div>
                                            <span className={style["delete-btn"]}
                                                onClick={() => handleCartDelete.mutate(item._id)}
                                            ><BiTrashAlt /></span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <h1 className={style["empty-msg"]}>Cart Is Empty!</h1>
                        )}
                    </div>
                </div>

                <div className={style["items-bill"]}>
                    <div className={style["bill-heading"]}>
                        <h1><span><MdReceiptLong /></span>Billing Details</h1>
                    </div>
                    <div className={style["discount-amount-wrapper"]}>
                        <div className={style["discount-container"]}>
                            <h2>Discount</h2>
                            <div className={style["discount-wrapper"]}>
                                <input type="text" name="discount_code"
                                    placeholder="Discount Code SAVE10"
                                    onChange={(e) => setDiscount(e.target.value.trim())}
                                />
                                <button className={style["apply-btn"]}
                                    onClick={() => {
                                        if (!discount || discount.trim() === "")
                                            return dispatch(setMessage({ message: "Enter Discount Code" }))
                                        handleDiscount.mutate(discount)
                                    }}
                                >Apply</button>
                            </div>
                        </div>
                        <div className={style["amount-container"]}>
                            <div className={style["download-btn"]}>
                                <button
                                    onClick={() => handleDownload()}
                                >Download Bill</button>
                            </div>
                            <div className={style["bill-amount"]}>
                                <div className={style["total-amount"]}>
                                    <span>Total</span>
                                    <p>${Number(prices?.total || 0).toFixed(2)}</p>
                                </div>
                                <div className={style["discount-amount"]}>
                                    <span>Discount</span>
                                    <p>${Number(prices?.discount || 0).toFixed(2)}</p>
                                </div>
                                <div className={style["final-amount"]}>
                                    <span>Final Amount</span>
                                    <p>${Number(prices?.finalAmount || 0).toFixed(2)}</p>
                                </div>
                            </div>
                            <div className={style["checkout-btn"]}>
                                <button onClick={() => cart.length >= 1 && navigate("/completed", { replace: true })} >Proceed To Checkout</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Notification />
        </>
    )
}

export default CartPage