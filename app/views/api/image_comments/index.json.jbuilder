json.array!(@image_comments) do |image_comment|
    json.id image_comment.id
    json.body image_comment.body
    json.author_id image_comment.author_id
    json.image_id image_comment.image_id
    json.author do
      json.partial! 'api/users/user', user: image_comment.author
    end
    json.created_at image_comment.created_at
  end
