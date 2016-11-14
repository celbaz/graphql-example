import users from '../data/user-resp';

export default function({userId, id}) {
  return users[userId || id]; //todo: instead use an alias for id and set it to userId
};
