class Book < ApplicationRecord
  validates :name, presence: true, uniqueness: true
  validates :price, :author, :category, presence: true

  def price_with_currency_sign
    "$ #{price}"
  end
end
