class CreateLikes < ActiveRecord::Migration
  def change
    create_table :likes do |t|
      t.integer :author_id, null: false
      t.integer :post_id, null: false

      t.timestamps
    end

    add_index :likes, :post_id
    add_index :likes, [:post_id, :author_id], unique: true
  end
end
