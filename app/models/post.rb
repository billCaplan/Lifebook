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

  belongs_to(
  :subject,
  foreign_key: :target_id,
  primary_key: :id,
  class_name: "User"
  )

  has_many(
  :likes,
  foreign_key: :author_id,
  primary_key: :id,
  class_name: "Like"
  )

  has_many(
  :likers,
  through: :likes,
  source: :author
  )


end
