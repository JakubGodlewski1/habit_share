import {ReactNode,  useState} from "react";

type Props ={
    allOptions:string[],
    selectedOption: string,
    setSelectedOption: (option:any)=>void
}

const Dropdown = ({allOptions, selectedOption, setSelectedOption}:Props) => {
    const [dropdownOpen, setDropdownOpen] = useState(false)

    const handleOptionClick = (option:string) => {
        setSelectedOption(option)
        setDropdownOpen(false)
    }

    //custom details component, because setting open attribute to true or false does not work as expected
    const Details = ({children}:{ children:ReactNode}) => {
        if (dropdownOpen)return <details open>{children}</details>
        if (!dropdownOpen)return <details>{children}</details>
    }



    return (
        <ul className="menu bg-accent rounded-lg">
            <li>
                <Details>
                    <summary onClick={()=>setDropdownOpen(true)}>{selectedOption}</summary>
                    {allOptions.filter(o=>o!==selectedOption).map(op=>(
                        <li onClick={()=>handleOptionClick(op)} key={op}><button className="w-full">{op}</button></li>
                    ))}
                </Details>
            </li>
        </ul>
    );
};

export default Dropdown;