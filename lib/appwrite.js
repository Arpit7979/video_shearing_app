import { Account, Avatars, Client, Databases, ID, Query,Storage } from 'react-native-appwrite';

export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.ark.aora',
    projectId: '66ecfd8300246d7bd729',
    databaseId: '66ed010600301e2bfc6e',
    userCollectionId: '66ed01490024122b1f31',
    videoCollectionId: '66ed0194003d4f3ac9c9',
    storageId: '66ed1f440004972f794d'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.
;

const account = new Account(client);
const avatars = new Avatars(client);
const database = new Databases(client);
const storage = new Storage(client);

// Register User
export const createUser = async (email,password,username)=>{
   try {
    const newAccount = await account.create(
        ID.unique(),
        email,
        password,
        username);
      if(!newAccount) throw new Error("User not created");

      const avatarUrl = avatars.getInitials(username);

      await signIn(email,password);

      const newUser = await database.createDocument(
        config.databaseId,
        config.userCollectionId,
        ID.unique(),
        {
            accountId: newAccount.$id,
            email,
            username,
            avatar: avatarUrl,
        }
      );
      return newUser;

   } catch (error) {
    console.log(error);
    throw new Error(error);
   }
}

export async function signIn(email, password){
   try {
    const session = await account.createEmailPasswordSession(email,password);
    return session;
   } catch (error) {
    throw new Error(error);
   }
}


export const getCurrentUser = async ()=>{
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await database.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal("accountId",currentAccount.$id)]
        );
        if(!currentUser) throw Error;
        return currentUser.documents[0];
    } catch (error) {
        console.log(error)
    }
}

export const getAllPosts = async()=>{
   try {
    const posts = await database.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.orderDesc("$createdAt")],
    );
    return posts.documents;
   } catch (error) {
     throw new Error(error);
   }
}



export const getLatestPosts = async()=>{
   try {
    const posts = await database.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.orderDesc("$createdAt", Query.limit(7))]
    );
    return posts.documents;
   } catch (error) {
     throw new Error(error);
   }
}


export const searchResult = async(query)=>{
   try {
    const posts = await database.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.search("title", query)]
    );
    return posts.documents;
   } catch (error) {
     throw new Error(error);
   }
}

export const getUserPosts = async(userId)=>{
   try {
    const posts = await database.listDocuments(
        config.databaseId,
        config.videoCollectionId,
        [Query.equal("creator", userId)]
    );
    return posts.documents;
   } catch (error) {
     throw new Error(error);
   }
}

export const signOut = async()=>{
    try {
        const session = await account.deleteSession("current");
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async(fileId,type)=>{
    let fileUrl;

    try {
        if(type==="video"){
            fileUrl = storage.getFileView(config.storageId,fileId);
          }else if(type==="image"){
             fileUrl = storage.getFilePreview(config.storageId,fileId,2000,2000,"top",100);
          }else{
            throw new Error("Invalid file type");
          }

          if(!fileUrl) throw Error;
          
          return fileUrl;
    } catch (error) {
        throw new Error(error);
    }


}

export const uploadFile = async(file,type)=>{
   if(!file) return
   
   const asset = {
    name: file.fileName,
    type: file.mimeType,
    size: file.fileSize,
    uri: file.uri,
   }

   try {
    const uploadFile = await storage.createFile(
        config.storageId,
        ID.unique(),
        asset,
    );
    const fileUrl = await getFilePreview(uploadFile.$id,type);
    
    return fileUrl;
   } catch (error) {
    throw new Error(error);
   }
}

export const createVideo = async(form)=>{
    
    try {
        const [thumbnailUrl,videoUrl] = await Promise.all([
            uploadFile(form.thumbnail,"image"),
            uploadFile(form.video,"video")
        ]);

        const newPost = await database.createDocument(
            config.databaseId,
            config.videoCollectionId,
            ID.unique(),
            {
                title:form.title,
                thumbnail:thumbnailUrl,
                video:videoUrl,
                prompt:form.prompt,
                creator:form.userId
            }
        )
        
        return newPost;
    } catch (error) {
        throw new Error(error);
    }
}

export const bookmarkPost = async(bookmarkedId,isBookmarked)=>{
    try {
        const bookmark = await database.updateDocument(
            config.databaseId,
            config.videoCollectionId,
            bookmarkedId,
            {
                bookmark:isBookmarked,
            }
        );
        
        return bookmark;
        
    } catch (error) {
        throw new Error(error);
    }
}

export const getBookmarkedPosts = async()=>{
    try {
     const posts = await database.listDocuments(
         config.databaseId,
         config.videoCollectionId,
         [Query.equal("bookmark", true)]
     );
     return posts.documents;
    } catch (error) {
      throw new Error(error);
    }
 }





