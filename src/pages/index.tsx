import Welcome from "@/components/welcome";
import { useEffect } from "react";

export default function HomePage() {

  useEffect(() => {
    fetch("/api/get-all-orders").then((res) => res.json()).then((data) => console.log(data));

  })
  return (
    <main>
      <Welcome />
    </main>
  );
}
