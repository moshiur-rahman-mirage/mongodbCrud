import { useLoaderData } from "react-router-dom";

const Update = () => {
    const loadedUser = useLoaderData();

    const handleUpdateUser=event=>{
        event.preventDefault();
        const form=event.target;
        const name=form.name.value;
        const email=form.email.value;
        const user={name,email}
        console.log(user)

        fetch(`http://localhost:5000/users/${loadedUser._id}`,{
            method:'PUT',
            headers:{
            'content-type':'application/json',
        },
        body:JSON.stringify(user)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }

    return (
        <div>
            {/* onSubmit={handleUpdateUser}  */}
            updating user of {loadedUser.name}
            <form onSubmit={handleUpdateUser}   className='display:flex;'>
                <input type='text' name="name" id="name" defaultValue={loadedUser?.name} />
                <br></br>
                <input type='text' name="email" id="email" defaultValue={loadedUser?.email} />
                <input type='submit' value="Update User" />
            </form>
        </div>
    );
};

export default Update;