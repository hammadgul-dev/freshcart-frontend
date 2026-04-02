import { useDispatch, useSelector } from "react-redux"
import style from "../components style/ProductFilter.module.css"
import { useState } from "react"
import { useEffect } from "react"
import { handleItemFilter } from "../Redux/Slice/FilterSlice"
import { useQuery } from "@tanstack/react-query"

function ProductFilter() {
  let dispatch = useDispatch()
  let cardViewSelector = useSelector(state => state.cardViewReducer.value)
  let [filter, setFilter] = useState({
    brand: null,
    category: null,
    sortType: null,
  })

  let { isLoading: groceryLoading, error: groceryError, data: grocery } = useQuery({
    queryKey: ["groceryData"], refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async () => {
      let apiData = await fetch(`${import.meta.env.VITE_BACKEND_API}/grocery`)
      return apiData.json()
    }
  })

  let { isLoading: productLoading, error: productError, data: product } = useQuery({
    queryKey: ["productData"], refetchOnWindowFocus: false,
    staleTime: Infinity,
    queryFn: async () => {
      let api = await fetch(`${import.meta.env.VITE_BACKEND_API}/product`)
      let apiData = await api.json()
      return apiData.products
    }
  })

  useEffect(() => {
    dispatch(handleItemFilter(
      {
        brand: filter.brand, category: filter.category,
        sortType: filter.sortType
      }
    ))
  }, [filter])

  return (
    <div className={style["filter-wrapper"]}>
      <div className={style.filter}>
        <select
          className={style["brand-select"]}
          onChange={(e) =>
            setFilter({ ...filter, brand: e.target.value.trim().toLowerCase() })}>
          <option value="select-brand">Select Brand</option>
          {cardViewSelector === "products"
            ? [...new Set(product?.map(p => p.brand || "No Brand"))].map(b => (
              <option key={b} value={b.trim().toLowerCase()}>{b}</option>
            ))
            : [...new Set(grocery?.map(g => g.brand || "No Brand"))].map(b => (
              <option key={b} value={b.trim().toLowerCase()}>{b}</option>
            ))
          }
        </select>
        <select
          className={style["category-select"]}
          onChange={(e) =>
            setFilter({ ...filter, category: e.target.value.trim().toLowerCase() })}
        >
          <option value="select-category">Select Category</option>
          {cardViewSelector === "products" ? (
            [...new Set(product?.map(p => p.category || "No Category"))].map(c => (
              <option key={c} value={c.trim().toLowerCase()}>{c}</option>
            ))
          ) : (
            [...new Set(grocery?.map(g => g.category || "No Category"))].map(c => (
              <option key={c} value={c.trim().toLowerCase()}>
                {c}
              </option>
            ))
          )}

        </select>
        <select
          className={style["select-sorting"]}
          onChange={(e) =>
            setFilter({ ...filter, sortType: e.target.value.trim().toLowerCase() })}
        >
          <option value="sorting-option">Sorting Options</option>
          <option value="a-to-z">Alphabetical (A - Z)</option>
          <option value="z-to-a">Alphabetical (Z - A)</option>
          <option value="high-to-low">High Price &uarr; </option>
          <option value="low-to-high">Low Price &darr; </option>
        </select>
      </div>
    </div>
  )
}

export default ProductFilter