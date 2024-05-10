import { DocumentStore } from "ravendb";
import { readFileSync } from 'fs';
const authOptions = {
    certificate: readFileSync("./certificate/Client.pfx"),
    type: "pfx",
    password: "user123"
};
const documentStore = new DocumentStore("https://a.free.idodb.ravendb.cloud", "Vacation", authOptions);
documentStore.initialize();
console.log("created a document store");
export async function getPet() {
    const session = documentStore.openSession();
    const pet = await session.load("pets/1-A");
    await session.saveChanges();
    return pet;
}
