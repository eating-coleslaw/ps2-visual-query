import { openDB } from "idb";
import { v4 as uuidv4 } from "uuid";

const appDbName = "ps2QueryDb";
const queryStoreName = "queries";

const dbPromise = openDB(appDbName, 2, {
  upgrade(db, oldVersion) {
    if (!isSupported()) {
      return;
    }

    switch (oldVersion) {
      case 0:
        const queryStore = db.createObjectStore(queryStoreName, {
          keyPath: "id",
          autoIncrement: false,
        });

        queryStore.createIndex("isFavorite", "isFavorite", {
          unique: false,
        });

        queryStore.createIndex("dateLastModified", "dateLastModified");

        break;

      default:
        break;
    }
  },
});

export function isSupported() {
  if (!("indexedDB" in window)) {
    console.log("This browser doesn't support IndexedDB");
    return false;
  }

  return true;
}

export async function upsertQuery(query) {
  try {
    if (query.id === null) {
      return await addQuery(query);
    } else {
      return await updateQuery(query);
    }
  } catch (error) {
    throw new Error("Error upsert query");
  }
}

export async function addQuery(query) {
  try {
    if (query.id !== null) {
      throw new Error(`Query ${query.id} violates primary key contraint`);
    }

    query.id = uuidv4();

    const nowUTC = Date.now();

    query.dateCreated = nowUTC;
    query.dateLastModified = nowUTC;
    query.dateLastOpened = nowUTC;

    const item = JSON.parse(JSON.stringify(query));

    console.log("Serialized Item: ", item);

    const db = await dbPromise;
    const tx = db.transaction(queryStoreName, "readwrite");
    const store = tx.objectStore(queryStoreName);
    // const result = await store.add(query);
    const result = await store.add(item);
    await tx.done;
    return result;
  } catch (error) {
    console.warn("Error adding query to database:", error);
  }
}

export async function updateQuery(query) {
  try {
    if (query.id === null) {
      throw new Error(`Cannot update query with a null ID`);
    }

    const nowUTC = Date.now();
    query.dateLastModified = nowUTC;
    query.dateLastOpened = nowUTC;

    const db = await dbPromise;
    const tx = db.transaction(queryStoreName, "readwrite");
    const store = tx.objectStore(queryStoreName);

    const item = JSON.parse(JSON.stringify(query));
    const result = await store.put(item);

    await tx.done;
    return result;
  } catch (error) {
    console.warn("Error adding query to database:", error);
  }
}

export async function getQuery(id) {
  const db = await dbPromise;
  const tx = db.transaction(queryStoreName, "readwrite");
  const store = tx.objectStore(queryStoreName);
  const query = await store.get(id);
  await tx.done;
  return query;
}

export async function deleteQuery(id) {
  const db = await dbPromise;
  const tx = db.transaction(queryStoreName, "readwrite");
  const store = tx.objectStore(queryStoreName);
  const result = await store.delete(id);
  await tx.done;
  return result;
}

export async function getFavorites() {
  const db = await dbPromise;
  const results = await db.getAllFromIndex(queryStoreName, "favorites", true);
  return results;
}

export async function getLastModified(take = 5, start = 0) {
  const db = await dbPromise;
  const results = await db.getAllFromIndex(queryStoreName, "dateLastModified");

  if (!results || results.length === 0) {
    return null;
  }

  const count = results.length;

  const startIndex = count > take ? count - take : 0;
  const endIndex = count;

  return results.slice(startIndex, endIndex).sort((a, b) => {
    return b.dateLastModified - a.dateLastModified;
  });
}
