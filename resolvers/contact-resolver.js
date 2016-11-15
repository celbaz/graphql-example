import contacts from '../data/contact-resp';

function getByContactId({contactId, id}) {
  return contacts[contactId];
}

function getByUserId({id}) {
  console.log("BOOM", id)
  return contacts[Object.keys(contacts).filter((contact) => {
    console.log(contacts[contact].userId == id);
    return contacts[contact].userId == id;
  })[0]];
}

export default {
  getByContactId,
  getByUserId
}
