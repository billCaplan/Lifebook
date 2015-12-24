# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Users
# 1 windmill
User.create({
  email: "dave@gmail.com",
  type_id: 1,
  real_name: "Dave",
  age: 27,
  location: "Columbus, OH",
  profile_image: "j0185206_xeisio",
  password: "password"
  })
# 2 wedding pic
User.create({
  email: "mike@gmail.com",
  type_id: 1,
  real_name: "Mike",
  age: 33,
  location: "Washington, DC",
  profile_image: "j0309372_l4s9le",
  password: "password"
})
# 3 goalie
User.create({
  email: "sam@gmail.com",
  type_id: 1,
  real_name: "Sam",
  age: 103,
  location: "Nebraska",
  profile_image: "j0202176_nfa8nj",
  password: "password"
})
# 4 frog
User.create({
  email: "todd@gmail.com",
  type_id: 1,
  real_name: "Todd",
  age: 55,
  location: "Houston, TX",
  profile_image: "j0182512_kutfes",
  password: "password"
})
# 5 space
User.create({
  email: "sally@gmail.com",
  type_id: 1,
  real_name: "Sally",
  age: 25,
  location: "Columbus, OH",
  profile_image: "uvq8lztmmj6tpjtd5aoj",
  password: "password"
})
# 6 road?
User.create({
  email: "amanda@gmail.com",
  type_id: 1,
  real_name: "Amanda",
  age: 24,
  location: "Nashville, TN",
  profile_image: "twp4e6yslc6naak4cuna",
  password: "password"
})
# 7 softball
User.create({
  email: "beth@gmail.com",
  type_id: 1,
  real_name: "Beth",
  age: 35,
  location: "Reston, VA",
  profile_image: "j0179010_kvq3gf",
  password: "password"
})
# 8 flowers
User.create({
  email: "blake@gmail.com",
  type_id: 1,
  real_name: "Blake",
  age: 42,
  location: "Nashville, TN",
  profile_image: "sample",
  password: "password"
})
#9 Me
User.create({
  email: "bill@gmail.com",
  type_id: 1,
  real_name: "Bill",
  age: 23,
  location: "San Francisco, CA",
  profile_image: "canstock7478741_fnrkkb",
  password: "password"
})
User.create({
  email: "mark@gmail.com",
  type_id: 1,
  real_name: "Mark Thomas",
  age: 26,
  location: "San Francisco, CA",
  profile_image: "canstock7478741_fnrkkb",
  password: "password"
})

# Posts

# create_table "posts", force: :cascade do |t|
#   t.text     "body",       null: false
#   t.integer  "author_id",  null: false
#   t.integer  "target_id",  null: false
#   t.text     "image_path"
#   t.text     "link"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
# end
# 1
Post.create({
  body: "What's up?",
  author_id: 8,
  target_id: 6,
})
#2
Post.create({
  body: "How was the game this weekend?",
  author_id: 2,
  target_id: 5,
})
#3
Post.create({
  body: "What's up?",
  author_id: 2,
  target_id: 6,
})
#4
Post.create({
  body: "What's up?",
  author_id: 2,
  target_id: 7,
})
#5
Post.create({
  body: "Sorry I forgot about the party.",
  author_id: 8,
  target_id: 1,
})
#6
Post.create({
  body: "What's up?",
  author_id: 3,
  target_id: 1,
})
#7
Post.create({
  body: "How are you doing?",
  author_id: 1,
  target_id: 9,
})
#8
Post.create({
  body: "Any plans this weekend?",
  author_id: 2,
  target_id: 5,
})
#9
Post.create({
  body: "Any plans this weekend?",
  author_id: 2,
  target_id: 6,
})
#10
Post.create({
  body: "What's up?",
  author_id: 4,
  target_id: 2,
})
#11
Post.create({
  body: "What's up?",
  author_id: 4,
  target_id: 5,
})
#12
Post.create({
  body: "Anything new with you?",
  author_id: 4,
  target_id: 6,
})
#13
Post.create({
  body: "This site is the best",
  author_id: 6,
  target_id: 6,
})
#14
Post.create({
  body: "This is my favorite site",
  author_id: 8,
  target_id: 8,
})
#15
Post.create({
  body: "Excited to go on vacation this weekend!",
  author_id: 1,
  target_id: 1,
})
#16
Post.create({
  body: "Flight just got canceled",
  author_id: 1,
  target_id: 1,
})
#17
Post.create({
  body: "Just dropped my phone into the river",
  author_id: 5,
  target_id: 5,
})
#18
Post.create({
  body: "Can anyone give me a ride to the party this weekend?",
  author_id: 8,
  target_id: 8,
})
#20
Post.create({
  body: "I think this site is the best!",
  author_id: 2,
  target_id: 2,
})

