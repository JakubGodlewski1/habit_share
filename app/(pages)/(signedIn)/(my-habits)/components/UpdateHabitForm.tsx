"use client"
import {useEffect, useState} from "react";

import RepetitionOptions from "@/app/(pages)/(signedIn)/(my-habits)/components/RepetitionOptions";
import {Habit, HabitFormInputs} from "@/types";
import {useFirestore} from "@/app/hooks/useFirestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";

type Props = {
    closeModal:()=>void,
    habit: Habit,
    resetState: boolean
}


const UpdateHabitForm = ({closeModal, habit, resetState}:Props) => {
    const initialHabitFormInputs = {
        title:habit.title,
        repetitionOption: habit.repetitionOption
    }

    const {user, userData} = useAuthContext()
    const {updateDocument, error } = useFirestore("users")
    const [habitFormInputs, setHabitFormInputs] = useState<HabitFormInputs>(initialHabitFormInputs)

    const updateHabit = async () => {
        const {error} = await updateDocument(user?.uid!, {habits: userData?.habits.map(h=>h.title!==habit.title ?
                h
                :
                {...h, title: habitFormInputs.title, repetitionOption: habitFormInputs.repetitionOption})})
        if (!error) {
            closeModal()
        }
    }

    const deleteHabit = async () => {
        const {error} = await updateDocument(user?.uid!, {habits: userData?.habits.filter(h=>h.title !== habit.title)})
        if (!error) {
            closeModal()
        }
    }
    //reset the state
    useEffect(() => {
        if (resetState)setHabitFormInputs(initialHabitFormInputs)
    }, [resetState]);

    return (
        <form onSubmit={e=>e.preventDefault()} className="standard-form h-[70vh] max-h-[550px] min-h-[345px]">
            <label>
                <span>Title</span>
                <input
                    value={habitFormInputs.title}
                    onChange={e=>
                        setHabitFormInputs(p=>({...p,title:e.target.value}))}
                    placeholder="Update habit title"
                    className="input input-primary border-0"
                    type="text"
                />
            </label>
            <RepetitionOptions setHabitFormInputs={setHabitFormInputs} habitFormInputs={habitFormInputs}/>
            <div className="join mt-auto">
                <button onClick={updateHabit} className="join-item btn btn-primary">update habit</button>
                <button onClick={deleteHabit} className="join-item btn btn-error">Delete habit</button>
            </div>
            {error && <span>{error}</span>}
        </form>
    );
};

export default UpdateHabitForm;