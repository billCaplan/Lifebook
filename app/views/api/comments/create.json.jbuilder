json.extract!(
  @comment,
  :id, :body, :author_id, :post_id, :parent_comment_id, :author
)
json.created_at do
  json.created_at @comment.created_at.to_datetime.to_i
end
