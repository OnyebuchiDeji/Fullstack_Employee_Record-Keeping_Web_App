import {useState} from "react"

/**
 * For interactions with the database.
 * 1. To create new contacts!
 * 
 */


const ContactForm = ({}) => {
    //  Need state of form first, for all three require variables
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");

    const onSubmit = async (e) => {
        //   This removes the standard behaviour of refreshing the page automatically 
        e.preventDefault()

        //  Then set up POST request data
        //  This is a JS object
        const data = {
            firstName, 
            lastName,
            email
        };

        //  URL to go to
        const url = "http://127.0.0.1:5000/create_contact";
        //  When not doing a GET request, one has to specify different options
        const options = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        };

        //  Send the request
        const response = await fetch(url, options);
        //  If response was not valid, alert user
        if (response.status !== 201 && response.status !== 200)
        {
            const data = await response.json()
            alert(data.message)
        }
        else{
            //  Success!
        }
    }

    return (
        <form onSubmit={onSubmit}>
        
            <div>
                <label htmlFor="firstName">First Name:</label>
                <input
                    type="text"
                    id="firstName"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="lastName">Last Name:</label>
                <input
                    type="text"
                    id="lastName"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)} 
                />
            </div>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)} 
                />
            </div>
            <button type="submit">Create Contact</button>
        </form>
    );

};

export default ContactForm;