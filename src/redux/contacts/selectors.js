import { createSelector } from '@reduxjs/toolkit';
import { selectNameFilter } from '../filters/selectors';

export const selectContacts = state => state.contacts.items;
export const selectLoading = state => state.contacts.loading;
export const selectError = state => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, text) => {
    return contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(text.toLowerCase()) ||
        contact.number.includes(text)
    );
  }
);
