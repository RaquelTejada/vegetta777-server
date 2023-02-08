const { Schema, model } = require('mongoose')

const videogameSchema = new Schema(
    {

        image: {
            type: String
        },

        name: {
            type: String,
            trim: true,
            required: [true, 'Videogame name is mandatory']
        },

        category: {
            type: String,
            enum: ['Fight', 'Arcade', 'Rol', 'Adventure', 'Simulation'],
            required: [true, 'Videogame category is mandatory']
        },

        votes: [{
            type: Schema.Types.ObjectId,
            ref: 'User'
        }],

        owner: {
            type: Schema.Types.ObjectId,
            ref: 'Admin'
        },
    },

    {
        timestamps: true
    }
)

const Videogame = model('Videogame', videogameSchema)

module.exports = Videogame