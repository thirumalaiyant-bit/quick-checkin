# A Surprise Birthday Website for Rabeka 💗

## Files
- `index.html` — all website sections and content
- `style.css` — colors, layout, animations, and mobile/laptop responsiveness
- `script.js` — surprise button, confetti, wish interaction, letter reveal, and music toggle
- `images/` — put your own photos here if you want to use local images

## How to run
1. Extract `Rabeka_Birthday_Website.zip`.
2. Open the extracted `rabeka_birthday_website` folder.
3. Double-click `index.html` to open it in Chrome, Edge, or another browser.
4. Internet is needed for the sample online photos and Google Fonts. The layout and interactions run locally.

## Add your own photos
You can either:
- Replace the sample photo URLs in `index.html` with your own image URLs, or
- Copy photos into the `images` folder and change an image line to something like:
  `<img src="images/rabeka1.jpg" alt="A favourite memory">`

For example, replace the first photo URL with `images/rabeka1.jpg`. Keep the photo filenames simple and use the exact same spelling in the HTML.

## Personalize the letter
In `index.html`, find the `id="letterContent"` section and edit the letter text. Change “Someone who cares about you” to your name or preferred sign-off.

## Share it
The website works on your device when you open `index.html`. To share it as a public link, upload the extracted files to a static website host such as GitHub Pages or Netlify. Keep `index.html`, `style.css`, and `script.js` together in the same folder.

## Music
The Music button plays gentle generated chimes after the visitor taps it. Browsers require a tap before audio can play. If you want a specific song, use music only when you have permission to use it and add an audio file with a visible play/pause control.


## Hidden surprise first screen
The website now opens with a neutral "A little check-in" form. After the visitor submits it, the birthday experience is revealed. The form answers are not uploaded or stored; the form is just a local interaction.

## Keep the shared link neutral
When publishing, choose a neutral site slug such as `quick-checkin` or `little-check-in` if your hosting provider allows it. The visible link/slug is chosen by the hosting service, not by the HTML files. The page title starts as "Quick Check-In"; after submission it changes to "A Little Moment for You".
