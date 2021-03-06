# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20151224220548) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text     "body",              null: false
    t.integer  "parent_comment_id"
    t.integer  "post_id",           null: false
    t.integer  "author_id",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "comments", ["post_id"], name: "index_comments_on_post_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "author_id",        null: false
    t.integer  "followed_user_id", null: false
    t.datetime "created_at",       null: false
    t.datetime "updated_at",       null: false
  end

  add_index "follows", ["author_id"], name: "index_follows_on_author_id", using: :btree
  add_index "follows", ["followed_user_id"], name: "index_follows_on_followed_user_id", using: :btree

  create_table "image_comments", force: :cascade do |t|
    t.text     "body",              null: false
    t.integer  "parent_comment_id"
    t.integer  "image_id",          null: false
    t.integer  "author_id",         null: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "image_comments", ["image_id"], name: "index_image_comments_on_image_id", using: :btree

  create_table "images", force: :cascade do |t|
    t.text     "image_path", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer  "owner_id"
  end

  create_table "likes", force: :cascade do |t|
    t.integer  "author_id",  null: false
    t.integer  "post_id",    null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "like_type"
  end

  add_index "likes", ["post_id", "author_id", "like_type"], name: "index_likes_on_post_id_and_author_id_and_like_type", unique: true, using: :btree
  add_index "likes", ["post_id"], name: "index_likes_on_post_id", using: :btree

  create_table "posts", force: :cascade do |t|
    t.text     "body",       null: false
    t.integer  "author_id",  null: false
    t.integer  "target_id",  null: false
    t.text     "image_path"
    t.text     "link"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "posts", ["author_id"], name: "index_posts_on_author_id", using: :btree
  add_index "posts", ["target_id"], name: "index_posts_on_target_id", using: :btree

  create_table "user_types", force: :cascade do |t|
    t.string   "type",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "user_types", ["type"], name: "index_user_types_on_type", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.integer  "type_id",         null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.string   "real_name",       null: false
    t.integer  "age",             null: false
    t.string   "location"
    t.string   "profile_image"
  end

  add_index "users", ["email"], name: "index_users_on_email", unique: true, using: :btree
  add_index "users", ["session_token"], name: "index_users_on_session_token", unique: true, using: :btree

end
