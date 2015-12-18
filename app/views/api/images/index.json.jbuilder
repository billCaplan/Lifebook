json.array!(@images) do |image|
  json.id image.id
  json.image_path image.image_path
  json.owner_id image.owner_id
  json.owner do
    json.partial! 'api/users/user', user: image.owner
  end
  json.created_at image.created_at
end
