const cards = document.getElementById("cards");
const input = document.getElementById("input");
const search = document.getElementById("search");
const detailsContainer = document.getElementById("details-container");

const loadPhones = (value) => {
  fetch(`https://openapi.programming-hero.com/api/phones?search=${value}`)
    .then((res) => res.json())
    .then((data) => displayPhones(data.data));
};

const loadPhone = (id) => {
  fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
    .then((res) => res.json())
    .then((data) => displayPhoneDetails(data.data));
};

const displayPhoneDetails = (phone) => {
  detailsContainer.textContent = "";

  const div = document.createElement("div");
  div.innerHTML = `
    <div class="card">
      <img src="${phone.image}" class="card-img-top w-25 mx-auto" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${phone.name}</h5>
        <h6 class="card-title">${phone.brand}</h6>
        <h6 class="card-title">${getReleaseDate(phone.releaseDate)}</h6>
        
        <h1>Main Features</h1>
        ${getMainFeatures(phone.mainFeatures)}
        
        <h1>Others</h1>
        ${getOthers(phone.others)}
      </div>
    </div>
  `;

  detailsContainer.appendChild(div);
};

const displayPhones = (phones) => {
  detailsContainer.textContent = "";
  cards.textContent = "";

  if (phones.length <= 0) {
    detailsContainer.innerHTML = `
    <h2 class='text-danger'>No Result Found</h2>
    `;
  }

  phones.slice(0, 20).forEach((phone) => {
    const col = document.createElement("div");
    col.classList.add("col");

    col.innerHTML = `
    <div class="card">
      <img src="${phone.image}" class="card-img-top" alt="..." />
      <div class="card-body">
        <h5 class="card-title">${phone.phone_name}</h5>
        <h6 class="card-title">${phone.brand}</h6>
        <button onclick="loadPhone('${phone.slug}')" class="btn btn-success">Details</button>
      </div>
    </div>
    `;

    cards.appendChild(col);
  });
};

search.addEventListener("click", () => {
  loadPhones(input.value);
});

function getReleaseDate(releaseDate) {
  if (releaseDate) return releaseDate;
  else return "No Release Date Found";
}

function getMainFeatures(features) {
  if (features) {
    let string = "";

    Object.keys(features).forEach((key) => {
      string += `<h6 class="card-title">${features[key]}</h6>`;
    });

    return string;
  } else return "";
}

function getOthers(features) {
  if (features) {
    let string = "";

    Object.keys(features).forEach((key) => {
      string += `<h6 class="card-title">${features[key]}</h6>`;
    });

    return string;
  } else return "";
}
