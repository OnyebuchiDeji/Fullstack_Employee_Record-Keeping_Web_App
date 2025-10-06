import { useState, useEffect } from 'react'
import ContactList from "./ContactList"
import ContactForm from "./ContactForm"
import './App.css'

/**
 * 1. Get contacts and set them in State object and return list of contacts gotten from
 *    backend.
 * 2. Display contacts using ContactList.jsx
 * 3. Be able to create contacts using forms from ContactForm.jsx
 * 4. Make the form appear in a modal component -- that is, only make the form
 *    appear when the Update or Delete buttons are pressed!
 * 5. Implement updating.
 * 
 */


function App() {
  //  This is a state that stores the contacts
  // const [contacts, setContacts] = useState([{"firstName":"Eben", "lastName":"Ayo-Metibemu", "email":"ibim@itila.com", id:1}])
  const [contacts, setContacts] = useState([])
  
  //  For the Modal functionality on the ContactForm
  const[isModalOpen, setIsModalOpen] = useState(false);


  //  useEffect hook because the fetchContacts function is to be called ONCE whenever
  //  the website is loaded, when the component renders
  useEffect( ()=> {
    fetchContacts()  
  }, []);

  //  It is asynchronous since one will wait for some time to fetch the contact
  const fetchContacts = async () => {
    //  Fetch is used to send a request -- by default a GET request, which is what is wanted here.
    //  It takes the url endpoint as parameter
    //  It waits until a response is gotten
    const response = await fetch("http://127.0.0.1:5000/contacts")
    //  This gets the list of contacts from the json
    const data = await response.json()
    //  Then the contacts are set in the State
    setContacts(data.contacts)
    console.log(data.contacts)
  };

  const closeModal = () =>{
    setIsModalOpen(false);
  }

  const openCreateModal = () =>{
    if (!isModalOpen) setIsModalOpen(true);
  }
  

  return (
    <>
      <ContactList contacts={contacts}/>
      <button onClick={openCreateModal}>Create New Contact</button>
      {
        isModalOpen && <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
            <ContactForm/>
          </div>
        </div>
      }
    </>
  );
}

export default App;