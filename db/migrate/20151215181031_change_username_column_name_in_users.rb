class ChangeUsernameColumnNameInUsers < ActiveRecord::Migration
  def change
    rename_column :users, :username, :email
    add_column :users, :age, :integer, null: false
    add_column :users, :location, :string
  end
end
