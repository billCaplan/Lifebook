json.array!(@posts) do |post|
  json.id post.id
  json.body post.body
  json.author_id post.author_id
  json.target_id post.target_id
  json.author post.author
  json.created_at post.created_at
end
