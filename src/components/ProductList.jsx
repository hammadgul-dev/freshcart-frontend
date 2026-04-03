import { useSelector } from "react-redux"
import style from "../components style/ProductList.module.css"
import ProductCard from "./ProductCard"
import { useQuery } from "@tanstack/react-query"
import { Ring } from 'ldrs/react'
import 'ldrs/react/Ring.css'

function ProductList() {
  const selectedBrand = useSelector(state => state.filterReducer.brand)
  const selectedCategory = useSelector(state => state.filterReducer.category)
  const sortType = useSelector(state => state.filterReducer.sortType)
  const cardViewSelector = useSelector(state => state.cardViewReducer.value)
  const userSearch = useSelector(state => state.filterReducer.searchTxt)

  let { isLoading: groceryLoading, error: groceryError, data: groceries = [] } = useQuery({
    queryKey: ["groceryData"], refetchOnWindowFocus: false,
    retry: 3,
    queryFn: async () => {
      let apiData = await fetch(`${import.meta.env.VITE_BACKEND_API}/grocery`)
      let data = await apiData.json()
      return Array.isArray(data) ? data : []
    }
  })

  let { isLoading: productLoading, error: productError, data: products = [] } = useQuery({
    queryKey: ["productData"], refetchOnWindowFocus: false,
    retry: 3,
    queryFn: async () => {
      let api = await fetch(`${import.meta.env.VITE_BACKEND_API}/product`)
      let apiData = await api.json()
      return Array.isArray(apiData.products) ? apiData.products : []
    }
  })

  if (productLoading || groceryLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '50px' }}>
        <Ring
          size="40"
          stroke="5"
          bgOpacity="0"
          speed="1"
          color="black"
        />
      </div>
    )
  }


  function applyFiltersAndSort(list, isProduct = true) {
    let data = [...list]

    if (userSearch) {
      data = data.filter(item =>
        (isProduct ? item.title : item.name)?.toLowerCase().includes(userSearch.toLowerCase())
      )
    }
    if (selectedBrand && selectedBrand !== "select-brand") {
      data = data.filter(item => item.brand?.toLowerCase() === selectedBrand
      )
    }
    if (selectedCategory && selectedCategory !== "select-category") {
      data = data.filter(item => item.category?.toLowerCase() === selectedCategory)
    }

    switch (sortType) {
      case "a-to-z":
        data.sort((a, b) => (isProduct ? a.title : a.name)
          .localeCompare(isProduct ? b.title : b.name)
        )
        break

      case "z-to-a":
        data.sort((a, b) => (isProduct ? b.title : b.name)
          .localeCompare(isProduct ? a.title : a.name)
        )
        break

      case "low-to-high":
        data.sort((a, b) => Number(a.price) - Number(b.price))
        break

      case "high-to-low":
        data.sort((a, b) => Number(b.price) - Number(a.price))
        break
    }

    return data
  }

  function handleList() {
    if (cardViewSelector === "products") {
      if (!products?.length) return <h2 className={style["empty-msg"]}>Products Not Available</h2>
      const finalProducts = applyFiltersAndSort(products, true)

      if (!finalProducts.length)
        return <h2 className={style["empty-msg"]}>Product Not Found</h2>
      return finalProducts.map(p =>
        <ProductCard key={p.id} data={p} />
      )
    }
    if (cardViewSelector === "groceries") {
      if (!groceries?.length) return <h2 className={style["empty-msg"]}>Groceries Not Available</h2>
      const finalGroceries = applyFiltersAndSort(groceries, false)
      if (!finalGroceries.length)
        return <h2 className={style["empty-msg"]}>Groceries Not Found</h2>
      return finalGroceries.map(g =>
        <ProductCard key={g._id} data={g} />
      )
    }
  }

  return (
    <div className={style["product-list"]}>
      {handleList()}
    </div>
  )
}

export default ProductList



import { LineWobble } from 'ldrs/react'
import 'ldrs/react/LineWobble.css'

<LineWobble
  size="80"
  stroke="5"
  bgOpacity="0.1"
  speed="1.75"
  color="black"
/>