import { eq } from "drizzle-orm"
import { db } from "@/db"
import { oauthApplication } from "@/db/schema/auth"


export async function getOAuthClients() {
  return await db
    .select({
      id: oauthApplication.id,
      name: oauthApplication.name,
      icon: oauthApplication.icon,
      clientId: oauthApplication.clientId,
      // clientSecret: oauthApplication.clientSecret,
      redirectURLs: oauthApplication.redirectURLs,
      createdAt: oauthApplication.createdAt,
      updatedAt: oauthApplication.updatedAt,
    })
    .from(oauthApplication)
    .orderBy(oauthApplication.createdAt)
}

export async function getAllOAuthClients() {
  return await db
    .select()
    .from(oauthApplication)
}

export async function getOAuthClientByClientId(clientId: string) {
  return await db
    .select()
    .from(oauthApplication)
    .where(eq(oauthApplication.clientId, clientId))
}

export async function deleteOAuthClient(clientId: string) {
  await db
    .delete(oauthApplication)
    .where(eq(oauthApplication.clientId, clientId))
} 