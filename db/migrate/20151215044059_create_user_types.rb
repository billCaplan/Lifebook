class CreateUserTypes < ActiveRecord::Migration
  def change
    create_table :user_types do |t|
      t.string :type, null: false

      t.timestamps null: false
    end
    add_index :user_types, :type
  end
end
