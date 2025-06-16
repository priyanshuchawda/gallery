# Interactive Loading Gallery

A stunning collection of interactive loading screens and animations showcasing modern design patterns and smooth transitions. This gallery features various themes including cyberpunk, minimalist, nature-inspired, and futuristic designs.

## ✨ Features

- **Interactive Loading Screens**: Collection of beautifully crafted loading animations
- **Multiple Themes**: Cyberpunk, minimalist, nature, space, and abstract themes
- **Smooth Animations**: Powered by modern CSS and JavaScript animations
- **Responsive Design**: Optimized for all device sizes and screen resolutions
- **Dark/Light Mode**: Theme toggle with smooth transitions
- **Search & Filter**: Find loading screens by theme, style, or keyword
- **Preview Mode**: Interactive preview of each loading screen
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## 🚀 Tech Stack

- **React 18** + TypeScript for robust component architecture
- **Vite** for fast development and optimized builds
- **Tailwind CSS** for utility-first styling and responsive design
- **shadcn/ui** for modern, accessible UI components
- **React Router DOM** for seamless navigation
- **Lucide React** for consistent and beautiful icons
- **React Hook Form** for form handling and validation
- **Zod** for runtime type checking and validation

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/priyanshuchawda/gallery.git
   cd gallery
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build production bundle
- `npm run build:dev` - Build with development mode
- `npm run preview` - Preview production build locally
- `npm run lint` - Run ESLint for code quality

## 🌐 Deployment

### Deploy to Netlify

1. **Fork this repository** to your GitHub account

2. **Connect to Netlify**:
   - Log in to [Netlify](https://netlify.com)
   - Click "New site from Git"
   - Choose your forked repository
   - Build settings are automatically detected from `netlify.toml`

3. **Build Configuration** (auto-configured):
   - Build command: `npm run build`
   - Publish directory: `dist`
   - Node version: 18

4. **Deploy**: Netlify will automatically build and deploy your site

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Follow the deployment prompts

### Deploy to GitHub Pages

1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 🎨 Gallery Themes

### Cyberpunk Collection
- Neural Surge - Digital consciousness awakening
- Neon Dreams - Retro-futuristic aesthetics
- Matrix Rain - Code streaming effects

### Minimalist Collection
- Clean Slate - Pure geometric forms
- Zen Garden - Peaceful loading states
- Swiss Style - Typography-focused designs

### Nature Collection
- Forest Canopy - Organic growth animations
- Ocean Waves - Fluid motion patterns
- Mountain Peaks - Elevation transitions

### Space Collection
- Stellar Journey - Cosmic exploration themes
- Nebula Formation - Colorful space phenomena
- Planet Rotation - Orbital mechanics

## 🔧 Customization

### Adding New Loading Screens

1. **Create Component**: Add new loading screen in `src/components/loading-screens/`
2. **Update Gallery**: Add entry to the `loadingScreens` array in `src/pages/Index.tsx`
3. **Add Assets**: Include any required images in the `public/` directory
4. **Update Routing**: If needed, add routes in `src/App.tsx`

### Styling Customization

- **Themes**: Modify theme configurations in `src/components/ThemeToggle.tsx`
- **Colors**: Update color palette in `tailwind.config.ts`
- **Animations**: Customize animation timing and effects in component files
- **Layout**: Adjust grid layouts and responsive breakpoints

### Adding New Categories

1. Update filter options in `src/components/SearchAndFilters.tsx`
2. Add corresponding theme styling
3. Update gallery data structure to include new category

## 📱 Browser Support

- Chrome/Chromium (recommended for best performance)
- Firefox
- Safari
- Edge

## 🐛 Troubleshooting

### Build Issues
- Clear node_modules and reinstall: `rm -rf node_modules package-lock.json && npm install`
- Check Node.js version: requires Node 16+

### Animation Performance
- Some complex animations may perform differently on older devices
- Consider using `prefers-reduced-motion` for accessibility

### Image Loading
- Ensure all referenced images are accessible
- Check network connectivity for external image sources

## ⚡ Performance Tips

- **Lazy Loading**: Images are loaded on demand for better performance
- **Code Splitting**: Components are dynamically imported where possible
- **Optimized Builds**: Vite automatically optimizes the production bundle
- **Caching**: Proper cache headers for static assets

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-loading-screen`
3. Commit changes: `git commit -m 'Add amazing loading screen'`
4. Push to branch: `git push origin feature/amazing-loading-screen`
5. Open a Pull Request

## 📞 Contact

- **Website**: [Live Demo](https://dobblegallery.netlify.app/)
- **GitHub**: [@priyanshuchawda](https://github.com/priyanshuchawda)

## 🌟 Inspiration

This gallery is inspired by the beauty of micro-interactions and the importance of loading states in modern web design. Each loading screen tells a story while users wait, transforming necessary delays into delightful experiences.

---

*"Loading screens are the poetry of waiting - they turn anticipation into art."*
