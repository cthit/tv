class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.text :url
      t.string :owner
      t.datetime :start_on
      t.datetime :end_on

      t.timestamps
    end
  end
end
