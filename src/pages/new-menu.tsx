// Place for the staff to create a new menu, by adding new items to it, reviewing it, and finalizing it as that day's menu
// We also want them to be able to access a list of previous meals they've made - a component here would be helpful
// use isModifiable boolean value to determine 
// FUTURE TO DO: add different sections for drinks, meal, dessert
export default function newMenuPage(){
    return (
        <main>
            
            <h1 className="font-bold text-center text-5xl">
                New Menu Creation
            </h1>

            <label className="block">
  <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block text-sm font-medium text-slate-700">
    Email
  </span>
  <input type="email" name="email" className="mt-1 px-3 py-2 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block w-full rounded-md sm:text-sm focus:ring-1" placeholder="you@example.com" />
</label>

            <input className="" type="text" placeholder="Menu Item Name"/>
            
            <label>
                <input type="text" placeholder="Menu Item Price"/>
                
                </label>
            

        </main>
    )
}