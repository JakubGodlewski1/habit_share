"use client"
import {useState} from "react";

const CompleteHabitBtn = () => {
    const [completed, setCompleted] = useState(false)

    return (
        <input onChange={e=>setCompleted(e.target.checked)} type="checkbox" className="checkbox checkbox-accent" />
    );
};

export default CompleteHabitBtn;