const { Schema, model } = require("mongoose")
const bcrypt = require('bcryptjs')

const userSchema = new Schema(

  {
    email: {
      type: String,
      required: [true, 'Email required'],
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: [true, 'Password required']
    }
  },

  {
    timestamps: true
  }
)

userSchema.pre('save', function (next) {

  const saltRounds = 10
  const salt = bcrypt.genSaltSync(saltRounds)
  const hashedPassword = bcrypt.hashSync(this.password, salt)
  this.password = hashedPassword

  next()
})

const User = model("User", userSchema)

module.exports = User
