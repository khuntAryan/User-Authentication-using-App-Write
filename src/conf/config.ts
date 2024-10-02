// we are creating config file because we want to remove " ! " sign while loading from the env file
// it is regarding the uncertainity where the code don't know wheter it will come or not from the env file 
// that's why we use " ! " sign

const conf = {
    appwriteurl: String(process.env.NEXT_PUBLIC_APPWRITE_URL),
    appwriteprojectid: String(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)
}
export default conf
