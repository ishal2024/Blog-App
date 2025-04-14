const conf = {
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId  : String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId : String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteCollectionId1 : String(import.meta.env.VITE_APPWRITE_COLLECTION1_ID),
    appwriteCollectionId2 : String(import.meta.env.VITE_APPWRITE_COLLECTION2_ID),
    appwriteBucketId : String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteUserBucketId : String(import.meta.env.VITE_APPWRITE_USERBUCKET_ID)

}

export default conf;