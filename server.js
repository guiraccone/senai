const express = require("express")
const { User, Animal, ServiceType, Service } = require("./models")

const app = express()

app.use(express.json())
app.use("/users", express.static('./html/users.html'))
app.use("/animals", express.static('./html/animals.html'))
app.use("/service-types", express.static('./html/service-type.html'))
app.use("/services", express.static('./html/services.html'))

app.use("/global.css", express.static('./global.css'))
app.use("/animals.js", express.static('./animals.js'))
app.use("/users.js", express.static('./users.js'))
app.use("/service-type.js", express.static('./service-type.js'))
app.use("/services.js", express.static('./services.js'))


app.get('/api/user', async (request, response) => {
    const users = await User.findAll()
    response.json(users)
})
app.get('/api/service-type', async (request, response) => {
    const serviceTypes = await ServiceType.findAll()
    response.json(serviceTypes)
})
app.get('/api/animals', async (request, response) => {
    const animals = await Animal.findAll()
    response.json(animals)
})
app.get('/api/services', async (request, response) => {
    const services = await Service.findAll()
    response.json(services)
})

app.post('/api/user', async (request, response) => {
    const newUser = {
        name: request.body.name,
        birthDate: request.body.birthDate,
        email: request.body.email,
        cpf: request.body.cpf,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const user = await User.create(newUser)
    response.json(user)
})

app.post('/api/service-type', async (request, response) => {
    const newServiceType = {
        name: request.body.name,
        price: request.body.price,
        duration: request.body.duration,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const serviceType = await ServiceType.create(newServiceType)
    response.json(serviceType)
})

app.post('/api/animal', async (request, response) => {
    const newAnimal = {
        name: request.body.name,
        breed: request.body.breed,
        age: request.body.age,
        weight: request.body.weight,
        ownerName: request.body.ownerName,
        isVacinated: request.body.isVacinated,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const animal = await Animal.create(newAnimal)
    response.json(animal)
})

app.post('/api/services', async (request, response) => {
    const newService = {
        serviceType: request.body.serviceType,
        animal: request.body.animal,
        scheduledDate: request.body.scheduledDate,
        createdAt: new Date(),
        updatedAt: new Date()
    }
    const service = await Service.create(newService)
    response.json(service)
})

app.listen(3000, () => {
    console.log(`Servidor está rodando em http://localhost:3000`)
})