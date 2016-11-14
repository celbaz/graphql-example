import contacts from '../data/contact-resp';

function getByContactId({contactId, id}) {
  return contacts[contactId];
}

function getByUserId({id}) {
  return Object.keys(contacts).filter(contact => contact.userId == id)[0];
}

export default {
  getByContactId,
  getByUserId
}
