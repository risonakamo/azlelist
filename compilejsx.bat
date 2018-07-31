@echo off
call npx babel equipbox/equipbox.jsx --presets react -o equipbox/equipbox.js
call npx babel azlelist-system/azlelistsystem.jsx --presets react -o azlelist-system/azlelistsystem.js
call npx babel azlelist-system/equipclassmenu.jsx --presets react -o azlelist-system/equipclassmenu.js
call npx babel azlelist-system/sortmenu.jsx --presets react -o azlelist-system/sortmenu.js