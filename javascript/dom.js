export const createBookElement = ({ id, title, author, year, isComplete }) => {
  const bookContainer = document.createElement("div");
  bookContainer.classList.add("book-item");
  bookContainer.dataset.bookId = id;
  bookContainer.dataset.testid = "bookItem";

  bookContainer.innerHTML = `
    <h3 data-testid="bookItemTitle">${title}</h3>
    <p data-testid="bookItemAuthor">Penulis: ${author}</p>
    <p data-testid="bookItemYear">Tahun: ${year}</p>
    <div>
      <button data-testid="bookItemIsCompleteButton" class="toggle-btn">
        ${isComplete ? "Belum Selesai" : "Selesai Dibaca"}
      </button>
      <button data-testid="bookItemDeleteButton" class="delete-btn">Hapus</button>
      <button data-testid="bookItemEditButton" class="edit-btn">Edit</button>
    </div>
  `;

  return bookContainer;
};

export const renderBooks = (books) => {
  const incompleteBookList = document.getElementById("incompleteBookList");
  const completeBookList = document.getElementById("completeBookList");

  // Kosongkan kontainer terlebih dahulu
  incompleteBookList.innerHTML = "";
  completeBookList.innerHTML = "";

  // Jika tidak ada buku, tampilkan pesan kosong
  if (books.length === 0) {
    incompleteBookList.innerHTML = "<p>Tidak ada buku di rak.</p>";
    completeBookList.innerHTML = "<p>Tidak ada buku di rak.</p>";
    return;
  }

  // Render buku sesuai kategori
  books.forEach((book) => {
    const bookElement = createBookElement(book);
    if (book.isComplete) {
      completeBookList.appendChild(bookElement);
    } else {
      incompleteBookList.appendChild(bookElement);
    }
  });
};
