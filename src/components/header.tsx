import PageHeader, { HeaderItem } from "@/components/page-header";
import { useUser } from "@clerk/nextjs";

const signedOutHeaderItems: HeaderItem[] = [
  { pageName: "Home", pageLink: "/" },
];

const signedInHeaderItems: HeaderItem[] = [
  { pageName: "Home", pageLink: "/" },
  { pageName: "Place Order", pageLink: "/order" },
];

export default  function Header() {
  const { isSignedIn, user, isLoaded } = useUser();
  const headerItems = isSignedIn ? signedInHeaderItems : signedOutHeaderItems;

  return <PageHeader headerItems={headerItems} />;
}
