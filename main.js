
function Author(name, email) {
    this.name = name;
    this.email = email;
}

function Book(name, price, author) {
    this.name = name;
    this.price = price;
    this.author = author;
}

let books = []; 
let editingIndex = null; 

//   form 
function createBookForm(bookCount) {
    const bookFormContainer = document.getElementById('bookFormContainer');
    bookFormContainer.innerHTML = ''; 

    for (let i = 0; i < bookCount; i++) {
        bookFormContainer.innerHTML += `
            <div class="form-group">
                <h3>Book No  ${i + 1} :- </h3>
                <input type="text" class="booksInput"  id="bookName${i}" placeholder="Book Name" required><br>
                <input type="number"  class="booksInput"  id="bookPrice${i}" placeholder="Book Price" min="1" required><br>
                <input type="text"   class="booksInput"  id="authorName${i}" placeholder="Author Name" required><br>
                <input type="email"  class="booksInput" id="authorEmail${i}" placeholder="Author Email" required><br>
            </div>
        `;
    }
    
    bookFormContainer.innerHTML += `<button id="submitBooks" class="sub">Submit Books</button>`;
    document.getElementById('submitBooks').addEventListener('click',  () => {

        bookTableele = document.getElementById('bookTable');
        bookTableele.classList.remove('hideTable');
        bookTableele.classList.add('showeTable');

        submitBooks();
    });
}

// submit books
function submitBooks() {
    const bookCount = document.getElementById('bookCount').value;
    books = []; 

    for (let i = 0; i < bookCount; i++) {
        const bookName = document.getElementById(`bookName${i}`).value;
        const bookPrice = document.getElementById(`bookPrice${i}`).value;
        const authorName = document.getElementById(`authorName${i}`).value;
        const authorEmail = document.getElementById(`authorEmail${i}`).value;

        // Validation
        if (!bookName || !bookPrice || !authorName || !authorEmail) {
            alert('Please fill in all fields.');
            return;
        }
        const author = new Author(authorName, authorEmail);
        const book = new Book(bookName, bookPrice, author);
        books.push(book); 
    }

    renderTable();
}

//  create the book table
function renderTable() {
    const tbody = document.querySelector('#bookTable tbody');
    tbody.innerHTML = ''; 

    books.forEach((book, index) => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td><span class="editable">${book.name}</span></td>
            <td><span class="editable">${book.price}</span></td>
            <td><span class="editable">${book.author.name}</span></td>
            <td><span class="editable">${book.author.email}</span></td>
            <td>
                <button class="editBtn" onclick="editBook(${index})">Edit</button>
                <button class="deleteBtn" onclick="deleteBook(${index})">Delete</button>
                <button class="saveBtn" onclick="saveBook(${index})" style="display: none;">Save</button>
                <button class="cancelBtn" onclick="cancelEdit(${index})" style="display: none;">Cancel</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

 //  edit a book
function editBook(index) {
    const row = document.querySelector(`#bookTable tbody tr:nth-child(${index + 1})`);
    const editableFields = row.querySelectorAll('.editable');
    editableFields.forEach(field => {
        const value = field.textContent;
        field.innerHTML = `<input type="text" value="${value}">`;
    });

    row.querySelector('.editBtn').style.display = 'none';
    row.querySelector('.deleteBtn').style.display = 'none';
    row.querySelector('.saveBtn').style.display = 'inline-block';
    row.querySelector('.cancelBtn').style.display = 'inline-block';

    editingIndex = index;
}

// cancel editing
function cancelEdit(index) {
    renderTable(); 
}

//  delete  books
function deleteBook(index) {
    books.splice(index, 1); 
    renderTable(); 
}

function saveBook(index) {
    const row = document.querySelector(`#bookTable tbody tr:nth-child(${index + 1})`);
    const inputs = row.querySelectorAll('input');

    // Update the book data
    books[index].name = inputs[0].value;
    books[index].price = inputs[1].value;
    books[index].author.name = inputs[2].value;
    books[index].author.email = inputs[3].value;

    renderTable();
}

document.getElementById('startInput').addEventListener('click', function() {
    const bookCount = document.getElementById('bookCount').value;
    if (bookCount > 0) {
        createBookForm(bookCount);
    } else {
        alert('Please enter a valid number of books.');
    }
});


