# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Users

User.create({
  email: "dave@gmail.com",
  type_id: 1,
  real_name: "Dave",
  age: 27,
  location: "Columbus, OH",
  profile_image: "",
  })
User.create({
  email: "mike@gmail.com",
  type_id: 1,
  real_name: "Mike",
  age: 33,
  location: "Washington, DC",
  profile_image: "",
})
User.create({
  email: "sam@gmail.com",
  type_id: 1,
  real_name: "Sam",
  age: 103,
  location: "Nebraska",
  profile_image: "",
})
User.create({
  email: "todd@gmail.com",
  type_id: 1,
  real_name: "Todd",
  age: 55,
  location: "Houston, TX",
  profile_image: "",
})
User.create({
  email: "sally@gmail.com",
  type_id: 1,
  real_name: "Sally",
  age: 25,
  location: "Columbus, OH",
  profile_image: "",
})
User.create({
  email: "amanda@gmail.com",
  type_id: 1,
  real_name: "Amanda",
  age: 24,
  location: "Nashville, TN",
  profile_image: "",
})
User.create({
  email: "beth@gmail.com",
  type_id: 1,
  real_name: "Beth",
  age: 35,
  location: "Reston, VA",
  profile_image: "",
})
User.create({
  email: "blake@gmail.com",
  type_id: 1,
  real_name: "Blake",
  age: 42,
  location: "Nashville, TN",
  profile_image: "",
})

# Posts
