import ViewMenuPage from "@/pages/view-menu"
import Link from "next/link"

const handleMenuClick = () => {
  return (
    <ViewMenuPage/>
  )
}

export default function Welcome(){
    return (
        <main>
      <div className="flex justify-between p-4 text-white font-medium">
        <Link href={"/view-menu"}>
        <button className="px-4 py-2 bg-blue-500 rounded-full">
          View Menu
        </button>
        </Link>
        <div className="space-x-4">
          <Link href={"/sign-in"}>
          <button className="px-4 py-2 bg-green-500  rounded-full">
            Sign In
          </button>
          </Link>
          <Link href={"\sign-up"}>
          <button className="px-4 py-2 bg-red-500 rounded-full">
            Sign Up
          </button>
          </Link>
          <Link href="guest">
          <button className="px-4 py-2 bg-gray-500 rounded-full" >
            Continue as Guest
          </button>
          </Link>
        </div>
      </div>
      <div className="text-center my-8">
        <h1 className="text-4xl font-semibold mb-4">Welcome to Our Club!</h1>
        <p className="text-lg text-gray-700">
          Welcome to our club app where you can order delicious meals

        </p>
      </div>
      {/* Menu component can be added here */}
    </main>
    )
}