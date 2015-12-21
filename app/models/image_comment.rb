class ImageComment < ActiveRecord::Base

    validates :author_id, :image_id, :body, presence: true

    belongs_to(
      :author,
      class_name: "User",
      foreign_key: :author_id,
      primary_key: :id
    )
    #
    # has_many(
    #   :child_comments,
    #   class_name: "Comment",
    #   foreign_key: :parent_comment_id,
    #   primary_key: :id
    # )
    #
    # belongs_to(
    #   :parent_comment,
    #   class_name: "Comment",
    #   foreign_key: :parent_comment_id,
    #   primary_key: :id
    # )

    belongs_to(
      :parent_post,
      foreign_key: :image_id,
      primary_key: :id,
      class_name: "Post"
    )
end
