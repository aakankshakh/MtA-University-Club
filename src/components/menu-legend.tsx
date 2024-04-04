// The legend for vegan, gluten free, etc. options.

export default function MenuLegend() {
  return (
    <main className="italic">
      <h2 className="font-medium text-xl"> Legend: </h2>
      <span className="mx-2">
        <button className="mr-2 bg-blue-500 font-bold text-white px-2 py-1 rounded">
            V
          </button>: Vegetarian</span>
      <span className="mx-2">
         <button className="mr-2 font-bold bg-green-500 text-white px-2 py-1 rounded">
            v
          </button>: Vegan</span>
      <span className="mx-2">
        <button className="bg-yellow-500 font-bold text-white px-2 py-1 rounded">
            gf
          </button>: Gluten-Free</span>
      <span className="mx-2">
        <button className="bg-orange-500 font-bold text-white px-2 py-1 rounded">
            df </button> : dairy free</span>
    </main>
  );
}
