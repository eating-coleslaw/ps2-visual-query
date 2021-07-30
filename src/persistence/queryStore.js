import { openDB } from "idb";
import { v4 as uuidv4 } from 'uuid';

const appDbName = "ps2QueryDb";
const queryStoreName = "queries";

const dbPromise = openDB(appDbName, 1, {
  upgrade(db, oldVersion) {
    if (!isSupported()) {
      return;
    }

    switch (oldVersion) {
      case 0:
        // console.log(`Upgrading query database to version ${newVersion}...`);

        const queryStore = db.createObjectStore(queryStoreName, {
          keyPath: "id",
          autoIncrement: false,
        });
        queryStore.createIndex("favorites", "isFavorite", {
          unique: false,
        });
        break;

      default:
        break;
    }
  },
});

export function isSupported() {
  if (!('indexedDB' in window)) {
    console.log('This browser doesn\'t support IndexedDB');
    return false;
  } 

  return true;
}

export async function upsert(query) {
  try {
    if (query.id === null) {
      return await add(query);
    } else {
      return await update(query);
    }
  } catch (error) {
    throw new Error("Error upsert query");
  }
}

export async function add(query) {
  try {
    console.log("Enter add");

    console.log("ID:", query.id);
    
    if (query.id !== null) {
      console.log("PK Erroring...");
      throw new Error(`Query ${query.id} violates primary key contraint`);
    }
    
    query.id = uuidv4();

    const nowUTC = new Date().getUTCDate();

    query.dateCreated = nowUTC;
    query.dateLastModified = nowUTC;
    query.dateLastOpened = nowUTC;
    
    console.log("Updated query");

    
    const db = await dbPromise;

    console.log("DB:", db);

    const tx = db.transaction(queryStoreName, "readwrite");
    const store = tx.objectStore(queryStoreName);

    console.log("Store:", store);

    const result = await store.add(query);
    
    console.log("Add Result:", result);
    
    await tx.done;
    return result;
  } catch (error) {
    console.warn("Error adding query to database:", error);
  }
}

export async function update(query) {
  try {  
    if (query.id === null) {
      throw new Error(`Cannot update query with a null ID`);
    }
    
    const nowUTC = new Date().getUTCDate();

    query.dateLastModified = nowUTC;
    query.dateLastOpened = nowUTC;
    
    const db = await dbPromise;
    const tx = db.transaction(queryStoreName, "readwrite");
    const store = tx.objectStore(queryStoreName);
    const result = await store.put(query);
    await tx.done;
    return result;
  } catch (error) {
    console.warn("Error adding query to database:", error);
  }
} 

export async function get(id) {
  const db = await dbPromise;
  const tx = db.transaction(queryStoreName, "readwrite");
  const store = tx.objectStore(queryStoreName);
  const query = await store.get(id);
  await tx.done;
  return query;
}

export async function getFavorites() {
  // const db = await dbPromise;
  // const tx = db.transaction(queryStoreName, "readwrite");
  // const store = tx.objectStore(queryStoreName);
  // const query = await store.get(id);
  // await tx.done;
  // return query;

  const db = await dbPromise;
  const results = await db.getAllFromIndex(queryStoreName, "favorites", true);
  return results;
}