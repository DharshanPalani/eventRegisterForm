const DB_NAME = "registration_cache";
const DB_VERSION = 1;
const STORE_NAME = "pending_data";

export interface PendingRegistration {
  id?: number;
  name: string;
  rollNo: string;
  registrationNo: string;
  category: string;
  department: string;
  phone: string;
  imageFile?: File;
  imageName?: string;
  imageType?: string;
  timestamp: number;
}

const initDB = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        const store = db.createObjectStore(STORE_NAME, {
          keyPath: "id",
          autoIncrement: true,
        });
        store.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
};

export const savePending = async (
  data: Omit<PendingRegistration, "id" | "timestamp">,
): Promise<number> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);

    const pending: PendingRegistration = {
      ...data,
      timestamp: Date.now(),
    };

    const request = store.add(pending);
    request.onsuccess = () => resolve(request.result as number);
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

export const getPending = async (): Promise<PendingRegistration | null> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readonly");
    const store = transaction.objectStore(STORE_NAME);
    const index = store.index("timestamp");
    const request = index.openCursor(null, "prev");

    request.onsuccess = (event) => {
      const cursor = (event.target as IDBRequest).result;
      resolve(cursor ? cursor.value : null);
    };
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};

export const clearPending = async (id: number): Promise<void> => {
  const db = await initDB();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const request = store.delete(id);

    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
    transaction.oncomplete = () => db.close();
  });
};
