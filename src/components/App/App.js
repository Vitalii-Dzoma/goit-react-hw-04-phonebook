import {useEffect, useState} from 'react';
import s from './App.module.css';
import { isEqual } from 'lodash';
import { nanoid } from 'nanoid';
import Form from 'components/Form/Form';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';

export default function App1() {
  const [contacts, setContacts] = useState([
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
     
    const contactsNew = localStorage.getItem('contacts');
    const parsedData = JSON.parse(contactsNew)
    setContacts(parsedData)
  
  },[])

 useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
 },[contacts] );


const changeFilter = e => {
    setFilter(e.currentTarget.value);
  };


  const formSubmitHandler = data => {
    const contactName = data.name;

    const matchingContact = contacts.find(cont =>
      isEqual(contactName.toLowerCase(), cont.name.toLowerCase())
    );
    if (matchingContact) {
      return alert(`${contactName} is already declared`);
    }

    const contact = { ...data, id: nanoid() };
    setContacts(PrevContacts => (
      [...PrevContacts, contact]
    ))
  };

  const deleteObject = contactId => {
    setContacts(prevState => (
      prevState.filter(contact => contact.id !== contactId)
   ) );
  };

  // componentDidMount() {
  //  const contacts =  localStorage.getItem('contacts')
  //   const parsedData = JSON.parse(contacts)
  //   if (parsedData) {
  //     this.setState({ contacts: parsedData });
  //   }
    
  // }


  // componentDidUpdate(prevProps, prevState) {
  //   console.log(prevState)
  //   console.log(this.state)
  //   if (this.state.contacts !== prevState.contacts) {
  //     console.log('Обновилось поле контактов');
  //     localStorage.setItem("contacts", JSON.stringify(this.state.contacts))
  //   }
  // }


  const normilizedFilter = filter.toLowerCase();
  
  const filteredContacts = contacts.filter(contact =>
      contact.name.toLowerCase().includes(normilizedFilter)
    );


return (
      <>
        <Form onSubmit={formSubmitHandler} contacts={filteredContacts} />
        <Filter value={filter} onChangeFilter={changeFilter} />
        <Contacts contacts={filteredContacts} onDelete={deleteObject} />
      </>
    );

  

}


// class App1 extends React.Component {
//   state = {
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   changeFilter = e => {
//     this.setState({ filter: e.currentTarget.value });
//   };

//   formSubmitHandler = data => {
//     const contactName = data.name;

//     const matchingContact = this.state.contacts.find(cont =>
//       isEqual(contactName.toLowerCase(), cont.name.toLowerCase())
//     );
//     if (matchingContact) {
//       return alert(`${contactName} is already declared`);
//     }

//     const contact = { ...data, id: nanoid() };
//     this.setState(({ contacts }) => ({
//       contacts: [...contacts, contact],
//     }));
//   };

//   deleteObject = contactId => {
//     this.setState(prevState => ({
//       contacts: prevState.contacts.filter(contact => contact.id !== contactId),
//     }));
//   };

//   render() {
//     const normilizedFilter = this.state.filter.toLowerCase();
//     const filteredContacts = this.state.contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normilizedFilter)
//     );

//     return (
//       <>
//         <Form onSubmit={this.formSubmitHandler} contacts={filteredContacts} />
//         <Filter value={this.state.filter} onChangeFilter={this.changeFilter} />
//         <Contacts contacts={filteredContacts} onDelete={this.deleteObject} />
//       </>
//     );
//   }
// }

// export default App1;
