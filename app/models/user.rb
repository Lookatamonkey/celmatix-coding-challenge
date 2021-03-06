# == Schema Information
#
# Table name: users
#
#  id         :integer          not null, primary key
#  fname      :string           not null
#  lname      :string           not null
#  email      :string           not null
#  age        :string           not null
#  height     :string           not null
#  weight     :integer
#  color      :string           not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class User < ApplicationRecord

    AGE_RANGE_1 = "17 or younger".freeze
    AGE_RANGE_2 = "18 - 25".freeze
    AGE_RANGE_3 = "26 - 35".freeze
    AGE_RANGE_4 = "36 - 45".freeze
    AGE_RANGE_5 = "46 or older".freeze
    ALL_AGE_RANGES = [AGE_RANGE_1, AGE_RANGE_2, AGE_RANGE_3, AGE_RANGE_4, AGE_RANGE_5].freeze

    VALID_EMAIL_REGEX = /.+@.+\..+/i
    VALID_NAME_REGEX = /\A[^0-9`!@#\$%\^&*+_=]+\z/
    

    validates :email, presence: true, uniqueness: true
    validates :fname, :lname, :age, :height, :color, presence: true
    validates :age, inclusion: { in: ALL_AGE_RANGES, message: "%{value} is not a valid age" }

    validates_numericality_of :weight, only_integer: true, greater_than_or_equal_to: 0, :allow_blank => true

    validates_format_of :email, with: VALID_EMAIL_REGEX, message: 'Email must have valid format such as (ex. faker@gmail.com)'

    # name validation from: https://stackoverflow.com/questions/2629422/rails-validating-full-name
    validates_format_of :fname, :lname, with: VALID_NAME_REGEX, message: 'Name cannot contain numbers or symbols'

    validates_format_of :color, with: VALID_NAME_REGEX, message: 'Color cannot contain numbers or symbols'

    
end
