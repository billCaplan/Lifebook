json.array!(@comments) do |comment|
    json.id comment.id
    json.body comment.body
    json.author_id comment.author_id
    json.post_id comment.post_id
    json.author do
      json.partial! 'api/users/user', user: comment.author
    end
    json.created_at comment.created_at.to_datetime.to_i
  end
