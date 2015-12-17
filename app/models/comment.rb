class Comment < ActiveRecord::Base
  validates :body, :author, :post, presence: true

  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :comments
  )

  has_many(
    :child_comments,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )

  belongs_to(
    :parent_comment,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )

  belongs_to(
    :parent_post,
    foreign_key: :parent_comment_id,
    primary_key: :id,
    class_name: "Post"
  )
end



  validates :body, :author, :post, presence: true


  belongs_to(
    :author,
    class_name: "User",
    foreign_key: :user_id,
    inverse_of: :comments
  )

  has_many(
    :child_comments,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )

  belongs_to(
    :parent_comment,
    class_name: "Comment",
    foreign_key: :parent_comment_id,
    primary_key: :id
  )
