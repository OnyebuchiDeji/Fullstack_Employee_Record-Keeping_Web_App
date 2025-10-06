import {useState} from "react"

/**
 * For interactions with the database.
 * 1. To create new contacts!
 * 2. To implement Updating
 */


const ContactForm = ({existingContact = {}, updateCallback}) => {
    //  Need state of form first, for all three require variables
    //  USe existing contact's details if they exist hence the || OR, otherwise an empty string
    const [firstName, setFirstName] = useState(existingContact.firstName || "");
    const [lastName, setLastName] = useState(existingContact.lastName || "");
    const [email, setEmail] = useState(existingContact.email || "");

    const updating  = Object.entries(existingContact).length !== 0;

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
        //  2. Make it dynamic
        const url = "http://127.0.0.1:5000/" + (updating? `update_contact/${existingContact.id}`: "create_contact");
        //  When not doing a GET request, one has to specify different options
        const options = {
            method: updating? "PATCH" : "POST",
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
            //  Call update callback!
            //  Tells that it has been finished, either the modal or create operatin
            //  It then closes the modal
            updateCallback();
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
            {/* Dynamic button rendering */}
            <button type="submit">{updating ? "Update" : "Create"}</button>
        </form>
    );

};

export default ContactForm;