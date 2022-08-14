const inputId = document.querySelector("#id");
const inputUsername = document.querySelector("#username");
const inputPassword = document.querySelector("#password");
const dataContainer = document.querySelector("#data-container");
const btnSubmit = document.querySelector("#btn-submit");
let dataAkun = [];

async function getFromStorage() {
  try {
    const dataFromStorage = await localStorage.getItem("data");
    if (dataFromStorage === null) return;
    dataAkun = JSON.parse(dataFromStorage);

    load();
  } catch (e) {
    console.log(e.message);
  }
}
async function updateStorage() {
  try {
    await localStorage.setItem("data", JSON.stringify(dataAkun));
  } catch (e) {
    console.log(e.message);
  }
}
function load() {
  console.log(dataAkun);
  dataContainer.innerHTML = `
     ${dataAkun
       .map((item, index) => {
         return `
          <tr>
            <td>${item.username}</td>
            <td>${item.password}</td>
            <td><div class="btn-group" role="group" aria-label="Basic example"><a href="javascript:;" onclick="editData(${parseInt(
              index
            )})" class="btn btn-primary btn-sm"><b>edit</b></a><a href="javascript:;" onclick="deleteData(${index})" class="btn btn-danger btn-sm"><b>hapus</b></a></div></td>
          </tr>
        `;
       })
       .join("")}
  `;
}
function addData(e) {
  e.preventDefault();

  if (inputId.value !== "") return updateData();
  if (
    inputUsername.value === "" ||
    inputPassword.value === ""
  )
    return;
  dataAkun.push({
    id: uuid.v4(),
    username: inputUsername.value,
    password: inputPassword.value
  });

  inputUsername.value = "";
  inputPassword.value = "";
  updateStorage();
  load();
}
function editData(index) {
  const filtered = dataAkun.filter((_, i) => i === index)[0];
  btnSubmit.innerText = "Ubah";
  inputId.value = filtered.id;
  inputUsername.value = filtered.username;
  inputPassword.value = filtered.password;
}
function updateData() {
  const index = dataAkun.findIndex((x) => x.id === inputId.value);
  dataAkun[index].username = inputUsername.value;
  dataAkun[index].password = inputPassword.value;

  inputId.value = "";
  inputUsername.value = "";
  inputPassword.value = "";
  btnSubmit.innerText = "Tambah";
  updateStorage();
  load();
}
function deleteData(index) {
  dataAkun.splice(index, 1);
  updateStorage();
  load();
}

getFromStorage();