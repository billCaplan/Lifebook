class ChangeColumnNameInImages < ActiveRecord::Migration
  def change
    rename_column :images, :image_owner, :owner_id
  end
end
