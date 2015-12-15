class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.text :body, null: false
      t.integer :author_id, null: false
      t.integer :target_id, null: false
      t.text :image_path
      t.text :link

      t.timestamps null: false
    end
     add_index :posts, :author_id
     add_index :posts, :target_id

  end
end
