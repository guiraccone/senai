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
app.get('/api/animal', async (request, response) => {
    const animals = await Animal.findAll()
    response.json(animals)
})
app.get('/api/service', async (request, response) => {
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

app.post('/api/service', async (request, response) => {
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

app.delete("/api/user/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário informar um id de para deletar um usuário." })
        return
    }

    User.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteUsersCount: data })
        })
        .catch((err) => {
            response.status(500).send({
                message: err.message || "Ocorreu um erro ao tentar deletar um usuário."
            })
        })
})

app.delete("/api/animal/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário informar um id de para deletar um animal." })
        return
    }

    Animal.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteAnimalsCount: data })
        })
        .catch((err) => {
            response.status(500).send({
                message: err.message || "Ocorreu um erro ao tentar deletar um animal."
            })
        })
})


app.delete("/api/service/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário informar um id de para deletar um serviço." })
        return
    }

    Service.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteServicesCount: data })
        })
        .catch((err) => {
            response.status(500).send({
                message: err.message || "Ocorreu um erro ao tentar deletar um serviço."
            })
        })
})

app.delete("/api/service-type/:id", function (request, response) {
    if (!request.params.id) {
        request
            .status(400)
            .send({ message: "É necessário informar um id de para deletar um tipo serviço." })
        return
    }

    ServiceType.destroy({ where: { id: request.params.id } })
        .then((data) => {
            response.send({ deleteServiceTypesCount: data })
        })
        .catch((err) => {
            response.status(500).send({
                message: err.message || "Ocorreu um erro ao tentar deletar um tipo de serviço."
            })
        })
})

app.update("/api/service-type/")
app.listen(3000, () => {
    console.log(`Servidor está rodando em http://localhost:3000`)
})