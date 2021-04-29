const { gql } = require('apollo-server');

const typeDefs = gql `
type Map {
    _id: String!
    id: Int!
    name: String!
    owner: String!
}
type Region {
    _id: String!
    id: Int!
    capital: String!
    leader: String!
    Flag: String!
    parentRegion:  Boolean!
    landmark: [String]
}
extend type Query {
    getAllMaps: [Map]
    getMapById(_id: String!): Map 
}
extend type Mutation {
    createMap(map: MapInput!): String
    deleteMap(_id: String!): Boolean
    editMap(_id: String!): String
    currentMapOnTop(listID: String!) : String
    updateRegionfromMap(listID : String!) : String
}
input FieldInput {
    _id: String
    field: String
    value: String
}
input MapInput {
    _id: String
    id: Int
    name: String
    owner: String
}
input RegionInput {
    _id: String
    id: Int
    capital: String
    leader: String
    Flag: String
    parentRegion:  Boolean
    landmark: [String]
}
`;

module.exports = { typeDefs: typeDefs }