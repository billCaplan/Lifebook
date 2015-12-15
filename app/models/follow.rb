class Follow < ActiveRecord::Base

  validates :author_id, :followed_user_id, presence: true

  validates :author_id, uniqueness: { scope: [:followed_user_id] }

  has_one(
  :followClicker,
  foreign_key: :author_id,
  primary_id: :id,
  class_name: "User"
  )

  has_one(
  :userToFollow,
  foreign_key: :target_id,
  primary_id: :id,
  class_name: "User"
  )


end
