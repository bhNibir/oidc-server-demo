import { getAllOAuthClients } from "@/db/queries/oauth";




export async function getGenericOAuthConfig() {
    const clients = await getAllOAuthClients();
    return clients.map((client) => ({
      name: client.name ?? "",
      clientId: client.clientId ?? "",
      clientSecret: client.clientSecret ?? "",
      redirectURLs: [`${client.redirectURLs}/${client.name}`],
      type: "web" as const,
      disabled: false,
      skipConsent: true, // Skip consent for this trusted client
      metadata: { internal: true }
    }));
  } 