let textField = document.getElementById("text");
const ul = document.getElementById("ul");
const form = document.getElementById("form");
const url = window.location;
let tags;

function renderTags() {
  const tagUrl = url.hash.split("#tags=")[1];
  tags = tagUrl.split(",");
  tags = tags.filter((n) => n);
  url.hash = `tags=${tags.join()}`;
  console.log(tags);
  ul.innerHTML = "";
  tags.forEach((tag, index) => {
    const li = document.createElement("li");
    li.setAttribute("value", index);
    li.appendChild(document.createTextNode(tag));
    li.addEventListener("click", remove, false);
    ul.appendChild(li);
  });
}

function updateLink(event) {
  event.preventDefault();

  const data = new FormData(event.target);
  let value = data.get("tagName");
  console.log(value);
  if (value) {
    tags.push(value);
    url.hash = `tags=${tags.join()}`;
    textField.value = "";
  }
}

function remove(event) {
  tags.splice(event.target.value, 1);
  url.hash = `tags=${tags.join()}`;

  renderTags();
  console.log(tags);
}

window.addEventListener(
  "load",
  () => window.location.replace("index.html#tags="),
  false
);

form.addEventListener("submit", updateLink);
window.addEventListener("hashchange", renderTags, false);
