const express = require('express')
const { success } = require('./helper.js')
const morgan = require('morgan')
const favicon = require ('serve-favicon')
let pokemons = require('./mock_pokemon')

const app = express()
const port = 3000

/// Exemple de création middleware logger (pour afficher dans la console toutes les requêtes entrantes de l'API REST)
// app.use((req, res, next) => {
//     console.log(`URL : ${req.url}`)
//     next()
// })

// middleware morgan (logger) et favicon
app
    .use(favicon(__dirname + '/favicon.ico'))
    .use(morgan('dev'))

// Création de routes
app.get('/', (req,res) => res.send('Hello, Express !'))

// Retourner liste total de pokemon en JSON avec un message
app.get('/api/pokemons', (req, res) =>{
    const message = "La liste des pokémons a bien été récupérée"
    res.json(success(message, pokemons))
})

// Définir un id dynamique
app.get('/api/pokemons/:id', (req,res) => {
    const id = parseInt(req.params.id)
    // Rechercher un pokemon en fonction de l'id de l'url
    const pokemon = pokemons.find(pokemon => pokemon.id === id)
    const message = 'Un pokémon a été trouvé.'
    // Passer la réponse en .json
    res.json(success(message, pokemon))
})





app.listen(port, () => console.log(`Notre appli Node est démarrée sur : http://localhost:${port}`))