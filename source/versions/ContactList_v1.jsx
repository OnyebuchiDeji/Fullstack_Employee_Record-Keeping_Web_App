/**
 * This is where componenetd for rendering contacts will be made
 * 
 */

import React from"react"


const ContactList = ({contacts})=>{
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
                            <button>Update</button>
                            <button>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
};

export default ContactList;