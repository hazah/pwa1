json.short_name "PWA 1"
json.name "PWA Rails Test 1"
json.icons do
  icons = [
    { src: asset_path("icon_192.png"), type: "image/png", sizes: "192x192" },
    { src: asset_path("icon_512.png"), type: "image/png", sizes: "512x512" }
  ]
  json.array! icons, :src, :type, :sizes
end 
json.start_url root_path
json.background_color "#fff"
json.display "standalone"
json.scope root_path
json.theme_color "#000"
