import { useState } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorag';
import { Container } from './App.styled';

import { nanoid } from 'nanoid';
import { Form } from '../Form/Form';
import { Filter } from '../Filter/Filter';
import { ContactList } from '../ContactList/ContactList';

export const App = () => {
  const [contacts, setContacts] = useLocalStorage('contacts', []);
  const [filter, setFilter] = useState('');

  const generateId = () => nanoid();

  const changeFilter = e => {
    const currentValue = e.currentTarget.value;

    setFilter(currentValue);
  };

  const addContact = (name, number, value) => {
    const dataContact = {
      id: generateId(),
      name,
      number,
    };

    const searchSameContact = contacts.find(
      contact => contact.name.toLowerCase() === value.toLowerCase(),
    );

    if (searchSameContact) {
      alert(`Ну шо не видно, что ${name} таки есть уже?????!!!`);

      return;
    }

    setContacts(prevContacts => [dataContact, ...prevContacts]);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter),
    );
  };

  const deleteContact = contactId => {
    setContacts(prevContacts =>
      prevContacts.filter(({ id }) => id !== contactId),
    );
  };

  const visibleContact = getVisibleContacts();

  return (
    <Container>
      <h1>Phonebook</h1>
      <Form onSubmit={addContact} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={changeFilter} />
      <ContactList contacts={visibleContact} onDeleteContact={deleteContact} />
    </Container>
  );
};
