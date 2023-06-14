async function getServiceTypeList() {
    const response = await fetch('http://localhost:3000/api/service-type')
    const data = await response.json()

    const serviceTypes = document.querySelectorAll('tr > td')

    serviceTypes.forEach(td => {
        const tr = td.parentNode
        tr.remove()
    })

    const serviceTypeListContainer = document.getElementById('service-type-list-container')

    data.forEach(serviceType => {
        const newServiceTypeTr = document.createElement('tr')

        newServiceTypeTr.id = serviceType.id
        newServiceTypeTr.innerHTML = `
        <td>${serviceType.name}</td>
        <td>${serviceType.price}</td>
        <td>${serviceType.duration}</td>
        <td><button class="delete-button" type="button" onclick=deleteServiceType(${serviceType.id})>Deletar</button></td>
        <td><button class="update-button" type="button" onclick=updateServiceType(${serviceType.id})>Atualizar</button></td>
        `
        serviceTypeListContainer.appendChild(newServiceTypeTr)
    })
}

getServiceTypeList()

const createServiceTypeButton = document.getElementById('create-service-type-button')
createServiceTypeButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const name = document.querySelector('input[name="name"]').value
    const price = document.querySelector('input[name="price"]').value
    const duration = document.querySelector('input[name="duration"]').value

    await fetch('http://localhost:3000/api/service-type', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            name,
            price,
            duration
        })
    })
    await getServiceTypeList()
})


async function deleteServiceType(id) {
    const apiURL = 'http://localhost:3000'
    const deleteResult = await fetch(`${apiURL}/api/service-type/${id}`, {
        method: 'DELETE'
    })

    await deleteResult.json()

    await getServiceTypeList()

    location.reload()
}