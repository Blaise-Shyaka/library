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

function validateForm(obj) {
  const formValues = Object.values(obj);
  let emptyInputTagsCount = 0;
  for (let i = 0; i < formValues.length; i += 1) {
    if (formValues[i].length === 0) emptyInputTagsCount += 1;
  }

  if (emptyInputTagsCount > 0) return false;
  return true;
}

function notifyUser(obj) {
  const titleNotice = document.querySelector('#title-notice');
  const authorNotice = document.querySelector('#author-notice');
  const pagesNotice = document.querySelector('#pages-notice');

  if (obj.title.length === 0) {
    titleNotice.innerHTML = 'Title is required';
  }

  if (obj.author.length === 0) {
    authorNotice.innerHTML = 'Author is required';
  }

  if (obj.pages.length === 0) {
    pagesNotice.innerHTML = 'Number of pages is required';
  }
}

function cleanNoticeBoard() {
  document.querySelector('#title-notice').innerHTML = '';
  document.querySelector('#author-notice').innerHTML = '';
  document.querySelector('#pages-notice').innerHTML = '';
}

function addBookToLibrary() {
  cleanNoticeBoard();

  const formIsValid = validateForm(getUserInput());
  if (!formIsValid) return notifyUser(getUserInput());

  const {
    title, author, pages, readStatus,
  } = getUserInput();
  const newBook = new Book(title, author, pages, readStatus);
  myLibrary.push(newBook);
}

const addBook = document.querySelector('#addBook');

addBook.addEventListener('click', () => {
  addBookToLibrary();
});
