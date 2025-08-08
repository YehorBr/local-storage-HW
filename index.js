  const formBtn = document.querySelector(".btn-click");
  const formEmail = document.querySelector(".email");
  const formNumber = document.querySelector(".phone-number");
  const formLastName = document.querySelector(".last-name");
  const formFirstName = document.querySelector(".first-name");
  const form = document.querySelector("form");
  const contactsList = document.querySelector(".contacts-list");

  let contacts = JSON.parse(localStorage.getItem("contacts")) || [];

  let editId = null;

  const createListMarkup = (contacts) => {
    const markup = contacts
      .map((contact) => {
        return `<li>
          <p>Iм'я:${contact.firstName}</p>
          <p>Призвище:${contact.lastName}</p>
          <p>Номер:${contact.phone}</p>
          <p>Email:${contact.email}</p>
          <div>
              <button type="button" data-action="edit" data-id="${contact.id}">Редагувати</button>
              <button type="button" data-action="delete" data-id="${contact.id}">Видалити</button>
          </div>
      </li>`;
      })
      .join("");

    contactsList.innerHTML = markup;
  };

  const saveContacts = () => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  };

  function resetForm() {
    formFirstName.value = "";
    formLastName.value = "";
    formNumber.value = "";
    formEmail.value = "";
    editId = null;
    formBtn.textContent = "Додати";
  }

  createListMarkup(contacts);

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const newContact = {
      id: editId || Date.now(),
      firstName: formFirstName.value.trim(),
      lastName: formLastName.value.trim(),
      phone: formNumber.value.trim(),
      email: formEmail.value.trim(),
    };

    if (editId) {
      contacts = contacts.filter(contact => contact.id !== editId);
      contacts.push(newContact);
    } else {
      contacts.push(newContact);
    }

    saveContacts();
    createListMarkup(contacts);
    resetForm();
  });


  contactsList.addEventListener("click", (e)=>{
    const action = e.target.dataset.action
    const id = Number(e.target.dataset.id)

    if(action === "delete"){
      contacts = contacts.filter(contact => contact.id !== id)

      saveContacts()
      createListMarkup(contacts)
    }

    if(action === "edit"){
      const contact = contacts.find(contact => contact.id === id)
      if(contact){
        formFirstName.value = contact.firstName
        formLastName.value= contact.lastName
        formNumber.value = contact.phone
        formEmail.value = contact.email
        editId = contact.id
        formBtn.textContent = 'Зберегти'
      }
    }
  })