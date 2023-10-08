"use client"
import {useEffect, useState} from "react";

import RepetitionOptions from "@/app/(pages)/(signedIn)/(my-habits)/components/RepetitionOptions";
import {useFirestore} from "@/app/hooks/useFirestore";
import {useAuthContext} from "@/app/hooks/useAuthContext";
import {convertDate} from "@/lib/convertDate";
import {calculateRepetitionDates} from "@/lib/calculateRepetitionDates";
import {Habit, HabitFormInputs} from "@/types";

const initialHabitFormInputsState:HabitFormInputs = {
    title:"",
    repetitionOption: {type:"repeat", repeatFrequency:"daily"}
}

type Props = {
    modalOpen: boolean,
    closeModal: ()=>void
}

const AddHabitForm = ({closeModal, modalOpen}:Props) => {

    //states
    const [habitFormInputs, setHabitFormInputs] = useState<HabitFormInputs>(initialHabitFormInputsState)
    const {title, repetitionOption} = habitFormInputs
    const [formError, setFormError] = useState<string | null>(null)

    //hooks
    const {user, userData} = useAuthContext()
    const {updateDocument, error, isPending} = useFirestore("users")

    useEffect(() => {
        if (!modalOpen){
            setHabitFormInputs(initialHabitFormInputsState)
        }
    }, [modalOpen]);

    const addHabit = async () => {
    if (Array.isArray(userData?.habits)){
        if (title.length > 2){
            const newHabit:Habit ={
                title,
                repetitionOption,
                completedToday: false,
                repetitionDates: calculateRepetitionDates(repetitionOption.type === "repeat" ? repetitionOption.repeatFrequency : repetitionOption.specificDaysFrequency),
                daysWhenCompleted: [],
                strike: 0,
                createdAt: convertDate(new Date()),
                points: 0
            }

            await updateDocument(user!.uid, {
                habits: [newHabit, ...userData!.habits]
            })
            closeModal()

        }else setFormError("The title must be at least 3 characters long")
    }
    }

    return (
        <form onSubmit={e=> {
            e.preventDefault()
            addHabit()
        }} className="standard-form h-[70vh] max-h-[550px] min-h-[345px]">
            <label>
                <span>Title</span>
                <input
                    value={title}
                    onChange={e=> {
                        setHabitFormInputs(p => ({...p, title: e.target.value}))
                        if (formError) setFormError(null)
                    }}
                    placeholder="New habit..."
                    className="input input-primary border-0"
                    type="text"
                />
            </label>
               <RepetitionOptions setHabitFormInputs={setHabitFormInputs} habitFormInputs={habitFormInputs}/>
            {error && <span className="alert-error alert">{error}</span>}
            {formError && <span className="alert-error alert">{formError}</span>}
            <button disabled={isPending} className="btn btn-primary mt-auto">{isPending ? "Adding..." : "Add Habit"}</button>
        </form>
    );
};

export default AddHabitForm;