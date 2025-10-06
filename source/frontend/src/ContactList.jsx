/**
 * 1. This is where componenets for rendering contacts will be made
 * 2. Also it receives the updateContact function from the App.jsx
 * 3. Lastly, the DELETE function is made in it.
 */

import React from"react"


//  Whenever a contact is to be updated, call updateContact
//  Whenever an update is done, the updateCallback is called
//  These are functions
const ContactList = ({contacts, updateContact, updateCallback})=>{

    const onDelete = async (id)=>{
        try
        {
            const options = {
                method: "DELETE"
            };
            // Note the backticks, ``, to enable embedding a variable argument
            const response = await fetch(`http://127.0.0.1:5000/delete_contact/${id}`, options);
            if (response.status === 200)
            {
                //  200 shows it's successful
                updateCallback();
            }
            else{
                console.error("Failed to delete.");
            }
        }
        catch (error)
        {
            alert(error);
        }
    };

    return <div id="contact-list">
        <h2>Contacts</h2>
        <table>
            <thead>
                {/* the table row */}
                <tr>
                    {/* Table headers */}
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {/* 
                    This dynamically renders all of the table rows with data of each contact
                    Buttons Update and Delete will be hooked to some funcitons
                */}
                {contacts.map((contact) => (
                    <tr key={contact.id}>
                        <td>{contact.firstName}</td>
                        <td>{contact.lastName}</td>
                        <td>{contact.email}</td>
                        <td>
                            <button onClick={()=> updateContact(contact)}>Update</button>
                            <button onClick={()=> onDelete(contact.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
};

export default ContactList;