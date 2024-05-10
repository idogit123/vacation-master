import { DocumentStore, IAuthOptions } from "ravendb";
import { readFileSync } from 'fs'
import Pet from "./pet.js";

const authOptions: IAuthOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
}

const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Test", authOptions);

documentStore.conventions.registerEntityType(Pet)
documentStore.initialize();

console.log("created a document store")

export async function getPet() : Promise<Pet | null> {
    const session = documentStore.openSession()
    const pet = await session.load<Pet>("pets/1-A")
    await session.saveChanges()

    return pet
}