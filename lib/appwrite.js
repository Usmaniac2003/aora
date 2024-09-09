import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
  Storage,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: "https://cloud.appwrite.io/v1",
  platform: "com.usman.aora",
  projectId: "66dc71d00019830b54ea",
  databaseId: "66dc752c00122c753c34",
  userCollectionId: "66ddd2270036acb2c10e",
  videoCollectionId: "66ddd233002780274fd7",
  storageId: "66dc77c4002ea351cd97",
};

const client = new Client();

client
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform);

const account = new Account(client);
const storage = new Storage(client);
const avatars = new Avatars(client);
const databases = new Databases(client);

// Register user
export async function createUser(email, password, username) {
try {
  console.log("Creating user...");
  const newAccount = await account.create(
    ID.unique(),
    email,
    password,
    username
  );

  if (!newAccount) throw Error("User account creation failed.");

  const avatarUrl = avatars.getInitials(username);
  console.log("User created with ID:", newAccount.$id);

  await signIn(email, password);
  console.log("User signed in...");

  const newUser = await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    ID.unique(),
    {
      accountId: newAccount.$id,
      email: email,
      username: username,
      avatar: avatarUrl,
    }
  );

  console.log("User document created:", newUser.$id);
  return newUser;
} catch (error) {
  console.error("Error in createUser:", error);
  throw new Error(error);
}
}

// Sign In
export async function signIn(email, password) {
try {
  console.log("Signing in...");
  const session = await account.createEmailPasswordSession(email, password);

  console.log("Sign in successful:", session);
  return session;
} catch (error) {
  console.error("Error in signIn:", error);
  throw new Error(error);
}
}

// Get Account
export async function getAccount() {
try {
  console.log("Fetching account details...");
  const currentAccount = await account.get();

  console.log("Current account:", currentAccount);
  return currentAccount;
} catch (error) {
  console.error("Error in getAccount:", error);
  throw new Error(error);
}
}

// Get Current User
export async function getCurrentUser() {
try {
  console.log("Fetching current user...");
  const currentAccount = await getAccount();
  if (!currentAccount) throw Error("No current account found.");

  const currentUser = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.userCollectionId,
    [Query.equal("accountId", currentAccount.$id)]
  );

  console.log("Current user:", currentUser);
  if (!currentUser) throw Error("User not found.");

  return currentUser.documents[0];
} catch (error) {
  console.error("Error in getCurrentUser:", error);
  return null;
}
}

// Sign Out
export async function signOut() {
try {
  console.log("Signing out...");
  const session = await account.deleteSession("current");

  console.log("Sign out successful");
  return session;
} catch (error) {
  console.error("Error in signOut:", error);
  throw new Error(error);
}
}

// Upload File
export async function uploadFile(file, type) {
  if (!file) return;

  const { mimeType, ...rest } = file;
  const asset = { type: mimeType, ...rest };

  try {
    const uploadedFile = await storage.createFile(
      appwriteConfig.storageId,
      ID.unique(),
      asset
    );

    const fileUrl = await getFilePreview(uploadedFile.$id, type);
    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Get File Preview
export async function getFilePreview(fileId, type) {
  let fileUrl;

  try {
    if (type === "video") {
      fileUrl = storage.getFileView(appwriteConfig.storageId, fileId);
    } else if (type === "image") {
      fileUrl = storage.getFilePreview(
        appwriteConfig.storageId,
        fileId,
        2000,
        2000,
        "top",
        100
      );
    } else {
      throw new Error("Invalid file type");
    }

    if (!fileUrl) throw Error;

    return fileUrl;
  } catch (error) {
    throw new Error(error);
  }
}

// Create Video Post
export async function createVideoPost(form) {

  console.log("Creating video post...");
  console.log("-----------------Form Data------------------"); 
  console.log(form.userId);
  console.log(form.video);
  console.log(form.thumbnail);
  console.log(form.title);
  console.log(form.prompt);
  console.log("-----------------Form Data------------------");


  try {
    const [thumbnailUrl, videoUrl] = await Promise.all([
      uploadFile(form.thumbnail, "image"),
      uploadFile(form.video, "video"),
    ]);

    const newPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.videoCollectionId,
      ID.unique(),
      {
        title: form.title,
        thumbnail: thumbnailUrl,
        video: videoUrl,
        prompt: form.prompt,
        creator: form.userId,
      }
    );

    return newPost;
  } catch (error) {
    throw new Error(error);
  }
}
// Get all video Posts
export async function getAllPosts() {
try {
  console.log("Fetching all posts...");
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId
  );

  console.log("Fetched posts:", posts.documents);
  return posts.documents;
} catch (error) {
  console.error("Error in getAllPosts:", error);
  throw new Error(error);
}
}

// Get video posts created by user
export async function getUserPosts(userId) {
try {
  console.log(`Fetching posts for user ID: ${userId}`);
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.equal("creator", userId)]
  );

  console.log("Fetched user posts:", posts.documents);
  return posts.documents;
} catch (error) {
  console.error("Error in getUserPosts:", error);
  throw new Error(error);
}
}

// Get video posts that matches search query
export async function searchPosts(query) {
try {
  console.log(`Searching posts with query: ${query}`);
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.search("title", query)]
  );

  if (!posts) throw new Error("Something went wrong");

  console.log("Search results:", posts.documents);
  return posts.documents;
} catch (error) {
  console.error("Error in searchPosts:", error);
  throw new Error(error);
}
}

// Get latest created video posts
export async function getLatestPosts() {
try {
  console.log("Fetching latest posts...");
  const posts = await databases.listDocuments(
    appwriteConfig.databaseId,
    appwriteConfig.videoCollectionId,
    [Query.orderDesc("$createdAt"), Query.limit(7)]
  );

  console.log("Fetched latest posts:", posts.documents);
  return posts.documents;
} catch (error) {
  console.error("Error in getLatestPosts:", error);
  throw new Error(error);
}
}

