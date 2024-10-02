import conf from "@/conf/config";
import { Client, ID, Account } from 'appwrite'
import { promises } from "dns";

type CreateUserAccount = {
    email: string,
    name: string,
    password: string
}

type LoginUserAccount = {
    email: string,
    password: string
}

//storing the reference of Client 
//Client actually talks to appWrite
const appWriteClient = new Client()

//Client don't know how to talk, we need to mention it properly
appWriteClient.setEndpoint(conf.appwriteurl).setProject(conf.appwriteprojectid)

//at this moment it is clear what project we are working on , by providing these 

export const account = new Account(appWriteClient)

export class AppwriteService {
    async createUserAccount({ email, name, password }: CreateUserAccount) {
        try {
            const userAccount = await account.create(ID.unique(), email, name, password)
            if (userAccount) {
                return this.login({ email, password })
            } else {
                return userAccount
            }
        } catch (error) {
            throw error
        }
    }
    async login({ email, password }: LoginUserAccount) {
        try {
            return await account.createSession(email, password);
        } catch (error) {
            throw error
        }
    }

    async isLoggedIn(): Promise<boolean> {
        try {
            const data = await account.get()
            return Boolean(data)
        } catch (error) { }
        return false
    }

    async getCurrentUser() {
        try {
            return account.get()
        } catch (error) {
            console.log("get current user error" + error)
        }
        return null
    }

    async logout() {
        try {
            return await account.deleteSession("current")
        } catch (error) {
        console.log("logout error"+error)
        }
    }
}