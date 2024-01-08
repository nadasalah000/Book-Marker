// ! HTML ELEMENT
var bookmarkName = document.getElementById("bookmarkName");
var bookmarkURL = document.getElementById("bookmarkURL");
var myRow = document.getElementById("myRow");
var myBtn = document.getElementById("myBtn");
var yourBtn = document.getElementById("yourBtn");
var error = document.getElementById("error");
var error2 = document.getElementById("error2");
var error3 = document.getElementById("error3");
var error4 = document.getElementById("error4");

// ! VARIABLES
var books;
var updateIndex;

if(localStorage.getItem("books")){
    books = JSON.parse(localStorage.getItem("books"));
    console.log(books);
    displayBook(books);
}else{
    books = [];
}

function saveToLocalStorage(){
    localStorage.setItem("books", JSON.stringify(books));
}

// ! FUNCTIONS
function addBook(){
            if(bookNameValidation()===true && bookUrlValidation()===true){
                var book = {
                    name:bookmarkName.value,
                    url:bookmarkURL.value
                }
                books.push(book);
                displayBook(books);
                clearBook();
            }else{
                console.log("error");
                clearBook();
            }
    saveToLocalStorage();
    removeEditName();
    removeEditUrl();
}
  
function editBook(){
   console.log(books[updateIndex]);
   books[updateIndex].name = bookmarkName.value;
   books[updateIndex].url = bookmarkURL.value;
   displayBook(books);
   clearBook();
   removeEditName();
   removeEditUrl();
   myBtn.classList.replace("d-none","d-block");
   yourBtn.classList.replace("d-block","d-none");
}

function displayBook(Bbook){
    var cartoona = "";
    for(var i=0; i< Bbook.length; i++){
        cartoona += `<tr>
        <td><i class="fa-solid fa-forward fa-shake"></i>${i+1}</td>
        <td>${Bbook[i].name}</td>
        <td>
            <button class="btn btn-outline-success imp3" type="button">
                <i class="fa-solid fa-eye fa-shake color-success"></i>
                <a href="${Bbook[i].url}" target="_blank">visit</a>
            </button>
        </td>
        <td>
            <button class="btn btn-outline-primary imp3" type="button" onclick="updateBook(${i})">
                <i class="fa-solid fa-pencil fa-shake color-primary"></i>
                update
            </button>
        </td>
        <td>
            <button class="btn btn-outline-danger imp3" type="button" onclick="deleteBook(${i})">
                <i class="fa-solid fa-trash fa-shake color-danger"></i>
                delete
            </button>
        </td>
    </tr>`
    }
    myRow.innerHTML=cartoona;
}

function clearBook(){
    bookmarkName.value="";
    bookmarkURL.value="";
}

function deleteBook(index){
    books.splice(index,1);
    displayBook(books);
}

function updateBook(i){
    updateIndex=i;
    bookmarkName.value= books[i].name;
    bookmarkURL.value= books[i].url;
    myBtn.classList.replace("d-block","d-none");
    yourBtn.classList.replace("d-none","d-block");
}

function bookNameValidation(){
    var regex = /^[A-Z]+[A-Za-z0-9\s]{2,20}$/;
    if(regex.test(bookmarkName.value)===true){
        if(bookmarkName.classList=="is-valid"){
            error.classList.replace("d-none","d-block")
            error2.classList.replace("d-block","d-none")
        }else{
            error2.classList.replace("d-none","d-block")
            error.classList.replace("d-block","d-none")
        }
        bookmarkName.classList.add("is-valid");
        bookmarkName.classList.remove("is-invalid");
        return true;
    }else{
        if(bookmarkName.classList=="is-invalid"){
            error.classList.replace("d-block","d-none")
            error2.classList.replace("d-none","d-block")
        }else{
            error2.classList.replace("d-block","d-none")
            error.classList.replace("d-none","d-block")
        }
        bookmarkName.classList.add("is-invalid");
        bookmarkName.classList.remove("is-valid");
        return false;
    }
}

function removeEditName(){
    error.classList.replace("d-block","d-none");
    error2.classList.replace("d-block","d-none");
    bookmarkName.classList.remove("is-valid");
    bookmarkName.classList.remove("is-invalid");
}

function bookUrlValidation(){
    // var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
    var regex = /[Hh][Tt][Tt][Pp][Ss]?:\/\/[a-zA-Z0-9_+%-]+(.[a-z])/
    if(regex.test(bookmarkURL.value)===true){
        if(bookmarkName.classList=="is-valid"){
            error3.classList.replace("d-none","d-block")
            error4.classList.replace("d-block","d-none")
        }else{
            error4.classList.replace("d-none","d-block")
            error3.classList.replace("d-block","d-none")
        }
        bookmarkURL.classList.add("is-valid");
        bookmarkURL.classList.remove("is-invalid");
        return true;
    }else{
        if(bookmarkName.classList=="is-invalid"){
            error3.classList.replace("d-block","d-none")
            error4.classList.replace("d-none","d-block")
        }else{
            error4.classList.replace("d-block","d-none")
            error3.classList.replace("d-none","d-block")
        }
        bookmarkURL.classList.add("is-invalid");
        bookmarkURL.classList.remove("is-valid");
        return false;
    }
}

function removeEditUrl(){
    error3.classList.replace("d-block","d-none");
    error4.classList.replace("d-block","d-none");
    bookmarkURL.classList.remove("is-valid");
    bookmarkURL.classList.remove("is-invalid");
}
