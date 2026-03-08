# Nova UI

A React component library with a supernova-inspired theme system. Built with TypeScript, Framer Motion, and CSS Modules.

## Features

✨ Light/dark mode with animated transitions  
🎨 Smooth animations using Framer Motion  
📦 TypeScript support  
🎯 Accessible components  

## Components

### Button

Interactive button with multiple variants and animations.

```tsx
import { Button } from 'nova-ui';

// Primary button
<Button variant="primary" onClick={handleClick}>
  Primary Action
</Button>

// Secondary button
<Button variant="secondary">
  Secondary Action
</Button>

// Icon button
<Button variant="icon">
  🔍
</Button>

// Disabled with tooltip
<Button 
  disabled 
  disabledMessage="Please log in first"
>
  Submit
</Button>
```

**Props:**
- `variant?: 'primary' | 'secondary' | 'icon'` - Button style (default: 'primary')
- `onClick?: () => void` - Click handler
- `disabled?: boolean` - Disabled state
- `disabledMessage?: string` - Tooltip message when disabled
- `tooltipPosition?: 'top' | 'bottom' | 'left' | 'right'` - Tooltip position

### Viewer (Lightbox)

Image and video viewer with lightbox modal.

```tsx
import { Viewer } from 'nova-ui';

// Image
<Viewer 
  src="photo.jpg" 
  alt="Description"
  thumbnailWidth="300px"
/>

// Video
<Viewer 
  src="video.mp4"
  video={{ controls: true, loop: false }}
/>

// With error handling
<Viewer 
  src="image.jpg"
  onError={(error) => console.error(error)}
/>
```

**Props:**
- `src: string` - Media source URL (required)
- `alt?: string` - Alt text for images
- `thumbnailWidth?: string` - Thumbnail size (default: '300px')
- `video?: { controls?: boolean, loop?: boolean }` - Video configuration
- `onError?: (error: Error) => void` - Error callback

**Features:**
- Automatic image/video detection
- Loading skeleton with shimmer animation
- Click to expand to fullscreen lightbox
- ESC key and click-outside to close
- Error state with retry button
- Smooth Framer Motion animations

### TopNav

Navigation bar with flexible layout.

```tsx
import { TopNav } from 'nova-ui';

<TopNav
  logo={<img src="logo.svg" />}
  header={<h1>My App</h1>}
  search={<input type="text" placeholder="Search..." />}
/>
```

**Props:**
- `logo?: React.ReactNode` - Logo element
- `header: React.ReactNode` - Header content (required)
- `search?: React.ReactNode` - Search component

**Layout:**
- Sticky positioning (stays at top on scroll)
- Responsive grid layout
- Logo and header on left
- Search in middle
- Theme toggle on right (automatic)

### Tooltip

Contextual tooltip with smart positioning.

```tsx
import { Tooltip } from 'nova-ui';

<Tooltip message="Helpful hint" position="top">
  <button>Hover me</button>
</Tooltip>

// Conditional tooltip
<Tooltip message={hasError ? "Fix errors first" : undefined}>
  <button>Submit</button>
</Tooltip>
```

**Props:**
- `message?: string` - Tooltip text (no tooltip if undefined)
- `position?: 'top' | 'bottom' | 'left' | 'right'` - Position (default: 'top')
- `children: React.ReactNode` - Trigger element

### ThemeToggle

Theme switcher with supernova explosion animation.

```tsx
import { ThemeToggle } from 'nova-ui';

<ThemeToggle />
```

**Features:**
- Automatic system theme detection
- Manual toggle with sun/moon icons
- Circular explosion animation (View Transitions API)
- Graceful fallback for unsupported browsers
- Prevents spam clicking during transition

## Theme System

Nova UI includes a built-in light/dark mode system with smooth transitions.

**Light Mode:** Blue and orange tones  
**Dark Mode:** Orange and purple tones with deep space background

The theme toggle includes an animated circular transition effect that spreads from where you click (using the View Transitions API when supported).

## Development

```bash
npm install
npm run dev
```

### Built in rememberance of Nova. My faithful GSD for 7 years