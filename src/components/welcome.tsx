import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(food.png)" }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
        {/* Top right corner container */}
        <div className="absolute top-4 right-4 sm:top-10 sm:right-10 lg:right-20 flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="/menu"
            className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
          >
            View Menu
          </Link>
          <SignedOut>
            <p className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 rounded-md hover:bg-amber-400 dark:hover:bg-amber-700 px-3.5 py-2.5 ">
              <SignInButton /> <span aria-hidden="true">&rarr;</span>
            </p>
          </SignedOut>
          <SignedIn>
            <Link
              href="/order"
              className="text-sm font-semibold leading-6 rounded-md hover:bg-amber-400 dark:hover:bg-amber-700 px-3.5 py-2.5 "
            >
              Place Order Now!
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Main content */}
        <div className="text-center">
          <img
            className="h-14 sm:h-20 bg-white rounded-full absolute top-4 sm:top-10 left-4 sm:left-10"
            src="mta-logo.png"
            alt="Collage of meals made at the Mount Allison University Club"
          />
          <h1 className="mt-16 sm:mt-10 text-4xl sm:text-6xl font-bold tracking-tight">
            <span className="outline-white">Welcome to the University Club</span>
          </h1>
          <p className="mt-4 sm:mt-6 text-lg sm:text-xl leading-7">
            <span className="outline-white">We are a non-profit campus eats open to faculty, staff and alumni of Mount Allison University, located in the heart of campus.</span>
          </p>
        </div>
      </div>
    </div>
  );
}
