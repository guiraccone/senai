async function getUserList() {
    const response = await fetch('http://localhost:3000/api/user')
    const data = await response.json()

    const users = document.querySelectorAll('tr > td')

    users.forEach(td => {
        const tr = td.parentNode
        tr.remove()
    })

    const userListContainer = document.getElementById('user-list-container')

    data.forEach(user => {
        const newUserTr = document.createElement('tr')

        newUserTr.id = user.id
        newUserTr.innerHTML = `
        <td>${user.name}</td>
        <td>${user.birthDate}</td>
        <td>${user.email}</td>
        <td>${user.cpf}</td>
        <td>
        <button class="delete-button" type="button" onclick="deleteUser(${user.id})">Deletar</button>
        <button class="update-button" type="button" onclick=updateUser(${user.id})>Atualizar</button>
        </td>
    `
        userListContainer.appendChild(newUserTr)
    })
}

getUserList()

const createUserButton = document.getElementById('create-user-button')
createUserButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const birthDate = document.querySelector('input[name="birthDate"]').value
    const email = document.querySelector('input[name="email"]').value
    const cpf = document.querySelector('input[name="cpf"]').value

    await fetch('http://localhost:3000/api/user', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            birthDate,
            email,
            cpf,
        })
    })
    await getUserList()
})

async function deleteUser(id) {
    const apiURL = 'http://localhost:3000'
    const deleteResult = await fetch(`${apiURL}/api/user/${id}`, {
        method: 'DELETE'
    })

    await deleteResult.json()

    await getUserList()

    location.reload()
}
