import PropTypes from 'prop-types';

import { useState } from 'react';

import { FormAddContact } from './Form.styled';

export const Form = props => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmite = e => {
    e.preventDefault();
    const { value } = e.target.elements.name;
    props.onSubmit(name, number, value);
    resetForm();
    e.currentTarget.reset();
  };

  const resetForm = () => {
    setName('');
    setNumber('');
  };

  return (
    <FormAddContact onSubmit={handleSubmite}>
      <label>Name</label>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        onChange={handleChange}
      />
      <label>Number</label>
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
        onChange={handleChange}
      />

      <button type="submit">Add contact</button>
    </FormAddContact>
  );
};

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
