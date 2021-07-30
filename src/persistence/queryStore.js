import { openDB } from "idb";

const appDbName = "ps2QueryDb";
const queryStoreName = "queries";

const dbPromise = openDB(appDbName, 1, {
  upgrade(db, oldVersion, newVersion) {
    // console.log(oldVersion);
    
    if (!isSupported()) {
      return;
    }

    // const queryStore = db.createObjectStore(queryStoreName, {
    //   keyPath: "id",
    //   autoIncrement: true,
    // });

    // queryStore.createIndex("favorites", "isFavorite", {
    //   unique: false,
    // });

    switch (oldVersion) {
      case 0:
        console.log(`Upgrading query database to version ${newVersion}...`);

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

export async function add(query) {
  const db = await dbPromise;
  const tx = db.transaction(queryStoreName, "readwrite");
  const store = tx.objectStore(queryStoreName);
  const result = await store.add(query);
  await tx.done;
  return result;
}


// const queryStore = (async () => {
//   const appDbName = "ps2QueryDb";
//   const queryStoreName = "queries";

//   if (!checkIsSupported()) {
//     return;
//   }

//   let db = null;
  
//   // let db = await openDB(appDbName, 1, {
//   //   upgrade(db, oldVersion) {
//   //     console.log(oldVersion);
      
//   //     switch (oldVersion) {
//   //       case 0:
//   //         const queryStore = db.createObjectStore(queryStoreName, {
//   //           keyPath: "id",
//   //           autoIncrement: false, //true,
//   //         });
//   //         queryStore.createIndex("favorites", "isFavorite", {
//   //           unique: false,
//   //         });
//   //         break;

//   //       default:
//   //         break;
//   //     }
//   //   },
//   // });

//   (async function () {
//     //check for support
//     if (!checkIsSupported()) {
//       return;
//     }

//     db = await openDB(appDbName, 1, {
//       upgrade(db, oldVersion) {
//         console.log(oldVersion);
        
//         switch (oldVersion) {
//           case 0:
//             const queryStore = db.createObjectStore(queryStoreName, {
//               keyPath: "id",
//               autoIncrement: false, //true,
//             });

//             queryStore.createIndex("favorites", "isFavorite", {
//               unique: false,
//             });
//             break;

//           default:
//             break;
//         }
//       },
//     });
//   })();

//   //check whether indexedDB is supported by the browser
//   function checkIsSupported() {
//     if (!("indexedDB" in window)) {
//       console.log("This browser doesn't support IndexedDB");
//       return false;
//     }

//     return true;
//   }

//   async function add(query) {
//     console.log("Still saving query...");

//     if (!checkIsSupported()) {
//       return;
//     }
    
//     // if (query.id !== null) {
//     //   console.log("Can't add pre-existing query to the database");
//     //   return;
//     // }

//     // const tx = db.transaction(queryStoreName, "readwrite");
//     // const store = tx.objectStore(queryStoreName);

//     const created = (new Date()).getUTCDate();
//     const modified = created;
//     const opened = created;

//     let item = { ...query, ...{ dateCreated: created, dateLastModified: modified, dateLastOpened: opened } };

//     // await tx.store.add(item);

//     // await tx.done;

//     // const success = tx.complete;

//     console.log(item);

//     const success = await db.add(queryStoreName, item, item.id);

//     if (success) {
//       console.log(item);
//       return item;
//     } else {
//       console.log("Failed to save query to the database");
//       return;
//     }
//   }

//   function getUtcDate() {
//     return new Date().getUtcDate();
//   } 

//   return {
//     checkIsSupported: checkIsSupported,
//     add: add,
//   };
// })();

// export default queryStore;
