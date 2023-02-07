let myLibrary = ['Book 1', 'Book 2', 'Book 3'];

function Book() {
  // the constructor...
}

function addBookToLibrary(book) {
  // do stuff here

  myLibrary.push(book);
}

const bookShelf = document.getElementsByClassName('shelf');
function tableListTheBooks() {
    let table = document.createElement('table');
    table.className = 'book-list-table';

    let tRow1 = document.createElement('tr');
    let tHeader1 = document.createElement('th');
    tHeader1.className = 'table-header';
    tHeader1.textContent = 'Books';
    tRow1.appendChild(tHeader1);
    table.appendChild(tRow1);

    myLibrary.forEach((b) => {
        let tRow = document.createElement('tr');
        let tData = document.createElement('td');
        tData.className = 'table-data';
        tData.textContent = b.toString();
        tRow.appendChild(tData);

        table.appendChild(tRow);
    });

    bookShelf[0].appendChild(table);
}

function cardListTheBooks() {
    const cardShelf = document.createElement('div');
    cardShelf.className = 'card-shelf';

    myLibrary.forEach((b) => {
        const card = document.createElement('div');
        card.className = 'card';
        card.textContent = b.toString();
        cardShelf.appendChild(card);
    });

    bookShelf[0].appendChild(cardShelf);
}

const tableViewBtn = document.getElementsByClassName('table-view-btn');
tableViewBtn[0].addEventListener('click', tableListTheBooks);

const cardViewBtn = document.getElementsByClassName('card-view-btn');
cardViewBtn[0].addEventListener('click', cardListTheBooks);