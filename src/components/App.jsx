import {useState,useEffect} from "react";
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';
import { ContactList } from './ContactList/ContactList';

import styles  from './App.module.css';


export const App  =()=> {
  const [filter,setInFilter] = useState('');
  const [contacts,setInContacts] = useState(()=>{
    return JSON.parse(localStorage.getItem('contacts')) || [];
  });  

  useEffect(()=>{      
    localStorage.setItem('contacts', JSON.stringify(contacts));          
  },[contacts]); 

  const isContactInState = ({ name }) =>
  !!contacts.filter(({name: prevName}) => {return prevName === name}).length;

  const handleSubmit = ({ name, number }) => { 
    if (isContactInState({ name })) {
      alert('Contact is in phonebook');
      return;    
    }   
    setInContacts([...contacts, { id:getRandomID(), name, number}]);      
  };

  const handleFilterContacts =(value)=>{ 
    setInFilter(value);       
  };

  const getFilterContact=()=> {    
    return contacts.filter((contact)=>contact.name.toLowerCase().includes(filter));
  };


  const handleDeleteContact =(id)=>{   
    setInContacts(contacts.filter((contact)=>contact.id !== id));  
    return contacts;    
  };

  const getRandomID=()=> {
    return `${Math.floor(Math.random() * 16777215).toString(16)}`;
  };
    
  return (
    <div className={styles.conteiner}>
      <h1>Phonebook</h1>
      <ContactForm   onSubmit={handleSubmit}/>
      <h2>Contacts</h2>
      <Filter filter={filter} onFilter={handleFilterContacts}/>
      <ContactList contacts={getFilterContact()} onDelete={handleDeleteContact}/>               
    </div>
  );     
};
