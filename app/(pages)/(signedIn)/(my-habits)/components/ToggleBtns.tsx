"use client"
import {capitalizeWord} from "@/lib/capitalizeWord";

type Props = {
    label1: string,
    label2: string,
    small?: boolean,
    active: "label1" | "label2",
    setActive: (label:any)=>void
}

const ToggleBtns = ({label1, label2, small=false, active, setActive}:Props) => {

    //active styles
    const activeStyle = "hover:bg-accent btn-accent shadow opacity-100 z-10"
    const inactiveStyle = "opacity-60 z-0"

    return (
            <div className="join flex">
                <button type="button" onClick={()=>setActive(label1)} className={`hover:scale-[1.02] join-item btn flex-grow ${active==='label1' ? activeStyle : inactiveStyle} ${small && "btn-sm"}`}>{capitalizeWord(label1)}</button>
                <button type="button"  onClick={()=>setActive(label2)} className={`hover:scale-[1.02] join-item btn flex-grow ${active==='label2' ? activeStyle : inactiveStyle} ${small && "btn-sm"}`}>{capitalizeWord(label2)}</button>
            </div>
    );
};

export default ToggleBtns;