json.extract!(
  post,
  :id, :body, :author_id, :target_id, :image_path, :link, :author, :subject, :created_at
)

json.author do
  json.id @post.id
  json.body @post.body
  json.author_id @post.author_id
  json.target_id @post.target_id
  json.image_path @post.image_path
  json.link @post.link
  json.author @post.author
  json.subject @post.subject
  json.created_at @post.created_at
end
