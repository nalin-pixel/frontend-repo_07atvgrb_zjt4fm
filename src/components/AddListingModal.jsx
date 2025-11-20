import { useState } from 'react'

function AddListingModal({ open, onClose, onCreated }) {
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const form = new FormData(e.currentTarget)
    const payload = {
      title: form.get('title'),
      description: form.get('description') || undefined,
      price: parseFloat(form.get('price') || '0'),
      category: form.get('category') || 'Other',
      size: form.get('size') || undefined,
      brand: form.get('brand') || undefined,
      condition: form.get('condition') || undefined,
      images: form.get('image') ? [form.get('image')] : [],
      location: form.get('location') || undefined,
    }

    try {
      const res = await fetch(`${baseUrl}/api/listings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      if (!res.ok) throw new Error(`Failed: ${res.status}`)
      const data = await res.json()
      onCreated({ id: data.id, ...payload })
      onClose()
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold text-lg">List an item</h3>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800">✕</button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700">Title</label>
              <input name="title" required className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Brand</label>
              <input name="brand" className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Category</label>
              <select name="category" className="w-full border rounded-md px-3 py-2">
                <option>Dresses</option>
                <option>Tops</option>
                <option>Bottoms</option>
                <option>Outerwear</option>
                <option>Shoes</option>
                <option>Accessories</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Size</label>
              <input name="size" placeholder="XS, S, M, L, XL..." className="w-full border rounded-md px-3 py-2" />
            </div>
          </div>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-700">Price (USD)</label>
              <input type="number" step="0.01" name="price" required className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Condition</label>
              <select name="condition" className="w-full border rounded-md px-3 py-2">
                <option>New</option>
                <option>Like New</option>
                <option>Good</option>
                <option>Fair</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-700">Image URL</label>
              <input name="image" placeholder="https://" className="w-full border rounded-md px-3 py-2" />
            </div>
            <div>
              <label className="block text-sm text-gray-700">Location</label>
              <input name="location" placeholder="City, Country" className="w-full border rounded-md px-3 py-2" />
            </div>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-700">Description</label>
            <textarea name="description" rows="3" className="w-full border rounded-md px-3 py-2" placeholder="Add details like fit, fabric, flaws, etc." />
          </div>
          {error && (
            <div className="md:col-span-2 text-sm text-red-600">{error}</div>
          )}
          <div className="md:col-span-2 flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-md border">Cancel</button>
            <button disabled={loading} className="px-4 py-2 rounded-md bg-pink-600 text-white font-semibold">
              {loading ? 'Listing...' : 'Create listing'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddListingModal
