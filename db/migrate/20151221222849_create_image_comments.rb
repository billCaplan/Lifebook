class CreateImageComments < ActiveRecord::Migration
  def change
     create_table :image_comments do |t|
       t.text :body, null: false
       t.integer :parent_comment_id
       t.integer :image_id, null: false
       t.integer :author_id, null: false

       t.timestamps
     end

     add_index :image_comments, :image_id
   end
 end
