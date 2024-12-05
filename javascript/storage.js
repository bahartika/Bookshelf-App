import { renderBooks } from "./dom.js";

const STORAGE_KEY = "BOOKSHELF_APPS";

export const saveData = (books) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const loadData = () => {
  const serializedData = localStorage.getItem(STORAGE_KEY);
  return serializedData ? JSON.parse(serializedData) : [];
};

// Hapus semua buku
export const clearAllBooks = () => {
  // Kosongkan data buku di localStorage
  const confirmClear = confirm("Apakah Anda yakin ingin menghapus semua buku?");
  if (confirmClear) {
    localStorage.removeItem(STORAGE_KEY);
    // books.length = 0;
    renderBooks([]);
    alert("Semua buku telah dihapus.");
  }
};
