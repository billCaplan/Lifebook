json.array!(@users) do |user|
  json.id user.id
  json.email user.email
  json.real_name user.real_name
  json.age user.age
  json.location user.location
  json.type_id user.type_id
end
