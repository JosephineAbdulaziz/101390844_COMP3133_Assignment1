const User = require('../model/User');
const Employee = require('../model/Employee')

const resolvers = {
    Query: {
        async login(_, { input: { username, password } }) {
            try {
                const user = await User.findOne({ username: username })
                if (!user) {
                    return "incorrect username"
                }
                if (user.password === password) {
                    return "logged in"
                } else {
                    return "incorrect password"
                }
            } catch (error) {
                return "something went wrong"
            }
        },
       
        async getAllEmployees(){
            return await Employee.find()
        },
        async searchEmployeeById(_, {id}){
            return await Employee.findById(id)
        }
    }, 
    Mutation: {
        async signup(_ , {input : {username, email, password}} ){
            const u = new User({username, email, password})
            await u.save()
            return u
        },
        async addNewEmployee(_, {input}){
            const e = new Employee(input)
            await e.save()
            return e
        },
        async updateEmployeeById(_, { id, input: { first_name, last_name, email, gender, salary } }) {
            try {
                const updatedEmp = await Employee.findOneAndUpdate({ _id: id },{ first_name, last_name, email, gender, salary },{ new: true } )
                if (updatedEmp) {
                    return "employee updated successfully"
                } else {
                    return "employee not found"
                }
            } catch (error) {
                return "something went wrong"
            }
        },
        
        async deleteEmployeeById(_, { id }) {
            try {
                const deleted = await Employee.deleteOne({ _id: id })
        
                if (deleted.deletedCount > 0) {
                    return "employee was deleted successfully"
                } else {
                    return "employee not found"
                }
            } catch (error) {
                return "something went wrong"
            }
        }
    }
}
module.exports = resolvers
