"use client"
import {FormEvent,  useState} from "react";

import RepetitionOptions from "@/app/(pages)/(signedIn)/(my-habits)/components/RepetitionOptions";
import {HabitFormInputs} from "@/types";

const UpdateHabitForm = ({closeModal}:{closeModal:()=>void}) => {
    const [habitFormInputs, setHabitFormInputs] = useState<HabitFormInputs>({
        title:"",
        repetitionOption: {type:"repeat", repeatFrequency:"daily"}
    })

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        closeModal()
    }

    return (
        <form onSubmit={handleSubmit} className="standard-form h-[70vh] max-h-[550px] min-h-[345px]">
            <label>
                <span>Title</span>
                <input
                    onChange={e=>
                        setHabitFormInputs(p=>({...p,title:e.target.value}))}
                    placeholder="Update habit title"
                    className="input input-primary border-0"
                    type="text"
                />
            </label>
            <RepetitionOptions setHabitFormInputs={setHabitFormInputs} habitFormInputs={habitFormInputs}/>
            <div className="join mt-auto">
                <button className="join-item btn btn-primary">update habit</button>
                <button className="join-item btn btn-error">Delete habit</button>
            </div>
        </form>
    );
};

export default UpdateHabitForm;