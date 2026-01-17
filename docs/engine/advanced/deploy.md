# Deploying Your Application

This guide covers how to deploy your Mage application to production environments.

## Build Process

Before deploying, you need to create a production build. See [Bundling](/engine/advanced/bundling.md) for configuration details.

```bash
# Using Rollup
npm run build

# Or using Webpack
npm run build:prod
```

This generates optimized files in your `dist/` folder:
- `dist/app.js` - Bundled JavaScript
- `dist/app.css` - Bundled CSS (if any)
- `dist/index.html` - HTML entry point

---

## Static File Structure

Your production build should include:

```
dist/
├── index.html
├── app.js
├── app.css
└── assets/
    ├── models/
    ├── textures/
    ├── audio/
    └── images/
```

---

## Deployment Options

### Static Hosting

Mage applications are client-side only and can be hosted on any static file server:

#### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=dist
```

Or connect your Git repository for automatic deployments.

#### Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

#### GitHub Pages

1. Push your `dist/` folder to a `gh-pages` branch
2. Enable GitHub Pages in repository settings

```bash
# Using gh-pages package
npm install -g gh-pages
gh-pages -d dist
```

#### AWS S3 + CloudFront

```bash
# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
```

---

## Asset Configuration

### Relative Paths

Ensure your assets use relative paths for portability:

```javascript
const assets = {
    models: {
        'car': 'assets/models/car.gltf'  // Relative path
    },
    textures: {
        'road': 'assets/textures/road.png'
    }
};
```

### CDN Assets

For production, consider serving large assets from a CDN:

```javascript
const CDN_URL = 'https://cdn.example.com';

const assets = {
    models: {
        'car': `${CDN_URL}/models/car.gltf`
    }
};
```

---

## Optimization Tips

### Model Optimization

1. **Use compressed formats**: Prefer `.glb` over `.gltf` (binary is smaller)
2. **Compress textures**: Use tools like `gltf-pipeline` or `glTF-Transform`
3. **Reduce polygon count**: Use LOD (Level of Detail) models

```bash
# Compress GLTF models
npx gltf-pipeline -i model.gltf -o model.glb --draco.compressionLevel 7
```

### Texture Optimization

1. **Use appropriate formats**: PNG for transparency, JPEG for photos
2. **Compress images**: Use tools like `imagemin`
3. **Use power-of-two dimensions**: 256x256, 512x512, 1024x1024
4. **Consider KTX2 format** for GPU compression

### Code Optimization

1. **Enable minification** in your bundler
2. **Enable tree shaking** to remove unused code
3. **Split code** for level-based loading

```javascript
// Rollup terser plugin for minification
import { terser } from 'rollup-plugin-terser';

export default {
    plugins: [
        terser()
    ]
};
```

---

## Environment Variables

Use environment variables for environment-specific configuration:

```javascript
const config = {
    apiUrl: process.env.NODE_ENV === 'production' 
        ? 'https://api.example.com'
        : 'http://localhost:3000',
    debug: process.env.NODE_ENV !== 'production'
};
```

---

## HTTPS Considerations

Some Mage features require HTTPS in production:

- **Pointer Lock API** (First Person Controls)
- **Gamepad API** 
- **Audio Context** (may require user interaction)

Ensure your hosting provider supports HTTPS (most static hosts do by default).

---

## Mobile Deployment

### PWA (Progressive Web App)

Add a service worker and manifest for offline support:

```javascript
// manifest.json
{
    "name": "My Mage Game",
    "short_name": "MageGame",
    "start_url": "/",
    "display": "fullscreen",
    "orientation": "landscape",
    "background_color": "#000000"
}
```

### Cordova/Capacitor

Wrap your Mage app for mobile app stores:

```bash
# Using Capacitor
npm install @capacitor/core @capacitor/cli
npx cap init
npx cap add android
npx cap add ios
npx cap copy
```

---

## Performance Monitoring

Add performance monitoring for production:

```javascript
import { Stats } from 'mage-engine';

if (process.env.NODE_ENV !== 'production') {
    Stats.enable();  // Show FPS counter in development
}

// Log performance metrics
window.addEventListener('load', () => {
    const timing = performance.timing;
    console.log('Load time:', timing.loadEventEnd - timing.navigationStart);
});
```

---

## Checklist

- [ ] Build with production configuration
- [ ] Minify JavaScript and CSS
- [ ] Optimize and compress assets
- [ ] Test on target devices
- [ ] Enable HTTPS
- [ ] Configure caching headers
- [ ] Test loading performance
- [ ] Add error tracking (optional)
- [ ] Configure analytics (optional)

---

## See Also

- [Bundling](/engine/advanced/bundling.md) - Build configuration
- [Configuration](/engine/advanced/configuration.md) - App configuration
- [Features](/engine/utilities/features.md) - Device detection