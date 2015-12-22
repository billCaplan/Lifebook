class Like < ActiveRecord::Base
  validates :author_id, :post_id, :like_type, presence: true
  validates :author_id, uniqueness: { scope: [:post_id, :like_type] }

end
