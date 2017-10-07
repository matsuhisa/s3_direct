class CreatePictures < ActiveRecord::Migration[5.1]
  def change
    create_table :pictures do |t|
      t.string :path
      t.string :mine_type

      t.timestamps
    end
  end
end
