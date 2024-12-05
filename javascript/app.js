import { saveData, loadData, clearAllBooks } from "./storage.js";
import { renderBooks } from "./dom.js";

const books = loadData();
const incompleteBookList = document.getElementById("incompleteBookList");
const completeBookList = document.getElementById("completeBookList");

// Menambahkan buku baru
const addBook = (title, author, year, isComplete) => {
  const newBook = {
    id: +new Date(),
    title,
    author,
    year,
    isComplete,
  };
  books.push(newBook);
  document.dispatchEvent(new Event("booksChanged"));
};

// Menghapus buku
const removeBook = (bookId) => {
  const bookIndex = books.findIndex((book) => book.id === bookId);
  if (bookIndex !== -1) {
    books.splice(bookIndex, 1);
    document.dispatchEvent(new Event("booksChanged"));
  }
};

// Mengubah status selesai/belum selesai
const toggleBookStatus = (bookId) => {
  const book = books.find((b) => b.id === bookId);
  if (book) {
    book.isComplete = !book.isComplete;
    document.dispatchEvent(new Event("booksChanged"));
  }
};

// Mengedit buku
const editBook = (bookId) => {
  const book = books.find((b) => b.id === bookId);
  if (book) {
    const newTitle = prompt("Edit Judul Buku", book.title);
    const newAuthor = prompt("Edit Penulis Buku", book.author);
    const newYear = prompt("Edit Tahun Buku", book.year);

    if (newTitle && newAuthor && newYear) {
      book.title = newTitle;
      book.author = newAuthor;
      book.year = newYear;
      document.dispatchEvent(new Event("booksChanged"));
    }
  }
};

// Menangani klik pada tombol di form tambah buku
document.getElementById("bookForm").addEventListener("click", (event) => {
  if (event.target.id === "addToIncomplete" || event.target.id === "addToComplete") {
    const title = document.getElementById("bookFormTitle").value;
    const author = document.getElementById("bookFormAuthor").value;
    const year = document.getElementById("bookFormYear").value;
    const isComplete = event.target.id === "addToComplete";

    addBook(title, author, year, isComplete);

    // Reset form
    document.getElementById("bookForm").reset();
  }
});

// Menangani form pencarian buku
document.getElementById("searchBook").addEventListener("submit", (event) => {
  event.preventDefault();
  const query = document.getElementById("searchBookTitle").value.toLowerCase();

  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(query));

  renderBooks(filteredBooks, incompleteBookList, completeBookList);
});

// Menangani klik tombol hapus, ubah status, dan edit
document.addEventListener("click", (event) => {
  const bookId = parseInt(event.target.parentElement.parentElement.dataset.bookId);

  if (event.target.dataset.testid === "bookItemDeleteButton") {
    removeBook(bookId);
  } else if (event.target.dataset.testid === "bookItemIsCompleteButton") {
    toggleBookStatus(bookId);
  } else if (event.target.dataset.testid === "bookItemEditButton") {
    editBook(bookId);
  }
});

// Menyimpan data ke localStorage dan memperbarui tampilan
document.addEventListener("booksChanged", () => {
  renderBooks(books, incompleteBookList, completeBookList);
  saveData(books);
});

// Initial rendering
document.dispatchEvent(new Event("booksChanged"));

// Hubungkan tombol dengan fungsi
const clearAllButton = document.getElementById("clearAllBooks");
clearAllButton.addEventListener("click", clearAllBooks);
