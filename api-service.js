const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("search-btn");
const bookContainer = document.getElementById("book-container");
const bookDetails = document.getElementById("book-details");
const errorDiv = document.getElementById("error");
const resultDiv = document.getElementById("result-number");

searchBtn.addEventListener("click", function () {
  const search = searchInput.value;
  if (search === "") {
    errorDiv.innerText = "Search field cannot be empty.";
    return;
  }
  //  Clear Previous Search Result
  bookContainer.innerHTML = "";
  bookDetails.innerHTML = "";
  const url = `https://openlibrary.org/search.json?q=${search}`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => showData(data))
    .finally(() => {
      searchInput.value === "";
    });
});

function showData(books) {
  // Error Handing
  if (books.numFound === 0) {
    errorDiv.innerText = "NO Result Found";
    resultDiv.innerText = "";
  } else if (books.numFound !== 0) {
    resultDiv.innerText = ` "${books.numFound}" books founds for your search`;
  } else {
    errorDiv.innerText = "";
  }
  // To GET the book details in docs array

  const details = books.docs;

  // To GET the each element of an array
  details.forEach((item) => {
    // console.log(item);
    const div = document.createElement("div");
    div.classList.add("col-md-4");
    div.innerHTML = `
      <!-- Book Image -->
      <div class="rounded overflow-hidden border p-2" >
        <img style="height:300px;width:100px;"
          src='https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg'
          class="w-100"
          alt=""
        />
      </div>
      <!-- Details --> 
      <div
        class="
          py-2
          d-flex
          justify-content-between
          align-items-center
          d-md-block
          text-md-center
        "
      >
        <h4><span class="bg-warning">Book Name:</span> ${item.title}</h4>
        <p><span class="text-primary">Author: </span>${item.author_name}</p>
        <p><span class="text-primary">Publisher: </span>${item.publisher}</p>
        <p><span class="text-primary">Publish Date: </span>${item.publish_date}</p>
        <p><span class="text-primary">First Published: </span>${item.first_publish_year}</p>
      </div>
      `;
    bookContainer.appendChild(div);
  });
}
