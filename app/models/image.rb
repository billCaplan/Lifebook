class Image < ActiveRecord::Base
  validates :owner_id, :image_path, presence: true


  # Must Make an Image Comments Class and whole thing
  # has_many(
  # :comments,
  # foreign_key: :post_id,
  # primary_key: :id,
  # class_name: "Comment"
  # )

  belongs_to(
  :owner,
    foreign_key: :owner_id,
    primary_key: :id,
    class_name: "User"
  )
end
