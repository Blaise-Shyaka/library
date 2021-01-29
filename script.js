const myLibrary = [];

function Book(title, author, pages, readStatus) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.readStatus = readStatus;
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

function cleanForm(){
  document.querySelector('#title').value = '';
  document.querySelector('#author').value = '';
  document.querySelector('#pages').value = '';
  document.querySelector('#checkbox').checked = false;
}

function addCard(arr, obj) {
  const card = `<div class='col-sm-4 my-2'>
    <div class='card text-center text-dark bg-light'>
      <div class='card-header'>
        ${obj.title}
      </div>
      <div class='card-body'>
        <h5 class='card-title'>${obj.author}</h5>
        <p class='card-text'>${obj.pages} pages</p>
        ${obj.readStatus ? "<a href='#' class='btn btn-success'>Read</a>"
    : "<a href='#' class='btn btn-primary'>Not read</a>"}
        <a href='#' class='btn btn-danger dlt-button' data-index-number="${arr.indexOf(obj)}">Delete</a>
      </div>
    </div>
  </div>`;

  return card;
}

let booksList = [];

function printCard(arr) {
  const markup = arr.map(elt => addCard(arr, elt)).join('');
  booksList = document.querySelector('#books_list');

  booksList.innerHTML = markup;
  let allDeleteBtn = document.querySelectorAll('.dlt-button');
  allDeleteBtn.forEach(dltButton => dltButton.addEventListener('click', deleteOneCard));
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

let deleteButtons = [];

addBook.addEventListener('click', () => {
  addBookToLibrary();
  printCard(myLibrary);
  cleanForm()
});

function deleteOneCard(event) {
  const clickedButton = event.currentTarget;
  const correspondingBookIndex = clickedButton.dataset.indexNumber;
  myLibrary.splice(correspondingBookIndex, 1);
  printCard(myLibrary);
}
