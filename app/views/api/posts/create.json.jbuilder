json.extract!(
  @post,
  :id, :body, :author_id, :target_id, :image_path, :link, :author, :subject
)

json.created_at do
  json.created_at @post.created_at.to_datetime.to_i
end
