json.array!(@posts) do |post|
  json.id post.id
  json.author_id post.author_id
  json.followed_user_id
  json.created_at post.created_at
end
