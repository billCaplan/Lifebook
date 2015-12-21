json.array!(@follows) do |follow|
  json.id follow.id
  json.author_id follow.author_id
  json.followed_user_id follow.followed_user_id
  json.created_at follow.created_at
end
