import { SignInButton, SignUpButton, SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";

export default function Welcome() {
  return (
    <div className="relative bg-white dark:bg-gray-900">
      <div className="mx-auto max-w-7xl lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
        <div className="px-6 pb-24 pt-10 sm:pb-32 lg:col-span-7 lg:px-0 lg:pb-56 lg:pt-48 xl:col-span-6">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <img
              className="h-20 bg-white rounded-full"
              src="mta-logo.png"
              alt="Collage of meals made at the Mount Allison University Club"
            />
            <div className="hidden sm:mt-32 sm:flex lg:mt-16">
              <SignedOut>
                <div className="relative rounded-full px-3 py-1 text-m leading-6 text-gray-500 dark:text-gray-200 ring-1 ring-gray-900/10 hover:ring-gray-900/20">
                  Want to order some delicious meals?{" "}
                  <span className="whitespace-nowrap font-semibold text-red-700 hover:text-red-600">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <SignUpButton /> <span aria-hidden="true">&rarr;</span>
                  </span>
                </div>
              </SignedOut>
            </div>
            <h1 className="mt-24 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:mt-10 sm:text-6xl">
              Welcome to the University Club
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-200">
              We are a non-profit campus eats open to faculty, staff and alumni
              of Mount Allison University, located in the heart of campus.
            </p>
            <div className="mt-10 flex items-center gap-x-6">
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
                  className="text-sm font-semibold leading-6 text-gray-900 dark:text-gray-200 rounded-md hover:bg-amber-400 dark:hover:bg-amber-700 px-3.5 py-2.5 "
                >
                  Place Order Now!
                </Link>
              </SignedIn>
            </div>
          </div>
        </div>
        <div className="relative lg:col-span-5 lg:-mr-8 xl:absolute xl:inset-0 xl:left-1/2 xl:mr-0">
          <img
            src="food.png"
            className="rounded-md aspect-[3/2] w-full bg-gray-50 object-cover lg:absolute lg:inset-0 lg:aspect-auto lg:h-full"
            alt="Collage of images of food made at the University Club"
          />
        </div>
      </div>
    </div>
  );
}
