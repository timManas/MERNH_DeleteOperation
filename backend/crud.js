import express from 'express'
import asyncHandler from 'express-async-handler'
import mongoose from 'mongoose'

// Declare Schema using Mongoose
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.model('User', userSchema)

const userTim = {
  name: 'NEW CREATE USER',
  email: 'HELLOwORLD@example.com',
  password: '12345',
}

// CREATE
export const createUser = asyncHandler(async () => {
  console.log('CREATE')
  const userExists = await User.findOne({ email: 'HELLOwORLD@example.com' })
  if (userExists) {
    console.log('User already Exists ...cannot add New User')
  } else {
    const user = User.create(userTim)
    if (user) {
      console.log('Success Creating User')
    }
  }
})

// READ
export const readUser = asyncHandler(async () => {
  const singleUser = await User.findById(process.env.ID)
  console.log('\nREAD')
  console.log(`Single User: ${singleUser} \n`)
})

// UPDATE
export const updateUser = asyncHandler(async () => {
  const singleUser = await User.findById(process.env.ID)
  console.log('\nUPDATE')
  if (singleUser) {
    singleUser.name = 'UpdatedUserName'
    await singleUser.save()
    console.log('Updated User')
  }
})

// DELETE
export const deleteUser = asyncHandler(async () => {
  try {
    console.log('\nDELETE')
    const user = await User.findOne({ email: 'HELLOwORLD@example.com' })
    if (user) {
      user.deleteOne()
      console.log('Successfully Deleted User')
    } else {
      console.log('Cannot delete ...user does not exists')
    }
  } catch (error) {
    console.log('Error Deleting')
  }
})
