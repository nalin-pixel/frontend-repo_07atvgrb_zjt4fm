function Hero({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault()
    const q = new FormData(e.currentTarget).get('q')
    onSearch(q)
  }

  return (
    <section className="bg-gradient-to-b from-pink-50 to-white">
      <div className="max-w-6xl mx-auto px-4 py-12 md:py-16">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-gray-900">
              Buy and sell pre-loved women's fashion
            </h1>
            <p className="mt-4 text-gray-600">
              Discover quality second-hand clothes from real people. Save money, reduce waste, and look amazing.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex gap-2">
              <input name="q" placeholder="Search dresses, tops, brands..." className="flex-1 border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-pink-500 outline-none" />
              <button className="bg-pink-600 hover:bg-pink-700 text-white font-semibold px-4 py-2 rounded-md">Search</button>
            </form>
            <div className="mt-3 text-sm text-gray-500">
              Popular: Dresses, Zara, Size M, Coats
            </div>
          </div>
          <div className="hidden md:block">
            <div className="relative">
              <img src="https://images.unsplash.com/photo-1514996937319-344454492b37?q=80&w=1200&auto=format&fit=crop" alt="Fashion" className="rounded-xl shadow-2xl" />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-lg shadow p-3 text-sm">
                🌿 1,200kg textiles saved this month
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Hero
