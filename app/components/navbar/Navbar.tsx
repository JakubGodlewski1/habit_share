
import Link from "next/link";
import NavbarMenu from "@/app/components/navbar/NavbarMenu";
import Logo from "@/app/components/navbar/Logo";
import ProfilePicture from "@/app/components/navbar/ProfilePicture";

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