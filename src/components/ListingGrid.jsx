import ListingCard from './ListingCard'

function ListingGrid({ items, isLoading }) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="border border-gray-200 rounded-xl bg-white p-3 animate-pulse">
            <div className="aspect-square bg-gray-200 rounded-md" />
            <div className="h-4 bg-gray-200 rounded w-2/3 mt-3" />
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-2" />
          </div>
        ))}
      </div>
    )
  }

  if (!items || items.length === 0) {
    return (
      <div className="text-center text-gray-600 bg-white border border-dashed border-gray-300 rounded-xl p-10">
        No items found. Try adjusting your search or category.
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {items.map((item) => (
        <ListingCard key={item.id} item={item} />
      ))}
    </div>
  )
}

export default ListingGrid
