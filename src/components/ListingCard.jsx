function ListingCard({ item }) {
  return (
    <div className="group border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition-shadow">
      <div className="aspect-square bg-gray-100 overflow-hidden">
        <img src={(item.images && item.images[0]) || 'https://images.unsplash.com/photo-1520975922215-cf1bd258695e?q=80&w=800&auto=format&fit=crop'} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
      </div>
      <div className="p-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold line-clamp-1">{item.title}</h3>
          <span className="font-bold">${item.price}</span>
        </div>
        <div className="text-sm text-gray-500 mt-1 flex items-center justify-between">
          <span>{item.brand || '—'}</span>
          <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-md">{item.size || '—'}</span>
        </div>
      </div>
    </div>
  )
}

export default ListingCard
