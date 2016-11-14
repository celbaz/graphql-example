import contactType from '../data/contact-type-resp';

export default function({contactTypeId}) {
  return contactType[contactTypeId];
}
