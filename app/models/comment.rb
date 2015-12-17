class Comment < ActiveRecord::Base
  has_many(
  :comments,
  foreign_key: :post_id,
  primary_key: :id,
  class_name: "Comment"
  )

  belongs_to(
  :author,
  foreign_key: :author_id,
  primary_key: :id,
  class_name: "User"
  )

  belongs_to(
  :parent_post,
  foreign_key: :parent_comment_id,
  primary_key: :id,
  class_name: "Post"
  )
end
