import PageHeader, { HeaderItem } from "@/components/page-header";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";


const signedOutHeaderItems: HeaderItem[] = [
  { pageName: "Home", pageLink: "/" }
];

const signedInCustomerHeaderItems: HeaderItem[] = [
  { pageName: "Home", pageLink: "/" },
  { pageName: "Place Order", pageLink: "/order" }
];

const signedInChefHeaderItems: HeaderItem[] = [
  { pageName: "Home", pageLink: "/" },
  { pageName: "Place Order", pageLink: "/order" },
  { pageName: "Create Menu", pageLink: "/create-menu" }
];

export default function Header() {
  const [isChef, setIsChef] = useState(false);
  const { isSignedIn, user, isLoaded } = useUser();
  const headerItems = isChef ? signedInChefHeaderItems : isSignedIn ? signedInCustomerHeaderItems :signedOutHeaderItems;

  useEffect(() => {
    fetch("/api/is-chef").then((res) => res.json()).then((data) => data.isChef).then((isChef) => setIsChef(isChef));
  })

  return <PageHeader headerItems={headerItems} />;
}
