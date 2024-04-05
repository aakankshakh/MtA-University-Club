import Header from "@/components/header";
import Menu from "@/components/menu";
import { MenuType } from "@/lib/types";
import { useEffect, useState } from "react";

export default function ViewMenuPage() {
  const [menu, setMenu] = useState<MenuType>();
  useEffect(() => {
    if (menu) {
      console.log(menu);
      return;
    }

    fetch("/api/get-todays-menu")
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          setMenu(undefined);
        } else {
          setMenu(data);
        }
      })
      .catch((error) => {
        console.log(error);
        setMenu(undefined);
      });
  }, [menu]);

  if (menu == undefined) {
    return (
      <main>
        <Header />
        <h1 className="m-32 font-bold text-3xl text-center">
          The MtA University Club Menu has not been published yet for today,
          please come back later!
        </h1>
      </main>
    );
  } else {
    return (
      <main>
        <Header />
        <Menu beingOrdered={false} menu={menu} />
      </main>
    );
  }
}
