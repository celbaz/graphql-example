import contacts from '../data/contact-resp';

export default function ({contactId, id}) {
  return contacts[contactId];
}
