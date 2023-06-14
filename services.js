async function getServiceList() {
    const response = await fetch('http://localhost:3000/api/service')
    const data = await response.json()

    const services = document.querySelectorAll('tr > td')

    services.forEach(td => {
        const tr = td.parentNode
        tr.remove()
    })

    const serviceListContainer = document.getElementById('service-list-container')

    data.forEach(service => {
        const newServiceTr = document.createElement('tr')

        newServiceTr.id = service.id
        newServiceTr.innerHTML = `
        <td>${service.serviceType}</td>
        <td>${service.animal}</td>
        <td>${service.scheduledDate}</td>
        <td>
        <button class="delete-button" type="button" onclick=deleteService(${service.id})>Deletar</button>
        <button class="update-button" type="button" onclick=updateService(${service.id})>Atualizar</button>
        </td>
        `
        serviceListContainer.appendChild(newServiceTr)
    })
}

getServiceList()

const createServiceButton = document.getElementById('create-service-button')
createServiceButton.addEventListener('click', async (event) => {
    event.preventDefault()

    const serviceType = document.querySelector('input[name="service_type"]').value
    const animal = document.querySelector('input[name="animal"]').value
    const scheduledDate = document.querySelector('input[name="scheduled_date"]').value

    await fetch('http://localhost:3000/api/services', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            serviceType,
            animal,
            scheduledDate
        })
    })
    await getServiceList()
})


async function deleteService(id) {
    const apiURL = 'http://localhost:3000'
    const deleteResult = await fetch(`${apiURL}/api/service/${id}`, {
        method: 'DELETE'
    })

    await deleteResult.json()

    await getServiceList()

    location.reload()
}