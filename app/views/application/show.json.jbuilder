json.key_format!  ->(key) { key.dasherize }
json.main_application do
  json.array! ["welcome-message", "enable-push-notifications"]
end
