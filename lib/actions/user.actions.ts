 "use server"

import { ID, Query } from "node-appwrite";
import { createAdminClient  } from "../appwrite";
import { appwriteConfig } from "../appwrite/config";
// removed unused import
import { parseStringify } from "../utils";
import { cookies } from "next/headers";
import path from "path";
import { tr } from "zod/locales";

 const getUserByEmail = async (email: string) => {
     const { database } = await createAdminClient()
     const result = await database.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.usersCollectionId,
        [Query.equal("email", email)]
     )

     // return first matching document or null
     return result?.documents?.[0] ?? null
 }

  const handleError = (error: any , message:string) => {
    console.log( error, message);
  }

  export const sendEmailOTP = async (email: string) => {
    const { account } = await createAdminClient() 

    try{
        const  session = await account.createEmailToken(ID.unique(), email)
                return session.userId
    } catch (error) {
        handleError(error, "Failed to send email OTP");
     }
 }

export const createAccount = async ({ fullName, email }: { fullName: string; email: string }) => {
    // debug: log incoming payload for easier tracing in server logs
    console.log("createAccount called", { email, fullName })

    const existingUser = await getUserByEmail(email)

    const accountId = await sendEmailOTP(email)

    if (!accountId) throw new Error("Failed to send OTP to email")

    if (!existingUser) {
        const { database } = await createAdminClient()
        try {
            await database.createDocument(
                appwriteConfig.databaseId,
                appwriteConfig.usersCollectionId,
                ID.unique(),
                {
                    fullName,
                    email,
                    avatar: `https://ui-avatars.com/api/?name=${fullName.split(" ").join("+")}&background=random&size=128`,
                    accountId,
                }
            )
        } catch (dbError) {
            console.error("createDocument failed", dbError)
            throw new Error("Failed to create user document")
        }
    }

    // return a simple, serializable object
    return parseStringify({ accountId })
}

export const verifySecret = async ({ accountId, password }: { accountId: string; password: string }) => {
    try {
        const { account } = await createAdminClient()
        const session = await account.createSession({ userId: accountId, secret: password })

        (await cookies()).set('appwrite-session', session.secret , 
        {
            path: '/',
            httpOnly: true,
            sameSite : 'strict',
            secure: true,
        }
        )
    } catch (error) {
        handleError(error, "Failed to verify secret");}
}