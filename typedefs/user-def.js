const { gql } = require('apollo-server');

const typeDefs = gql `
	type User {
		_id: String
		Name: String
		initials: String
		email: String
		password: String
	}
	extend type Query {
		getCurrentUser: User
		testQuery: String
	}
	extend type Mutation {
		login(email: String!, password: String!): User
		register(email: String!, password: String!,  Name: String!): User
		update(email: String!, password: String!,  Name: String!, CurrentUserId : String!): User
		logout: Boolean!
	}
`;

module.exports = { typeDefs: typeDefs }