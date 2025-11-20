import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ListingGrid from './components/ListingGrid'
import AddListingModal from './components/AddListingModal'

function App() {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('All')
  const [query, setQuery] = useState('')

  const categories = ['All', 'Dresses', 'Tops', 'Bottoms', 'Outerwear', 'Shoes', 'Accessories']

  const fetchItems = async (opts = {}) => {
    const params = new URLSearchParams()
    if (opts.category && opts.category !== 'All') params.append('category', opts.category)
    if (opts.q) params.append('q', opts.q)

    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/api/listings?${params.toString()}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      setItems(data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchItems({ category: activeCategory, q: query })
  }, [])

  const onSearch = (q) => {
    setQuery(q)
    fetchItems({ category: activeCategory, q })
  }

  const onCategory = (cat) => {
    setActiveCategory(cat)
    fetchItems({ category: cat, q: query })
  }

  const onCreated = (item) => {
    setItems((prev) => [item, ...prev])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar onAddClick={() => setModalOpen(true)} />

      <Hero onSearch={onSearch} />

      <section className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Browse listings</h2>
        </div>
        <div className="flex items-center gap-2 overflow-auto pb-2 mb-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => onCategory(c)}
              className={`px-3 py-1.5 rounded-full border text-sm ${activeCategory === c ? 'bg-pink-600 text-white border-pink-600' : 'bg-white text-gray-700 border-gray-200 hover:border-gray-300'}`}
            >
              {c}
            </button>
          ))}
        </div>

        <ListingGrid items={items} isLoading={loading} />
      </section>

      <footer className="py-10 text-center text-sm text-gray-500">
        Built with love for sustainable fashion ♻️
      </footer>

      <AddListingModal open={modalOpen} onClose={() => setModalOpen(false)} onCreated={onCreated} />
    </div>
  )
}

export default App
