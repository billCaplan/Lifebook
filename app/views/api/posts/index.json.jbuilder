json.array!(@posts) do |post|
  json.body post.body
  json.author_id post.author_id
  json.target_id post.target_id
  json.author post.author 
end
