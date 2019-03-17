// HTML and data files
require.context('../', true, /\.(html|json|txt|dat)$/i)

// Images and fonts
require.context('../images/', true, /\.(gif|jpg|png|svg|eot|ttf|woff|woff2)$/i)

// SCSS files
import "../stylesheets/application.scss"

// JavaScript
//TODO