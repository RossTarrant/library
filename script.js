let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function(){
        let bookInfo = `${this.title} by ${this.author}, ${this.pages} pages.`;
        return bookInfo;
    }
}

function addBookToLibrary(title, author, pages, read) {
  let haveRead = "";
  if(read==="on"){
      haveRead = true;
  }
  else{
      haveRead = false;
  }
  newBook = new Book(title, author, pages, haveRead);
  myLibrary.push(newBook);
}

function displayBooks(){
    const content = document.querySelector(".content");
    for (let pos in myLibrary) {
        let newCard = document.createElement("div");
        newCard.classList.add("card")
        let title = document.createElement("h1");
        title.textContent = `${myLibrary[pos].title}`;
        let author = document.createElement("h2");
        author.textContent = `by ${myLibrary[pos].author}`;
        let pages = document.createElement("p");
        pages.textContent = `${myLibrary[pos].pages} pages`;
        let read = document.createElement("p");
        let haveRead = "";
        if(myLibrary[pos].read===true){
            haveRead = "Read"
            read.classList.add("read");
        }
        else{
            haveRead = "Not Read";
            read.classList.add("not-read");
        }
        read.textContent = `${haveRead}`;

        let icons = document.createElement("div")

        let toggleIcon = document.createElement("img");
        toggleIcon.setAttribute("src", "toggle.svg")
        toggleIcon.classList.add("icon")
        toggleIcon.classList.add("toggle")
        icons.appendChild(toggleIcon)
        toggleIcon.addEventListener("click", function(){
            if(myLibrary[pos].read===true){
                myLibrary[pos].read = false;
            }
            else{
                myLibrary[pos].read = true;
            }
            resetDisplay();
            displayBooks();
        })

        let trashIcon = document.createElement("img");
        trashIcon.setAttribute("src", "trash.svg")
        trashIcon.classList.add("icon")
        trashIcon.classList.add("trash")
        icons.appendChild(trashIcon)
        trashIcon.addEventListener("click", function(){
            myLibrary.splice(pos, 1)
            resetDisplay();
            displayBooks();
        })

        newCard.appendChild(title);
        newCard.appendChild(author);
        newCard.appendChild(pages);
        newCard.appendChild(read);
        newCard.appendChild(icons)
        content.appendChild(newCard);
    }
}

function resetDisplay(){
    const title = document.querySelector(".title")
    const author = document.querySelector(".author")
    const pages = document.querySelector(".pages")
    const read = document.querySelector(".read")
    title.value = "";
    author.value = "";
    pages.value = 0;
    read.checked = false;
    const cardNodes = document.querySelector(".content").childNodes;
    for(let i=cardNodes.length-1 ; i >= 0; i--){
        let cardNode = cardNodes[i]
        cardNode.remove();
    }
}

function addBook(){
    const addBookForm = document.forms.addBookForm;
    const formData = new FormData(addBookForm);
    const title = formData.get("title");
    const author = formData.get("author");
    const pages = formData.get("pages");
    const read = formData.get("read");
    if(validateForm()===true){
        addBookToLibrary(title, author, pages, read);
        resetDisplay();
        displayBooks();
        closeForm();
    }
}

function validateForm(){
    const title = document.querySelector(".title")
    const author = document.querySelector(".author")
    const pages = document.querySelector(".pages")
    const read = document.querySelector(".read")
    if(title.value != "" && author.value != ""){
        title.setAttribute("style", "border:1px solid black")
        author.setAttribute("style", "border:1px solid black")
        return true;
    }
    else{
        if (title.value === ""){
            title.setAttribute("style", "border:1px solid red")
        }
        if (author.value === ""){
            author.setAttribute("style", "border:1px solid red")
        }
        return false;
    }
}

function openForm() {
    document.getElementById("addForm").style.display = "block";
}
  
function closeForm() {
    document.getElementById("addForm").style.display = "none";
}

addBookToLibrary("Dune", "Frank Herbert", 412, false);
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "on");
displayBooks();


const addBtn = document.querySelector(".add-button");
addBtn.addEventListener("click", function(){
    openForm();
})

const demoBtn = document.querySelector(".demo-button");
demoBtn.addEventListener("click", function(){
    myLibrary = [];
    resetDisplay();
    addBookToLibrary("The Hunger Games", "Suzanne Collins", 374, "on");
    addBookToLibrary("Twilight", "Stephanie Meyer", 498, false);
    addBookToLibrary("The Giving Tree", "Shel Silverstein", 64, "on");
    addBookToLibrary("Green Eggs and Ham", "Dr. Seuss", 64, "on");
    addBookToLibrary("The Da Vinci Code", "Dan Brown", 489, "on");
    addBookToLibrary("Romeo and Juliet", "William Shakespeare", 281, false);
    addBookToLibrary("Dracula", "Bram Stoker", 488, false);
    addBookToLibrary("Dune", "Frank Herbert", 412, false);
    addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 310, "on");
    displayBooks();
})