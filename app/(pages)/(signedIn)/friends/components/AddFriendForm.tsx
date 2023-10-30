"use client"
import {FormEvent,  useState} from "react";
import {useAddFriend} from "@/app/hooks/useAddFriend";

const AddFriendForm = ({closeModal}:{closeModal:()=>void}) => {
    const [friendEmail, setFriendEmail] = useState("")
    const {addFriend, isPending, error} = useAddFriend()

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const {error} = await addFriend(friendEmail)
        if (!error) {
            setFriendEmail("")

            closeModal()
        }
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
            {error && <span className="alert-error alert">{error}</span>}
            <button disabled={isPending} className="btn btn-primary mt-auto">
                {isPending ? "Adding the friend" : "Add the friend"}
            </button>
        </form>
    );
};

export default AddFriendForm;