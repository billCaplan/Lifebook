class FixLikesIndex < ActiveRecord::Migration
  def change
    remove_index :likes, name: "index_likes_on_post_id_and_author_id"
    add_index :likes, [:post_id, :author_id, :like_type], :unique => true
  end
end
