

 id1:allCharacters(Name : "Jaime Lannister") {
    Id
    Name
    IsFemale
    Culture
    Born
    Died
  }
   id2 : allCharacters(Name : "Cersei") {
     Id
     Name
     IsFemale
     Culture
     Born
     Died
   }

// frament training



fragment knightFields on Book {
  Name
  Country
  MediaType
  NumberOfPages
}

query MyQueries {
 
  HedgeKnight1 : Book(Id:4) {
    ...knightFields
  }
  HedgeKnight2 : Book(Id:6) {
    ...knightFields
  }
  
}

// nested fragments 


query {
  allCharacters (Name :"Greyjoy") {
      ...CharFields
  }
}


fragment CharFields on Character {
  Name
  Allegiances {
        ...HouseFields
  }
}
fragment HouseFields on House {
  Name
  Region
  CoatOfArms
  Words
}

# variables 

query ($requestedId: Int!) {
  Book(Id: $requestedId) {
    ...usefulFields
  }
}

fragment usefulFields on Book {
  Name
  Country
  MediaType
  NumberOfPages
}


query ( $requestedName : String ) {

  allBooks(Name: $requestedName) {
     ...usefulFields
  }
}

fragment usefulFields on Book {
  Name
  Country
  MediaType
  NumberOfPages
}


// other variables 


query ( $Accused : String ) {
  allTVBetrayals(Perpetrator:$Accused) {
    ...betrayal
  }
}

fragment betrayal on TVBetrayal {
 Victim
 RelationshipOfPerpToVictim
 PerpGainReasoning
 ImmediateConsequence
}


// directives 

//GraphQL allows you to modify queries with directives. These can be defined on the backend, but GraphQL comes with two inbuilt directives:

//@include(if: Boolean) Only include this field if the argument is true.
//@skip(if: Boolean) Skip this field if the argument is true. (opposite of @include)


{
  "requestedName": "The",
  "skipReleaseDate": true,
}


query ($requestedName: String, $skipReleaseDate: Boolean!) {
  allBooks(Name: $requestedName) {
    ISBN @skip(if: $skipReleaseDate)
    ...usefulFields
  }
}

fragment usefulFields on Book {
  Name
  Country
  MediaType
  NumberOfPages
}


// directives2

{
  "requestedName": "The",
  "showISBN": true
}

query ($requestedName: String, $showISBN : Boolean! ) {
  allBooks(Name: $requestedName) {
    ISBN @include(if: $showISBN)
    ...usefulFields
  }
}

fragment usefulFields on Book {
  Name
  Country
  MediaType
  NumberOfPages
}

// mutations

query {
  Comments {
    CommenterName
    Comment
    Timestamp
  }
}



/*
mutation {
   addComment(comment: "Hello") {
     CommenterName
     Comment
     Timestamp
   }
  }
*/


//  Facebook and the GraphQL community have developed frontend client libraries (called Relay and Apollo respectively)

