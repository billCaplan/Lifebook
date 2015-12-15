class Post < ActiveRecord::Base
  validates :author_id, :target_id, :body, presence: true

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


end
