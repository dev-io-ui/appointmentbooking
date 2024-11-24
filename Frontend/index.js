window.onload = function () {
    displayAll();
};

function handleOnClick(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const user = {
        username,
        email,
        phone
    };

    axios.post("http://localhost:1000/add-appointment", user)
        .then((res) => {
            console.log("user added");
            console.log(res);
            displayAll();
        })
        .catch((err) => {
            console.log(err, "error in frontend call to post");
        });

    document.getElementById('username').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phone').value = '';

};

function displayAll() {


    axios.get("http://localhost:1000/users")
        .then((response) => {

            const ele = document.getElementById('user-list');

            if (ele) {

                ele.innerHTML = '';



                if (Array.isArray(response.data)) {
                    for (let i = 0; i < response.data.length; i++) {
                        const item = response.data[i];


                        const listItem = document.createElement('li');
                        listItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
                        listItem.innerHTML = `${item.username} - ${item.email} - ${item.phonNumber}`;

                        const deleteBtn = document.createElement('button');
                        const editBtn = document.createElement('button');
                        deleteBtn.innerText = 'Delete';
                        editBtn.innerHTML = 'Edit';
                        deleteBtn.classList.add('btn', 'btn-danger', 'btn-sm', 'm-1');
                        editBtn.classList.add('btn', 'btn-warning', 'btn-sm', 'm-1');
                        deleteBtn.setAttribute('data-id', item.id);
                        editBtn.setAttribute('data-id', item.id);
                        editBtn.onclick = function () {
                            editAppointment(item.id, item);
                        }
                        deleteBtn.onclick = function () {
                            deleteAppointment(item.id);
                        };
                        listItem.appendChild(editBtn);
                        listItem.appendChild(deleteBtn);
                        ele.appendChild(listItem);
                    }

                }
            }
            else {
                console.error("Invalid data format received from backend.");
            }

        }).catch((err) => {
            console.log(err);
        });
}

function deleteAppointment(id) {
    axios.delete(`http://localhost:1000/delete-appointment/${id}`)
        .then((res) => {
            console.log(res);
            displayAll();
        }).catch((err) => {
            console.log(err);
        });
};

function editAppointment(id, userBody) {

    const updatedUsername = prompt("Enter new username", userBody.username) || userBody.username;
    const updatedEmail = prompt("Enter new email", userBody.email) || userBody.email;
    const updatedPhone = prompt("Enter new phone", userBody.phonNumber) || userBody.phonNumber;

    const updatedUser = {
        username: updatedUsername,
        email: updatedEmail,
        phone: updatedPhone
    };
    axios.put(`http://localhost:1000/edit-appointment/${id}`, updatedUser)
        .then((res) => {

            console.log(username);
            console.log(res);
            displayAll();
        }).catch((err) => {
            console.log(err);
        });
};