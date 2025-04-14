import {Client,Account,ID } from 'appwrite'
import Conf from '../Conf'

class auth {
     client = new Client()
     account;
    
     constructor (){
           this.client
           .setEndpoint(Conf.appwriteUrl)
           .setProject(Conf.appwriteProjectId)
           this.account = new Account(this.client)
     }

     async signup({email,password,name}){
        try {
            const response = await this.account.create(ID.unique() , email , password , name)
            if(response){
                return await this.login({email,password})
            }
            else{
               return response
            }
        } catch (error) {
            return error.message
        }
     }
     async login({email,password}){
        try {
            const response = await this.account.createEmailPasswordSession(email,password)
            return response
        } catch (error) {
         return error.message 
        }
     }

     async logout(){
        try {
           const response = await this.account.deleteSessions()
           return response
        } catch (error) {
            return error.message
        }
     }
     async getUser(){
        try {
           const response = await this.account.get()
           return response
        } catch (error) {
           console.log(error.message) 
        }
     }
}

const appwriteAuth = new auth()
export default appwriteAuth
