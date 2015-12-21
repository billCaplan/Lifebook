class Follow < ActiveRecord::Base

  validates :author_id, :followed_user_id, presence: true

  validates :author_id, uniqueness: { scope: [:followed_user_id] }


  belongs_to(
  :usersToFollow,
  foreign_key: :followed_user_id,
  primary_key: :id,
  class_name: "User"
  )


  has_one(
  :followClicker,
  foreign_key: :author_id,
  primary_key: :id,
  class_name: "User"
  )

  belongs_to(
  :author,
  foreign_key: :author_id,
  primary_key: :id,
  class_name: "User"
  )


end
