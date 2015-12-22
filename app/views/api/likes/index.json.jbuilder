json.array!(@likes) do |like|
  json.id like.id
  json.body like.body
  json.author_id like.author_id
  json.post_id like.post_id
  json.like_type like.like_type
  json.created_at like.created_at
end
