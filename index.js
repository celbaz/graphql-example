// This function is used execute GraphQL queries
import {graphql} from 'graphql';

// This is an object that contains all query functions in our "domain".
import Schema from './schema.js';

// Theses are a series of examples to display some of the functionality

/*
  Example 1 is a typical example of what a grapql query might look like.
  The query first calls the contact with an id. Once it gets that, it uses information
  from that response to make async calls to contactType, and User. contactType
  makes an async call for macros.

  Here we are only pulling out what we need. If you wanted to get other fields
  from a query then you could add them to contact.
*/
const example1 = `
  query GetContact {
    contact(contactId: "1") {
      contactTypeId,
      contactType {
        id,
        macros {
          name
        }
      },
      user {
        name
      }
    }
  }
`;


//  Example 1 Executes
graphql(Schema, example1).then(function(result) {
  console.log("\n GRAPHQL RESULT START \n");
  console.log(JSON.stringify(result));
  console.log("\n GRAPHQL RESULT END");
});



/*
  Example 2 is an example of some of the advantages of using graphql.
  Here we have decided to grab contactTypes a user has submitted and the tiers of the contacts
  they have submitted. The first query calls getUsers with an Id and the next
  utilizes the prexisting schema for the contact and the already existing relation
  for contact types.

  Here we are only pulling out what we need. If you wanted to get other fields
  from a query then you could add them to contact or contactType.

*/

const example2 = `
  query GetUserAndTheirContacts {
    user(id: 1) {
      id,
      name,
      contacts {
        tier,
        contactType {
          name
        }
      }
    }
    # Can't call the same base query twice, which is why this query has a key called otherFriend
    otherFriend: user(id: 2) {
      id,
      name
    }
  }
`;


//  Example 2 Executes
graphql(Schema, example2).then(function(result) {
  console.log("\n GRAPHQL RESULT START \n");
  console.log(JSON.stringify(result));
  console.log("\n GRAPHQL RESULT END");
});
