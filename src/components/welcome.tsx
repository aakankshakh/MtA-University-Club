
import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 bg-cover bg-no-repeat bg-center" style={{ backgroundImage: "url(food.png)" }} />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center items-center bg-black bg-opacity-50 text-white">
        {/* Top right corner container */}
        <div className="absolute top-10 right-10 lg:right-20">
          <div className="flex items-center gap-x-6">
            <Link
              href="/menu"
              className="rounded-md bg-red-900 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-red-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-900"
            >
              View Menu
            </Link>
            <SignedOut>
              <p className="text-sm font-semibold leading-6 rounded-md hover:bg-amber-400 dark:hover:bg-amber-700 px-3.5 py-2.5 ">
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
            </SignedIn>
          </div>
        </div>

        {/* Main content */}
        <div className="text-center">
          <img
            className="h-20 bg-white rounded-full absolute top-10 left-10"
            src="mta-logo.png"
            alt="Collage of meals made at the Mount Allison University Club"
          />
          <h1 className="mt-16 text-4xl font-bold tracking-tight sm:mt-10 sm:text-6xl">
            Welcome to the University Club
          </h1>
          <p className="mt-6 text-lg leading-8">
            We are a non-profit campus eats open to faculty, staff and alumni
            of Mount Allison University, located in the heart of campus.
          </p>

          {/* Sign-up area */}
          <div className="hidden sm:mt-16 sm:flex lg:mt-8">
            <SignedOut>
              <div className="relative rounded-full px-3 py-1 text-lg leading-6 text-red-700 dark:text-red-400 bg-white dark:bg-gray-900 ring-1 ring-red-700/10 hover:ring-red-700/20">
                Want to order some delicious meals?{" "}
                <span className="whitespace-nowrap font-semibold text-red-700 hover:text-red-600">
                  <span className="absolute inset-0" aria-hidden="true" />
                  <SignUpButton /> <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </SignedOut>
          </div>
        </div>
      </div>
    </div>
  );
}
