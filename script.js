let myLibrary = [];

function Book(bookTitle, authorFirstName, authorLastName, publicationDate, status) {
  // the constructor...
  this.title = bookTitle;
  this.author = authorFirstName + " " + authorLastName;
  this.publicationDate = publicationDate;
  this.status = status;
}

let bookShelf = document.getElementsByClassName('shelf')[0];
let bookListTableContainer = document.createElement('div');
bookListTableContainer.className = 'book-list-table-container';

let cardShelf = document.createElement('div');
cardShelf.className = 'card-shelf';

let bookInfoForm = document.getElementById('new-book-info');

bookInfoForm.addEventListener('submit', e => {
  e.preventDefault();
  let bTitle = document.getElementById('book-title').value;
  let fName = document.getElementById('author-first-name').value;
  let lName = document.getElementById('author-last-name').value;
  let pDate = document.getElementById('publication-date').value;
  let status = document.getElementById('status-read').checked;

  let newBook = new Book(bTitle, fName, lName, pDate, status);
  addBookToLibrary(newBook);

  document.getElementById('book-title').value = '';
  document.getElementById('author-first-name').value = '';
  document.getElementById('author-last-name').value = '';
  document.getElementById('publication-date').value = '';
  document.getElementById('status-read').checked = false;
  document.getElementById('status-unread').checked = false;
});

function addBookToLibrary(book) {
  // do stuff here
  myLibrary.push(book);

  if (bookShelf.contains(bookListTableContainer)) {
    tableListTheBooks();
  } else {
    cardListTheBooks();
  }
}

function tableListTheBooks() {

    if (bookShelf.contains(bookListTableContainer)) {
      bookShelf.removeChild(bookListTableContainer);
    } 
    
    if (bookShelf.contains(cardShelf)) {
      bookShelf.removeChild(cardShelf);
    }

    bookListTableContainer = document.createElement('div');
    bookListTableContainer.className = 'book-list-table-container';

    const bookListTable = document.createElement('table');
    bookListTable.className = 'book-list-table';

    let tHead = document.createElement('thead');
    let tRow1 = document.createElement('tr');

    let tHeader1 = document.createElement('th');
    tHeader1.className = 'table-header';
    tHeader1.textContent = 'Number';

    let tHeader2 = document.createElement('th');
    tHeader2.className = 'table-header';
    tHeader2.textContent = 'Title';

    let tHeader3 = document.createElement('th');
    tHeader3.className = 'table-header';
    tHeader3.textContent = 'Author';

    let tHeader4 = document.createElement('th');
    tHeader4.className = 'table-header';
    tHeader4.textContent = 'Publication Date';

    let tHeader5 = document.createElement('th');
    tHeader5.className = 'table-header';
    tHeader5.textContent = 'Status';

    let tHeader6 = document.createElement('th');
    tHeader6.className = 'table-header';
    tHeader6.textContent = 'Delete';

    tRow1.append(tHeader1, tHeader2, tHeader3, tHeader4, tHeader5, tHeader6);
    tHead.appendChild(tRow1);
    bookListTable.appendChild(tHead);

    let tBody = document.createElement('tbody'); 
    myLibrary.forEach((b) => {
        let tRow = document.createElement('tr');

        let bookIndex = myLibrary.indexOf(b)+1;
        let tData1 = document.createElement('td');
        tData1.classList.add('table-data');
        tData1.classList.add('number-' + bookIndex);
        tData1.textContent = bookIndex;

        tRow.classList.add('row-' + bookIndex);

        let tData2 = document.createElement('td');
        tData2.className = 'table-data';
        tData2.textContent = b.title;

        let tData3 = document.createElement('td');
        tData3.className = 'table-data';
        tData3.textContent = b.author;

        let tData4 = document.createElement('td');
        tData4.className = 'table-data';
        tData4.textContent = b.publicationDate;

        let tData5 = document.createElement('td');
        tData5.className = 'table-data';
        if (b.status) {
          tData5.textContent = 'Read';
          tData5.style.backgroundColor = 'green';
        } else {
          tData5.textContent = 'Unread';
          tData5.style.backgroundColor = 'red';
        }

        let tData6 = document.createElement('td');
        tData6.className = 'table-data';
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add("crud-btn");
        deleteBtn.classList.add("delete-btn-table");
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', e => {
          let clickedDeleteBtn = e.target;
          let tRowToDelete = clickedDeleteBtn.parentElement.parentElement;
          let tableBody = tRowToDelete.parentElement;

          let bookNumber = tRowToDelete.classList[0].split("-")[1];
          myLibrary.splice(bookNumber-1, 1);
          tableBody.removeChild(tRowToDelete);
          tableListTheBooks();
        });
        tData6.appendChild(deleteBtn);

        tRow.append(tData1, tData2, tData3, tData4, tData5, tData6);

        tBody.appendChild(tRow);
    });

    bookListTable.appendChild(tBody);
    bookListTableContainer.appendChild(bookListTable);

    bookShelf.appendChild(bookListTableContainer);
}

function cardListTheBooks() {

    if (bookShelf.contains(bookListTableContainer)) {
      bookShelf.removeChild(bookListTableContainer);
    } 
    
    if (bookShelf.contains(cardShelf)) {
      bookShelf.removeChild(cardShelf);
    }

    cardShelf = document.createElement('div');
    cardShelf.className = 'card-shelf';

    myLibrary.forEach((b) => {
        const card = document.createElement('div');
        card.className = 'card';
        let h1 = document.createElement('h1');
        h1.textContent = b.title;
        h1.style.display = "block";

        let p1 = document.createElement('p');
        p1.textContent = b.author;
        p1.style.display = "block";

        let p2 = document.createElement('p');
        p2.textContent = b.publicationDate;
        p2.style.display = "block";

        let readingStatusBox = document.createElement('div');
        readingStatusBox.classList.add('reading-status-box');
        if (b.status) {
          readingStatusBox.textContent = 'Read';
          readingStatusBox.style.backgroundColor = 'green';
        } else {
          readingStatusBox.textContent = 'Unread';
          readingStatusBox.style.backgroundColor = 'red';
        }

        let bookIndex = myLibrary.indexOf(b)+1;
        let deleteBtn = document.createElement('button');
        deleteBtn.classList.add('crud-btn');
        deleteBtn.classList.add('delete-btn-card');
        deleteBtn.classList.add('card-' + bookIndex);
        deleteBtn.textContent = 'Delete';

        deleteBtn.addEventListener('click', e => {
          let delBtn = e.target;
          let bookNumber = delBtn.classList[2].split('-')[1];
          myLibrary.splice(bookNumber-1, 1);

          let cardToDelete = delBtn.parentElement;
          cardToDelete.parentElement.removeChild(cardToDelete);

          cardListTheBooks();
        });

        card.append(h1, p1, p2, readingStatusBox, deleteBtn);
        cardShelf.appendChild(card);
    });

    bookShelf.appendChild(cardShelf);
}

const tableViewBtn = document.getElementsByClassName('table-view-btn')[0];
tableViewBtn.addEventListener('click', tableListTheBooks);

const cardViewBtn = document.getElementsByClassName('card-view-btn')[0];
cardViewBtn.addEventListener('click', cardListTheBooks);
