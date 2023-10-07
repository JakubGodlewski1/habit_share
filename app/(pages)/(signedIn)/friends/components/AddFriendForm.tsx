"use client"
import {FormEvent,  useState} from "react";

const AddFriendForm = ({closeModal}:{closeModal:()=>void}) => {
    const [friendEmail, setFriendEmail] = useState("")

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        closeModal()
    }

    return (
        <form onSubmit={handleSubmit} className="standard-form h-52">
            <label>
                <span>Friend&apos;s email</span>
                <input
                    value={friendEmail}
                    onChange={e=> setFriendEmail(e.target.value)}
                    placeholder="Your friend' email"
                    className="input input-primary border-0"
                    type="text"
                />
            </label>
            <button className="btn btn-primary mt-auto">Add the friend</button>
        </form>
    );
};

export default AddFriendForm;