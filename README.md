# GameGuide Pro

A comprehensive website featuring game guides, walkthroughs, and tips for various games including GTA V, Valorant, Mobile Legends, Whiteout Survival, and more.

## Features

- Light/Dark theme support
- Responsive design for all devices
- Game guides categorized by game type
- Quick tips and tricks for gamers
- Newsletter subscription for updates
- Google Translate integration

## Technologies Used

- HTML5
- CSS3 with Tailwind CSS
- JavaScript
- Font Awesome icons

## Project Structure
```
game-guide-website
├── public
│   ├── ads.txt
│   └── favicon.ico
├── src
│   ├── assets
│   │   ├── css
│   │   │   └── styles.css
│   │   ├── js
│   │   │   └── scripts.js
│   │   └── images
│   ├── pages
│   │   ├── index.html
│   │   ├── categories.html
│   │   ├── guide.html
│   │   ├── tips.html
│   │   ├── about.html
│   │   └── contact.html
│   └── components
│       ├── header.html
│       ├── footer.html
│       └── search.html
├── vercel.json
└── README.md
```

## Setup Instructions
1. Clone the repository to your local machine.
2. Navigate to the project directory.
3. Open the `index.html` file in your browser to view the homepage.
4. Customize the content in the `src/pages` directory to add your game guides and tips.
5. Update the `public/ads.txt` file with your Google AdSense verification details.

## Deploying on Vercel

### Prerequisites
- A GitHub account with your repository pushed
- A Vercel account (sign up at [vercel.com](https://vercel.com))

### Deployment Steps
1. **Login to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign up or log in
   - You can sign up using your GitHub account for easier integration

2. **Import Your Repository**:
   - Click on "Add New..." → "Project"
   - Connect your GitHub account if not already connected
   - Select your game-guide-pro repository from the list

3. **Configure Project**:
   - **Framework Preset**: Select "Other" since this is a static HTML site
   - **Root Directory**: Leave as `/` (the project root)
   - **Build Command**: Leave empty (no build step needed for static HTML)
   - **Output Directory**: Configure as `./` if your index.html is in the root, or `./src` if that's where your main HTML files are

4. **Environment Variables** (if needed):
   - Add any environment variables your project might need

5. **Deploy**:
   - Click "Deploy"
   - Vercel will build and deploy your site
   - You'll get a unique URL (like `game-guide-pro.vercel.app`)

6. **Custom Domain** (optional):
   - In your project dashboard, go to "Settings" → "Domains"
   - Add your custom domain and follow the verification steps

7. **Automatic Updates**:
   - Vercel will automatically redeploy your site whenever you push changes to your GitHub repository

### vercel.json Configuration
If you need special routing or headers, edit your `vercel.json` file:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/src/$1" }
  ]
}
```

This example configuration will route requests to files in your src directory.

## Contribution
Feel free to contribute by adding more game guides, tips, or improving the design. Pull requests are welcome!

## License
This project is open-source and available under the MIT License.