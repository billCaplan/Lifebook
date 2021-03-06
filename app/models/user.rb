class User < ActiveRecord::Base
  attr_reader :password

  after_initialize :ensure_session_token

  validates :email, :real_name, :age, :password_digest, :session_token, :type_id, presence: true
  validates :password, length: { minimum: 6, allow_nil: true }
  validates :session_token, :email, uniqueness: true

  has_many(
    :usersFollowing,
    through: :follows,
    source: :usersToFollow
  )

  has_many(
  :follows,
  foreign_key: :author_id,
  primary_key: :id,
  class_name: "Follow"
  )

  has_many(
    :authored_posts,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "Post"
    )

  has_many(
    :comments,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "Comment"
    )

  has_many(
    :likes,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "Like"
    )

  has_many(
    :subjectOfPosts,
    foreign_key: :target_id,
    primary_key: :id,
    class_name: "Post"
  )
  has_many(
    :leftComments,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: "Comment"
  )

  has_many(
    :images,
    foreign_key: :owner_id,
    primary_key: :id,
    class_name: "Image"
  )

  def self.find_by_credentials(email, password)
    user = User.find_by(email: email)

    return nil unless user && user.is_password?(password)
    user
  end

  def self.generate_session_token
    SecureRandom::urlsafe_base64(16)
  end

  def is_password?(unencrypted_password)
    BCrypt::Password.new(self.password_digest).is_password?(unencrypted_password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token!
    self.session_token = self.class.generate_session_token
    self.save!
    self.session_token
  end

  private

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end


end
