class AddRealNameToUsers < ActiveRecord::Migration
  def change
    add_column :users, :real_name, :string, null: false
  end
end
