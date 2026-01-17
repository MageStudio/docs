# Video

The Video module provides support for loading and displaying video content in your Mage application.

## Import

```javascript
import { Video } from 'mage-engine';
```

## Asset Configuration

Define videos in your assets configuration:

```javascript
const assets = {
    video: {
        'intro': 'videos/intro.mp4',
        'cutscene': 'videos/cutscene.webm'
    }
};
```

## Supported Formats

| Format | Extension | Browser Support |
|--------|-----------|----------------|
| MP4 (H.264) | `.mp4` | All modern browsers |
| WebM (VP9) | `.webm` | Chrome, Firefox, Edge |
| Ogg | `.ogv` | Firefox, Chrome |

> **Tip:** Provide multiple formats for best compatibility.

---

## Video Textures

Videos can be used as textures on 3D objects:

```javascript
import { Plane, Images } from 'mage-engine';

class VideoScreen extends Level {
    onCreate() {
        // Create a screen
        const screen = new Plane(16, 9, 0xffffff);
        
        // Apply video as texture
        screen.setVideoTexture('intro');
    }
}
```

---

## Video Controls

```javascript
class CutsceneLevel extends Level {
    onCreate() {
        this.video = Video.get('cutscene');
        
        // Play video
        this.video.play();
        
        // Pause video
        this.video.pause();
        
        // Set volume (0-1)
        this.video.volume = 0.5;
        
        // Mute/unmute
        this.video.muted = true;
        
        // Loop
        this.video.loop = true;
        
        // Seek to time (seconds)
        this.video.currentTime = 10;
    }
}
```

---

## Video Events

```javascript
class IntroLevel extends Level {
    onCreate() {
        const video = Video.get('intro');
        
        // Video ended
        video.addEventListener('ended', () => {
            this.onIntroComplete();
        });
        
        // Video can play
        video.addEventListener('canplay', () => {
            video.play();
        });
        
        // Video time update
        video.addEventListener('timeupdate', () => {
            console.log('Time:', video.currentTime);
        });
    }
    
    onIntroComplete() {
        Router.go('/menu');
    }
}
```

---

## Fullscreen Video

```javascript
class CutsceneLevel extends Level {
    onCreate() {
        // Create fullscreen video plane
        const aspect = 16 / 9;
        const screen = new Plane(20, 20 / aspect, 0x000000);
        screen.setVideoTexture('cutscene');
        
        // Position in front of camera
        screen.setPosition({ x: 0, y: 0, z: -10 });
        
        // Start playback
        const video = Video.get('cutscene');
        video.play();
        
        video.addEventListener('ended', () => {
            Router.go('/game');
        });
        
        // Skip on click
        Input.mouse.onClick(() => {
            video.pause();
            Router.go('/game');
        });
    }
}
```

---

## In-Game Video Screen

```javascript
class ArcadeRoom extends Level {
    onCreate() {
        // Create arcade cabinet
        const cabinet = Models.create('arcadeCabinet');
        
        // Create video screen
        const screen = new Plane(2, 1.5, 0x000000);
        screen.setPosition({ x: 0, y: 1.5, z: 0.1 });
        screen.setVideoTexture('arcadeDemo');
        cabinet.add(screen);
        
        // Loop demo video
        const video = Video.get('arcadeDemo');
        video.loop = true;
        video.muted = true;
        video.play();
    }
}
```

---

## Performance Tips

1. **Compress videos** for web delivery
2. **Use appropriate resolution** - don't use 4K for small screens
3. **Preload** videos before playback for smooth start
4. **Pause** videos when not visible to save resources
5. **Consider audio context** - may require user interaction to start

---

## Browser Autoplay Policy

Modern browsers block autoplay with sound. Solutions:

```javascript
// Option 1: Start muted
video.muted = true;
video.play();

// Option 2: Start on user interaction
Input.mouse.onClick(() => {
    video.play();
});

// Option 3: Check if autoplay is allowed
video.play().catch(error => {
    // Autoplay blocked - show play button
    this.showPlayButton();
});
```

---

## See Also

- [Audio](/engine/advanced/assets/audio.md) - Sound and music
- [Images and Textures](/engine/advanced/assets/images_and_textures.md) - Image textures
- [Loading Assets](/engine/advanced/assets/loading.md) - Asset loading system