class CreatePages < ActiveRecord::Migration
  def change
    create_table :pages do |t|
      t.text :url
      t.string :owner
      t.datetime :startOn
      t.datetime :endOn

      t.timestamps
    end
  end
end
