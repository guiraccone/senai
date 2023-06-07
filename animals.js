async function getAnimalList() {
    const response = await fetch('http://localhost:3000/api/animals')
    const data = await response.json()

    const animals = document.querySelectorAll('tr > td')

    animals.forEach(td => {
        const tr = td.parentNode
        tr.remove()
    })

    const animalListContainer = document.getElementById('animal-list-container')

    data.forEach(animal => {
        const newAnimalTr = document.createElement('tr')

        newAnimalTr.id = animal.id
        newAnimalTr.innerHTML = `
    <td>${animal.name}</td>
    <td>${animal.breed}</td>
    <td>${animal.age}</td>
    <td>${animal.weight}</td>
    <td>${animal.ownerName}</td>
    <td>${animal.isVacinated}</td>
    `
        animalListContainer.appendChild(newAnimalTr)
    })
}

getAnimalList()

const createAnimalButton = document.getElementById('create-animal-button')
createAnimalButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const breed = document.querySelector('input[name="breed"]').value
    const age = document.querySelector('input[name="age"]').value
    const weight = document.querySelector('input[name="weight"]').value
    const ownerName = document.querySelector('input[name="ownerName"]').value
    const isVacinated = document.querySelector('input[name="isVacinated"]').value

    await fetch('http://localhost:3000/api/animal', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            breed,
            age,
            weight,
            ownerName,
            isVacinated
        })
    })
    await getAnimalList()
})