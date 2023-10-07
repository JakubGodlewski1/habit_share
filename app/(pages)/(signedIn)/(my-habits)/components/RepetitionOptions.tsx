"use client"
import React, {Dispatch, SetStateAction} from 'react';
import ToggleBtns from "@/app/(pages)/(signedIn)/(my-habits)/components/ToggleBtns";
import MultiSelect from "@/app/(pages)/(signedIn)/(my-habits)/components/MultiSelect";
import Dropdown from "@/app/(pages)/(signedIn)/(my-habits)/components/Dropdown";


type Props = {
    habitFormInputs: HabitFormInputs,
    setHabitFormInputs:  Dispatch<SetStateAction<HabitFormInputs>>,
}
const RepetitionOptions = ({habitFormInputs, setHabitFormInputs}:Props) => {

    const setType = (type:"repeat" | "specific days") => {

        if (habitFormInputs.repetitionOption.type === "repeat"){
            if (type === "repeat")return
            setHabitFormInputs(p=>({...p, repetitionOption:{type: "specific days", specificDaysFrequency:["M"]}}))

        }
        if (habitFormInputs.repetitionOption.type === "specific days"){
            if (type === "specific days")return
            setHabitFormInputs(p=>({...p, repetitionOption:{type: "repeat", repeatFrequency:"daily"}}))
        }
    }

    const setActiveElements = (el:"M" | "T" | "W" | "R" | "F" | "S" | "U") => {
            if (habitFormInputs.repetitionOption.type==="specific days"){
                let activeElements = [...habitFormInputs.repetitionOption.specificDaysFrequency]
                const initialActiveElementsLength = activeElements.length
                //don't deselect if only one btn is selected
                if (activeElements.includes(el) && activeElements.length===1)return
                //deselect if more than 1 btn is selected
                else if (activeElements.includes(el) && activeElements.length>1) {
                    activeElements = activeElements.filter(a => a !== el)
                }
                //select clicked element
               else if (!activeElements.includes(el))activeElements.push(el)

                //if initialActiveElementsLength changed, update proper state
                if (initialActiveElementsLength !== activeElements.length){
                    setHabitFormInputs(p=>(
                        {...p, repetitionOption:{type: "specific days", specificDaysFrequency:activeElements}}
                    ))
                }
            }
    }

    const setSelectedOption = (option:"daily"| "weekly"| "monthly") => {
            if (habitFormInputs.repetitionOption.type === "repeat"){
                if (habitFormInputs.repetitionOption.repeatFrequency !== option){
                    setHabitFormInputs(p=>(
                        {...p, repetitionOption:{type: "repeat", repeatFrequency:option}}
                    ))
                }
            }
    }

    return (
        <>
            <span>How often</span>
            <ToggleBtns
                setActive={setType}
                active={habitFormInputs.repetitionOption.type === "repeat" ? "label1" : "label2"}
                label1="repeat" label2="specific days"
            />
            {habitFormInputs.repetitionOption.type === "repeat" &&
                <Dropdown
                    selectedOption={habitFormInputs.repetitionOption.repeatFrequency}
                    allOptions={["daily", "weekly", "monthly"]}
                    setSelectedOption={setSelectedOption}
                />
            }
            {
                habitFormInputs.repetitionOption.type  === "specific days" &&
                <MultiSelect
                    setActiveElements={setActiveElements}
                    allElements={["M","T","W", "R", "F", "S", "U"]}
                    activeElements={habitFormInputs.repetitionOption.specificDaysFrequency}
                />
            }
        </>
    );
};

export default RepetitionOptions;