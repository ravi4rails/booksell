class AddBuyLinkToBooks < ActiveRecord::Migration[7.0]
  def change
    add_column :books, :buy_link, :string
  end
end
