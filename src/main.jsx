import { createRoot } from 'react-dom/client'
import './pages style/App.css'
import App from "./pages/App.jsx"
import { RouterProvider } from 'react-router-dom'
import { Provider } from 'react-redux'
import myStore from './Redux/store.js'
import routes from './Routes.jsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={myStore}>
      <RouterProvider router={routes}>
        <App />
      </RouterProvider>
    </Provider>
  </QueryClientProvider>
)



