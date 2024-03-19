
import Image from "next/image";
import { Inter } from "next/font/google";
import Menu from "@/components/menu";
import type {MenuType} from "@/components/menu";
import Welcome from "@/components/welcome";

const inter = Inter({ subsets: ["latin"] });

export default function HomePage() {

  return (
    <main>
      <Welcome/>
    </main>
  )
}
