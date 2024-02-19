const { gql } = require('apollo-server-express');

const typeDefs = gql `
  enum Gender {
    Male
    Female
    Other
  }

  type User {
    username: String
    email: String
    password: String
  }

  type Employee {
    id: String
    first_name: String
    last_name: String
    email: String
    gender: Gender
    salary: Float
  }

  input UserSignUpInput {
    username: String
    email: String
    password: String
  }

  input UserLoginInput {
    username: String
    password: String
  }

  input AddEmployeeInput {
    first_name: String
    last_name: String
    email: String
    gender: Gender
    salary: Float
  }

  type Query {
    login(input: UserLoginInput): String
    getAllEmployees: [Employee]
    searchEmployeeById(id: ID): Employee
  }

  type Mutation {
    signup(input: UserSignUpInput): User
    addNewEmployee(input: AddEmployeeInput): Employee
    updateEmployeeById(id: ID, input: AddEmployeeInput): String
    deleteEmployeeById(id: ID): String
  }
`;

module.exports = typeDefs;
