const URL = "https://randomuser.me/api/";

const btn = document.querySelector(".btn");
const userImage = document.querySelector(".user-image");
const userTitle = document.querySelector(".title");
const userValue = document.querySelector(".value");
const iconsBtns = [...document.querySelectorAll(".icon-btn")];
const btns = [...document.querySelectorAll(".icons-container button")];

const fetchUser = async () => {
  const response = await fetch(URL);
  const data = await response.json();
  const person = data.results[0];

  const { large: image } = person.picture;
  const { first, last } = person.name;
  const { email } = person;
  const { age } = person.dob;
  const { number, name } = person.location.street;
  const { cell: phone } = person;
  const { password } = person.login;

  return {
    image,
    email,
    age,
    phone,
    password,
    street: `${number} ${name}`,
    name: `${first} ${last}`,
  };
};

const displayPerson = (person) => {
  userImage.src = person.image;
  userTitle.textContent = `My name is`;
  userValue.textContent = person.name;

  iconsBtns.forEach(function (btn) {
    btn.classList.remove("active-icon");
  });
  iconsBtns[0].classList.add("active-icon");

  btns.forEach((btn) => {
    const label = btn.dataset.label;
    btn.addEventListener("click", (e) => {
      userTitle.textContent = `My ${label} is`;
      userValue.textContent = person[label];

      iconsBtns.forEach(function (btn) {
        btn.classList.remove("active-icon");
      });

      e.currentTarget.children[0].classList.add("active-icon");
    });
  });
};

const showUser = async () => {
  const person = await fetchUser();
  displayPerson(person);
};

window.addEventListener("DOMContentLoaded", showUser);
btn.addEventListener("click", showUser);