# Comments
# create_table "comments", force: :cascade do |t|
#   t.text     "body",              null: false
#   t.integer  "parent_comment_id"
#   t.integer  "post_id",           null: false
#   t.integer  "author_id",         null: false
#   t.datetime "created_at"
#   t.datetime "updated_at"
# end

# 1
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 1
})
# 2
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 2
})
# 1
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 3
})
# 1
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 4
})
# 1
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 5
})
# 1
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 6
})
# 1
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 7
})
# 1
Comment.create({
  body: "No",
  post_id: 18,
  author_id: 8
})
# 1
Comment.create({
  body: "Not yet you?",
  post_id: 9,
  author_id: 6
})
# 1
Comment.create({
  body: "Nope",
  post_id: 9,
  author_id: 5
})
# 1
Comment.create({
  body: "No",
  post_id: 7,
  author_id: 1
})
# 1
Comment.create({
  body: "No",
  post_id: 15,
  author_id: 6
})
# 1
Comment.create({
  body: "No",
  post_id: 12,
  author_id: 7
})

# Follows

# create_table "follows", force: :cascade do |t|
#   t.integer  "author_id",        null: false
#   t.integer  "followed_user_id", null: false
#   t.datetime "created_at",       null: false
#   t.datetime "updated_at",       null: false
# end

# 1
Follow.create({
  author_id: 1,
  followed_user_id: 2
})
# 2
Follow.create({
  author_id: 1,
  followed_user_id: 3
})
# 3
Follow.create({
  author_id: 1,
  followed_user_id: 4
})
# 4
Follow.create({
  author_id: 1,
  followed_user_id: 5
})
# 5
Follow.create({
  author_id: 1,
  followed_user_id: 7
})
# 6
Follow.create({
  author_id: 2,
  followed_user_id: 1
})
# 7
Follow.create({
  author_id: 2,
  followed_user_id: 5
})
# 8
Follow.create({
  author_id: 2,
  followed_user_id: 7
})
# 9
Follow.create({
  author_id: 2,
  followed_user_id: 8
})
# 10
Follow.create({
  author_id: 2,
  followed_user_id: 9
})
# 11
Follow.create({
  author_id: 3,
  followed_user_id: 1
})
# 12
Follow.create({
  author_id: 3,
  followed_user_id: 2
})
# 13
Follow.create({
  author_id: 3,
  followed_user_id: 5
})
# 14
Follow.create({
  author_id: 3,
  followed_user_id: 9
})
# 15
Follow.create({
  author_id: 4,
  followed_user_id: 1
})
# 16
Follow.create({
  author_id: 4,
  followed_user_id: 5
})
# 17
Follow.create({
  author_id: 4,
  followed_user_id: 9
})
# 18
Follow.create({
  author_id: 5,
  followed_user_id: 3
})
# 19
Follow.create({
  author_id: 5,
  followed_user_id: 4
})
# 20
Follow.create({
  author_id: 5,
  followed_user_id: 1
})
# 21
Follow.create({
  author_id: 6,
  followed_user_id: 7
})
# 22
Follow.create({
  author_id: 7,
  followed_user_id: 9
})
# 23
Follow.create({
  author_id: 7,
  followed_user_id: 5
})

# 24
Follow.create({
  author_id: 8,
  followed_user_id: 9
})
# 25
Follow.create({
  author_id: 8,
  followed_user_id: 3
})
26
Follow.create({
  author_id: 9,
  followed_user_id: 2
})
27
Follow.create({
  author_id: 7,
  followed_user_id: 5
})
