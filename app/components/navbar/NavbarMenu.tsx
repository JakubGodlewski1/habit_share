"use client"
import Link from "next/link";
import SignOutBtn from "@/app/components/navbar/signOutBtn";
import {usePathname, useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import {GrMenu} from "react-icons/gr";
import {useAuthContext} from "@/app/hooks/useAuthContext";


const links = [

    {
        url: "/",
        title: "My habits",
        loggedIn: true
    },
    {
        url: "/friends",
        title: "Friends",
        loggedIn: true
    },
    {
        url: "/sign-in",
        title: "Sign in",
        loggedIn: false

    },
    {
        url: "/sign-up",
        title: "Sign up",
        loggedIn: false
    }
]

//styles
const sidebarStyles = "menu-vertical absolute bg-secondary z-50 top-0 right-0 h-screen w-52 shadow-[0_2px_6px_0_rgba(0,0,0,0.25)] items-start transition-all"
const navbarStyles = "md:menu-horizontal md:static md:h-auto md:w-auto md:shadow-none"

const NavbarMenu = () => {
    //hooks
    const pathname = usePathname()
    const router = useRouter()
    const {user,authIsReady}=useAuthContext()

    const [sidebarOpen, setSidebarOpen] = useState(false)
    useEffect(() => {
        setSidebarOpen(false)
    }, [pathname]);


    if (!authIsReady ){
        return <div>loading...</div>
    }



    return (
        <div>
            <button className="md:hidden" onClick={()=>setSidebarOpen(true)}>
                <GrMenu size={26}/>
            </button>
            <ul style={{right: sidebarOpen ? "0" : "-224px"}} className={`menu ${navbarStyles} ${sidebarStyles}`}>
                <button onClick={()=>setSidebarOpen(false)} className="md:hidden absolute top-0 right-0 p-2">X</button>
                {links.filter(l=>user ? l.loggedIn : !l.loggedIn).map(link=>
                    (<li onClick={() => {
                            router.push(link.url)
                            setSidebarOpen(false)
                        }} key={link.url}>
                            <Link
                                className={pathname === link.url ? "btn btn-sm btn-primary" : ""}
                                href={link.url}>{link.title}</Link>
                        </li>
                    )
                )}
                {user && <li onClick={()=>setSidebarOpen(false)}><SignOutBtn/></li>}
            </ul>
        </div>
    );
};

export default NavbarMenu;