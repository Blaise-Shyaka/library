const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function getUserInput() {
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const pages = document.querySelector('#pages').value;
  const readStatus = document.querySelector('#checkbox').checked;

  return {
    title,
    author,
    pages,
    readStatus,
  };
}

function addBookToLibrary() {
  // Declare a variable and assign it the value from getUserInput
  const {
    title, author, pages, readStatus,
  } = getUserInput();
  // Create a book instance
  // const newBook = new Book(title, author, pages, readStatus);
  // Push the new book to the myLibrary array
  // myLibrary.push(newBook);

  console.log(title);
  console.log(author);
  console.log(readStatus);
}

const addBook = document.querySelector('#addBook');

addBook.addEventListener('click', () => {
  addBookToLibrary();
});
