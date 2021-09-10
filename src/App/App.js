import React, { useState } from 'react'
import Section from '../Components/section/Section';
import Form from '../Components/form/Form';
import {v4 as uuidv4} from 'uuid'
import ContactsList from '../Components/contactsList/ContactsList';
import Filter from '../Components/filter/Filter';

const init={
    contacts: [],
    filter: '',
    isMount:false
}

const App=()=>{

    const [state, setState]=useState(init)

    const addContact=(name,number)=>{  
        state.contacts.push({id:uuidv4(),name,number})
        setState({...state})
    }

    const delContact=(e)=>{
        setState(state=>({...state,contacts: state.contacts.filter(i=>i.id!==e.target.id)}))
    }

    const filter=(e)=>{
        setState(state=>({...state,filter: e.target.value.trim()}))
    }
    
    if(!state.isMount && localStorage.getItem("contacts")){
        setState(state=>({...state, isMount:true, contacts:JSON.parse(localStorage.getItem("contacts"))}))
    }  
    else{
        localStorage.setItem("contacts",JSON.stringify(state.contacts))
    }
    
    return (
            <>
                <h1>Phonebook</h1>
                <Section title="">
                    <Form addContact={addContact} contacts={state.contacts}/>
                </Section>
                <Section title="Contacts">
                    <Filter value={state.filter} onChange={filter}/>
                    <ContactsList 
                        contacts={state.contacts} 
                        onDelete={delContact} 
                        filter={state.filter}
                    />
                </Section>
            </>
    )
}

export default App
