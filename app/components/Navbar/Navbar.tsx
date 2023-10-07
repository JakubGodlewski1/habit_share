import hero_friends from "../../../public/hero_friends.svg"
import Link from "next/link";
import Image from "next/image";
import NavbarMenu from "@/app/components/Navbar/NavbarMenu";
import Logo from "@/app/components/Navbar/Logo";

const Navbar = async () => {

   return (
       <nav className={`bg-secondary navbar shadow-[0_2px_6px_0_rgba(0,0,0,0.25)]`}>
          <Link className="mr-auto" href="/">
              <Logo/>
          </Link>
           <NavbarMenu/>
       </nav>
   )
};

export default Navbar;