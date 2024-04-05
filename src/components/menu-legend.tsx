// The legend for vegan, gluten free, etc. options.

export default function MenuLegend() {
  return (
    <main>
      <h2 className="font-medium text-xl italic">Legend</h2>
      <div className="flex flex-col lg:flex-row mt-2">
        <span className="my-2 lg:mr-2">
          <button className="mr-2 bg-blue-500 font-bold text-white px-2 py-1 rounded">
            V
          </button>
          Vegetarian
        </span>
        <span className="my-2 lg:mx-2">
          <button className="mr-2 bg-green-500 font-bold text-white px-2 py-1 rounded">
            v
          </button>
          Vegan
        </span>
        <span className="my-2 lg:mx-2">
          <button className="mr-2 bg-yellow-500 font-bold text-white px-2 py-1 rounded">
            gf
          </button>
          Gluten-Free
        </span>
        <span className="my-2 lg:mx-2">
          <button className="mr-2 bg-orange-500 font-bold text-white px-2 py-1 rounded">
            df
          </button>
          Dairy-Free
        </span>
      </div>
    </main>
  );
}
