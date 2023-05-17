import mongoose from 'mongoose'
import jwt from 'jsonwebtoken'
import crypto from 'crypto'

interface IUser {
  firstName: string
  lastName: string
  email: string
  salt: string
  hash: string
}

interface IUserMethods {
  issueJWT(): { token: string; expiresIn: string }
  validPassword(password: string): boolean
}

type UserModel = mongoose.Model<IUser, {}, IUserMethods>

const UserSchema = new mongoose.Schema<IUser, UserModel, IUserMethods>({
  firstName: {
    type: String,
    required: [true, 'Please provide first name'],
    minlength: 2,
    maxlength: 50,
  },
  lastName: {
    type: String,
    required: [true, 'Please provide last name'],
    minlength: 2,
    maxlength: 50,
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email',
    ],
    unique: true,
  },
  salt: {
    type: String,
    required: [true, 'Please provide salt'],
  },
  hash: {
    type: String,
    required: [true, 'Please provide hash'],
  },
})

UserSchema.methods.issueJWT = function () {
  const payload = {
    sub: this.email,
    iat: Date.now(),
    firstName: this.firstName,
    lastName: this.lastName,
    _id: this._id,
  }
  const signedJWT = jwt.sign(payload, process.env.PRIVATE_KEY as string, { expiresIn: '7d', algorithm: 'RS256' })
  return {
    token: 'Bearer ' + signedJWT,
    expiresIn: '7d',
  }
}

UserSchema.methods.validPassword = function (password: string) {
  var hashVerify = crypto.pbkdf2Sync(password, this.salt, 10000, 64, 'sha512').toString('hex')
  return this.hash === hashVerify
}

export default mongoose.model<IUser, UserModel>('User', UserSchema)
