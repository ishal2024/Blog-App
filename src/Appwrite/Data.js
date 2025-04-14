import { Client , Databases , Storage , ID, Query } from "appwrite";
import Conf from '../Conf'

class Data {

    client = new Client()
    database
    storage

    constructor (){
        this.client
        .setEndpoint(Conf.appwriteUrl)
        .setProject(Conf.appwriteProjectId)
        this.database = new Databases(this.client)
        this.storage = new Storage(this.client)
    }

    async createBlog ({title,content,slug,status,userId,fileId}){
       try {
        return await this.database.createDocument(
           Conf.appwriteDatabaseId,
           Conf.appwriteCollectionId1,
           ID.unique(),
           {title,content,slug,status,userId,fileId}
        )
       } catch (error) {
        console.log(error.message)
       }
    }

    async deleteDocument (blogId){
        try {
            return await this.database.deleteDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId1,
                blogId
            )
        } catch (error) {
            console.log(error.message)
        }
    }
    async updateDocument (blogId,{title,slug,content,status}){
        try {
            return await this.database.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId1,
                blogId,
                {title,slug,content,status}
            )
        } catch (error) {
            console.log(error.message)
        }
    }


    async getBlogs (userId){
        try {
            return await this.database.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId1,
                [Query.equal('userId' , userId)]
            )
        } catch (error) {
            console.log(error.message)
        }
    }

    async uploadImage(file){
        try {
           const fileres = await this.storage.createFile(
            Conf.appwriteBucketId,
            ID.unique(),
            file
           ) 
           return fileres
 
        } catch (error) {
            console.log(error.message)
        }
    }



    async getFile(fileId){
        try {
           const res = await this.storage.getFilePreview(
                  Conf.appwriteBucketId,
                  fileId
           ) 
           return res
        } catch (error) {
            console.log(error.message)
        }
    }

    async uploadUserImage(userFile){
        try {
           const fileres = await this.storage.createFile(
            Conf.appwriteUserBucketId,
            ID.unique(),
            userFile
           ) 
           return fileres
 
        } catch (error) {
            console.log(error.message)
        }
    }

    async getUserFile(fileId){
        try {
           const res = await this.storage.getFilePreview(
                  Conf.appwriteUserBucketId,
                  fileId
           ) 
           return res
        } catch (error) {
            console.log(error.message)
        }
    }

    async createUserImageDoc ({userId,fileId}){
        try {
         return await this.database.createDocument(
            Conf.appwriteDatabaseId,
            Conf.appwriteCollectionId2,
            ID.unique(),
            {userId,fileId}
         )
        } catch (error) {
         console.log(error.message)
        }
     }

     async getImgDoc (userId){
        try {
            return await this.database.listDocuments(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId2,
                [Query.equal('userId' , userId)]
            )
        } catch (error) {
            console.log(error.message)
        }
    }
    async deleteUserImg (fileId){
        try {
            return await this.storage.deleteFile(
                Conf.appwriteUserBucketId,
                fileId
                
            )
        } catch (error) {
            console.log(error.message)
        }
    }

    async updateUserImgDoc (imgDoc,{userId , fileId}){
        try {
            return await this.database.updateDocument(
                Conf.appwriteDatabaseId,
                Conf.appwriteCollectionId2,
                imgDoc,
                {userId , fileId}
             )
        } catch (error) {
            console.log(error.message)
        }
    }

}

const appwriteData = new Data()
export default appwriteData