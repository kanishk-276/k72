# k72 Repository - Home Page Documentation

## Section Purpose

The Home Page (`src/pages/Home.jsx`) serves as the primary landing page for the k72 application. It features prominent hero content, including dynamic text and a background video, along with essential navigation elements. This page is the initial entry point for users and sets the tone for the entire application.

## Core Components and Functionality

The Home Page is composed of several key React components:

1.  **`Navbar` (`src/components/common/Navigation/Navbar.jsx`)**:
    *   **Purpose**: Renders the top navigation bar, which includes the application logo and a hamburger menu icon.
    *   **Functionality**:
        *   Displays the k72 logo, whose color dynamically changes based on the current route (white for Home, black for Projects/Agence) via `NavbarColorContext`.
        *   The hamburger menu icon, when hovered over, reveals a green overlay and expands to indicate interactivity.
        *   Clicking the hamburger icon triggers the opening of the `FullScreenNav` component by setting `navOpen` to `true` in `NavbarContext`.
    *   **Integration Points**:
        *   `NavbarColorContext`: Used to manage the logo's color.
        *   `NavbarContext`: Used to control the visibility and animation of `FullScreenNav`.

2.  **`Video` (`src/components/home/Video.jsx`)**:
    *   **Purpose**: Displays a background video that contributes to the hero section's visual appeal.
    *   **Functionality**:
        *   Plays a `video.mp4` file on loop, muted, and automatically.
        *   The video is set to cover the entire container, ensuring it fills the background.
    *   **Usage**: Embedded within the `Home` component to serve as the background for the hero content.

3.  **`HomeHeroText` (`src/components/home/HomeHeroText.jsx`)**:
    *   **Purpose**: Renders the main textual content of the hero section.
    *   **Functionality**:
        *   Displays large, uppercase text with a specific font (`font1`) and leading.
        *   The phrase "qui génère" incorporates the `Video` component within a styled `div`, creating an effect where the video appears as part of the text.
    *   **Styling**: Utilizes Tailwind CSS for layout and typography, with specific font families defined in `index.css`.

4.  **`HomeBottomText` (`src/components/home/HomeBottomText.jsx`)**:
    *   **Purpose**: Displays navigation links at the bottom of the hero section.
    *   **Functionality**:
        *   Renders two prominent, styled links: "Projects" and "Agence".
        *   These links navigate to their respective routes (`/projects` and `/agence`).
        *   The links have a border and hover effects that change their text color to `#D3FD50`.
    *   **Integration Points**: Uses `react-router-dom`'s `Link` component for navigation.

## Component Hierarchy and Data Flow

The Home Page's structure and data flow can be visualized as follows:

```mermaid
flowchart LR
    subgraph App
        A[App Component] --> B(Routes)
    end
    subgraph Pages
        B --> C[Home Page]
    end
    subgraph Home Page Components
        C --> D[Navbar]
        C --> E[Video]
        C --> F[HomeHeroText]
        C --> G[HomeBottomText]
    end
    subgraph Navigation Components
        D --> H(Navbar Logo)
        D --> I(Hamburger Menu)
        I -- Click --> J[NavbarContext Set NavOpen=true]
        J --> K[FullScreenNav]
    end
    subgraph Hero Content
        F --> L(Hero Text)
        F --> M(Video Integration)
        M --> E
    end
    subgraph Bottom Navigation
        G --> N(Projects Link)
        G --> O(Agence Link)
        N -- Click --> P[/projects Route]
        O -- Click --> Q[/agence Route]
    end
    
    classDef component fill:#2D3748,stroke:#4A5568,stroke-width:2px,color:#E2E8F0
    classDef context fill:#1A202C,stroke:#2D3748,stroke-width:2px,color:#E2E8F0
    classDef route fill:#1F2937,stroke:#374151,stroke-width:2px,color:#E2E8F0
    
    class A,C,D,E,F,G,H,I,L,M,N,O component
    class J,K context
    class B,P,Q route
```

## Integration with Other Modules

*   **Routing (`react-router-dom`)**: The `Home` page is registered as the root route (`/`) in `App.jsx`. Navigation to other sections of the application is handled by `HomeBottomText` and the `Navbar`/`FullScreenNav` components.
*   **Context API (`NavContext.jsx`)**:
    *   `NavbarContext`: Manages the open/closed state of the full-screen navigation (`FullScreenNav`). The `Navbar` component updates this context, and `FullScreenNav` consumes it to animate its appearance/disappearance.
    *   `NavbarColorContext`: Controls the color of the logo in the `Navbar` based on the current route. This is managed by `NavContext` itself, reacting to route changes via `useLocation`.
*   **GSAP Animations (`@gsap/react`)**:
    *   The `Navbar` uses GSAP for the hover effect on the hamburger menu.
    *   The `FullScreenNav` component heavily relies on GSAP for its entrance and exit animations, triggered by changes in `NavbarContext`.
    *   The `Stairs` component (wrapped around the `App` in `main.jsx`) uses GSAP for page transition animations, triggered by route changes.

## Best Practices and Usage Patterns

*   **Component Reusability**: Components like `Navbar` and `Video` are designed to be reusable across different pages.
*   **Context for Global State**: `NavbarContext` and `NavbarColorContext` are excellent examples of using React Context for managing global UI state that affects multiple components.
*   **Conditional Styling**: The `NavbarColorContext` demonstrates how to conditionally apply styles based on application state (current route).
*   **Declarative Animations**: GSAP is integrated via `useGSAP` for managing complex animations in a declarative React way.
*   **Semantic HTML**: Ensure semantic HTML is used where appropriate, although the current implementation leans heavily on `div` elements for styling.

## Common Pitfalls and Gotchas

*   **Z-Index Conflicts**: With multiple fixed and absolute positioned elements, careful management of `z-index` is crucial to ensure elements appear in the correct stacking order. The `FullScreenNav` has a high `z-index` (`z-999`) to ensure it overlays other content.
*   **Animation Timing and Synchronization**: When integrating multiple GSAP animations (e.g., `Navbar` opening `FullScreenNav`, and `Stairs` animating page transitions), ensure their timings are synchronized to avoid jarring visual experiences.
*   **Performance with Background Video**: Large video files can impact initial load times. Ensure the video is optimized for web use (compressed, appropriate format). The `video.mp4` is assumed to be optimized.
*   **Responsiveness**: While Tailwind CSS handles much of the responsiveness, thorough testing across various devices and screen sizes is essential, especially for the hero text and navigation elements.
*   **Context Provider Placement**: Ensure `NavContext` is placed correctly in `main.jsx` to wrap all components that need access to its context values.

# Agence Page Documentation

## Section Purpose

The "Agence" page is dedicated to showcasing the agency's team and its core philosophy. It serves as a digital representation of the people behind the work and the guiding principles that drive their creative process.

## File Structure and Integration

The `Agence.jsx` component is located at `src/pages/Agence.jsx`. It's integrated into the application's routing structure within `src/App.jsx` via `react-router-dom`.

```jsx
// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Agence from './pages/Agence'; // Imported Agence component

// ... other imports and component logic

const App = () => {
  return (
    <div className='overflow-x-hidden'>
      {/* ... Navbar and FullScreenNav */}
      <Routes>
        {/* ... other routes */}
        <Route path='/agence' element={<Agence />} /> {/* Route definition for Agence */}
      </Routes>
    </div>
  );
};

export default App;
```

The `Agence` page also utilizes the `Stairs` component for page transition animations, as defined in `src/main.jsx`.

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import Stairs from './components/common/Stairs.jsx'; // Stairs component for transitions
import NavContext from './context/NavContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Stairs> {/* Wraps the entire app for transition effects */}
        <NavContext>
          <App />
        </NavContext>
      </Stairs>
    </BrowserRouter>
  </React.StrictMode>,
);
```

Furthermore, the `Navbar` component's color dynamically adjusts based on the current route, including the "Agence" page, managed by `NavContext.jsx`.

```jsx
// src/context/NavContext.jsx
import React, { createContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

export const NavbarContext = createContext();
export const NavbarColorContext = createContext();

const NavContext = ({ children }) => {
    const [navColor, setNavColor] = useState('white');
    const [navOpen, setNavOpen] = useState(false);
    const locate = useLocation().pathname;

    useEffect(() => {
        // Sets navbar color to black for 'projects' and 'agence' pages
        if (locate === '/projects' || locate === '/agence') {
            setNavColor('black');
        } else {
            setNavColor('white');
        }
    }, [locate]);

    return (
        <NavbarContext.Provider value={[navOpen, setNavOpen]}>
            <NavbarColorContext.Provider value={[navColor, setNavColor]}>
                {children}
            </NavbarColorContext.Provider>
        </NavbarContext.Provider>
    );
};

export default NavContext;
```

## Component Breakdown: `Agence.jsx`

The `Agence.jsx` component is responsible for rendering the content of the agency page. It leverages GSAP for scroll-based animations to present the team and philosophy.

### Core Concepts

1.  **Team Showcase:** The page displays images of team members. These images are dynamically loaded and animated based on scroll position.
2.  **Agency Philosophy:** A textual representation of the agency's core values and approach is presented.
3.  **GSAP ScrollTrigger:** This is the primary animation library used. `ScrollTrigger` allows elements to animate based on their position in the viewport as the user scrolls.

### Key Implementation Details

*   **`images` Array:** This array holds the URLs for the team member images. The order of these URLs directly corresponds to the sequence in which they will be displayed during the scroll animation.
*   **`imageDivRef` and `imageRef`:** These `useRef` hooks are used to get direct references to the DOM elements that will be manipulated by GSAP. `imageDivRef` is the container for the image, and `imageRef` is the `<img>` tag itself.
*   **`gsap.registerPlugin(ScrollTrigger)`:** This line is crucial for enabling the `ScrollTrigger` functionality.
*   **`useGSAP` Hook:** This hook from `@gsap/react` is used to encapsulate GSAP animations, ensuring they are properly managed within the React component lifecycle.

### Animation Logic

The core animation logic is within the `useGSAP` block:

```javascript
// src/pages/Agence.jsx
useGSAP(function(){
  gsap.to(imageDivRef.current,{
    scrollTrigger:{
      trigger:imageDivRef.current,
      start:'top 30%', // Animation starts when the trigger element reaches 30% from the top of the viewport
      end:'top -75%',  // Animation ends when the trigger element reaches 75% above the top of the viewport
      pin:true,        // Pins the element to the viewport during the scroll
      pinSpacing:true, // Adds spacing to prevent content overlap when pinned
      pinReparent:true,// Reparents the pinned element to the body for better positioning
      pinType:'transform', // Uses transform for pinning, generally more performant
      scrub:1,         // Smoothly links animation progress to scroll progress (1 = 1:1)
      anticipatePin:1, // Helps with anticipating pin behavior for smoother transitions
      invalidateOnRefresh:true, // Re-validates scroll triggers on window resize
      onUpdate:(elem)=>{ // Callback function executed on every scroll update
        // Calculates the index of the image to display based on scroll progress
        const imageIndex = Math.floor(elem.progress * (images.length - 1));
        imageRef.current.src = images[imageIndex]; // Updates the image source
      }
    }
  });
});
```

**Explanation of `onUpdate`:**

The `onUpdate` callback is the heart of the image switching animation.
*   `elem.progress` represents the scroll progress within the `ScrollTrigger`'s active range, from 0 (at `start`) to 1 (at `end`).
*   Multiplying `elem.progress` by `(images.length - 1)` scales this progress to the range of valid indices for the `images` array.
*   `Math.floor()` ensures we get an integer index.
*   The `imageRef.current.src` is then updated with the corresponding image URL from the `images` array.

### Usage Patterns and Best Practices

*   **Maintain Image Order:** Ensure the `images` array is ordered logically to create a smooth visual flow as users scroll through the team members.
*   **Responsive Design:** The `h-[20vw]` and `w-[15vw]` for the image container are responsive units. However, thorough testing across various screen sizes is recommended.
*   **Philosophy Text Placement:** The philosophy text is positioned using relative and absolute positioning. Ensure its placement remains appropriate on different screen sizes.
*   **GSAP Configuration:** The `ScrollTrigger` configuration is optimized for performance and smooth animation. Avoid unnecessary complexity in `start` and `end` values unless required for specific design needs.

### Potential Pitfalls and Gotchas

*   **Image Loading Performance:** Large image files can impact initial page load times. Consider optimizing images for web use (e.g., using appropriate formats like WebP and compressing them).
*   **Scroll Lag:** On lower-end devices or with very complex animations, scroll lag can occur. The current `scrub: 1` and `pinType: 'transform'` are generally good for performance, but extensive testing is advised.
*   **`anticipatePin: 1`:** While helpful, this can sometimes lead to unexpected behavior if not carefully managed. If issues arise, consider removing it and testing.
*   **`pinReparent: true`:** This can sometimes interfere with other absolutely positioned elements if not managed carefully. Ensure no other critical elements are negatively affected.
*   **`invalidateOnRefresh: true`:** This is generally good practice for responsive layouts, but if you encounter unexpected animation resets on resize, investigate its interaction with other GSAP instances.

## Mermaid Diagram: Agence Page Animation Flow

This diagram illustrates the flow of the scroll-based animation for the team member images.

```mermaid
flowchart LR
    A[User Scrolls] --> B{ScrollTrigger Active};
    B -- Yes --> C[onUpdate Callback Triggered];
    C --> D{Calculate Image Index};
    D --> E[Update Image Source];
    E --> F[Display New Image];
    B -- No --> G[Animation Paused/Inactive];
    
    subgraph Animation Logic
        C
        D
        E
        F
    end

    classDef user fill:#2D3748,stroke:#4A5568,stroke-width:2px,color:#E2E8F0
    classDef trigger fill:#1A202C,stroke:#2D3748,stroke-width:2px,color:#E2E8F0
    classDef callback fill:#1F2937,stroke:#374151,stroke-width:2px,color:#E2E8F0
    classDef logic fill:#2A4365,stroke:#4A5568,stroke-width:2px,color:#E2E8F0

    class A user
    class B trigger
    class C,D,E,F callback
    class G logic

    # Projects Page Documentation

## Overview

The Projects Page (`src/pages/Projects.jsx`) is responsible for displaying a curated list of featured projects. It utilizes a visual card-based layout to present each project, allowing users to quickly scan and engage with the featured work.

## Purpose

This page serves as a portfolio showcase, highlighting the key projects undertaken by the K72 team. It aims to provide potential clients and collaborators with a clear and visually appealing overview of their capabilities and past work.

## Component Structure

The Projects Page is primarily composed of the following components:

*   **`Projects.jsx`**: The main page component that fetches and renders the project data.
*   **`ProjectCard.jsx`**: A reusable component responsible for rendering the visual card for each individual project.
*   **`Stairs.jsx`**: A common layout component that provides page transition animations.
*   **`Navbar.jsx`**: The global navigation bar.
*   **`FullScreenNav.jsx`**: The full-screen navigation overlay.
*   **`NavContext.jsx`**: Provides context for navigation state and color.

## Data Structure

The project data is defined as an array of objects within the `Projects.jsx` component. Each object represents a project and contains the following properties:

*   `image1`: URL of the first image for the project card.
*   `image2`: URL of the second image for the project card.

```javascript
const projects = [
  {
    image1: 'https://k72.ca/uploads/caseStudies/PJC/Thumbnails/PJC_SiteK72_Thumbnail_1280x960-1280x960.jpg',
    image2: 'https://k72.ca/uploads/caseStudies/WIDESCAPE/WS---K72.ca---Thumbnail-1280x960.jpg'
  },
  // ... other projects
];
```

## Rendering Logic

The `Projects.jsx` component iterates over the `projects` array using `map`. For each project object, it renders a `div` with the class `hero` and passes the `image1` and `image2` properties to the `ProjectCard` component.

```jsx
<div className='-lg:mt-20 lol'>
  {projects.map((elem, idx) => {
    return <div key={idx} className='hero w-full lg:h-[850px] mb-4 flex lg:flex-row flex-col lg:gap-4 gap-2'>
      <ProjectCard image1={elem.image1} image2={elem.image2} />
    </div>
  })}
</div>
```

## `ProjectCard.jsx` Component

The `ProjectCard` component is designed to display two images side-by-side within a single card. It utilizes Tailwind CSS for styling and GSAP for hover effects.

### Structure and Styling

Each `ProjectCard` consists of two main `div` elements, each representing half of the card and intended to display an image.

```jsx
const ProjectCard = (props) => {
    return (
        <>
            <div className='lg:w-1/2 group transition-all relative rounded-none hover:rounded-[70px] overflow-hidden h-full '>
                <img className='h-full w-full object-cover' src={props.image1} alt="" />
                <div className='opacity-0 transition-opacity group-hover:opacity-100 absolute top-0 flex items-center justify-center left-0 h-full w-full bg-black/15'>
                    <h2 className='uppercase text-6xl font-[font1] border-4 pt-4 px-8 text-white border-white rounded-full '>Vior le projet</h2>
                </div>
            </div>
            <div className='lg:w-1/2 group transition-all relative rounded-none hover:rounded-[70px] overflow-hidden h-full '>
                <img className='h-full w-full object-cover' src={props.image2} alt="" />
                <div className='opacity-0 transition-opacity group-hover:opacity-100 absolute top-0 flex items-center justify-center left-0 h-full w-full bg-black/15'>
                    <h2 className='uppercase text-6xl font-[font1] border-4 pt-4 px-8 text-white border-white rounded-full '>Vior le projet</h2>
                </div>
            </div>
        </>
    )
}
```

*   **`lg:w-1/2`**: On larger screens, each image container takes up half the width.
*   **`group`**: This Tailwind CSS utility class is crucial for enabling the `group-hover:` variants on child elements.
*   **`transition-all`**: Applies smooth transitions to all CSS properties.
*   **`relative`**: Establishes a positioning context for absolute children.
*   **`rounded-none hover:rounded-[70px]`**: The card has no border-radius by default but gains a large rounded corner on hover.
*   **`overflow-hidden`**: Ensures that the rounded corners are applied correctly and content doesn't spill out.
*   **`h-full`**: The image container stretches to fill its parent's height.
*   **`img`**: The image is set to cover its container (`object-cover`) and fill its dimensions (`h-full w-full`).
*   **Overlay `div`**:
    *   **`opacity-0 transition-opacity group-hover:opacity-100`**: This is the core of the hover effect. The overlay is initially invisible and fades in when the parent `div` (with the `group` class) is hovered over.
    *   **`absolute top-0 left-0 h-full w-full`**: Positions the overlay to cover the entire image container.
    *   **`bg-black/15`**: A semi-transparent black background for the overlay.
    *   **`h2`**: Displays the "View Project" text with specific styling.

### Hover Interaction

When a user hovers over a `ProjectCard`, the following animations occur:

1.  The `rounded-none` class is replaced by `hover:rounded-[70px]`, causing the card's corners to become significantly rounded.
2.  The overlay `div` transitions from `opacity-0` to `opacity-100`, revealing the "View Project" text.

## Animations and Transitions

### Page Entry Animation

The `Projects.jsx` component utilizes GSAP and `ScrollTrigger` for page entry animations.

```javascript
gsap.registerPlugin(ScrollTrigger)

useGSAP(function () {
  gsap.from('.hero', {
    height: '100px',
    stagger: {
      amount: 0.2
    },
    scrollTrigger: {
      trigger: '.lol',
      start: 'top 60%',
      end: 'top -190%',
      scrub: true,
    }
  })
})
```

*   **`gsap.registerPlugin(ScrollTrigger)`**: Registers the ScrollTrigger plugin for scroll-based animations.
*   **`useGSAP`**: A hook from `@gsap/react` that simplifies GSAP animations within React components.
*   **`gsap.from('.hero', { ... })`**: This animation targets all elements with the class `hero` (which wraps each `ProjectCard` pair).
    *   **`height: '100px'`**: The initial state of the `.hero` element is a height of 100px.
    *   **`stagger: { amount: 0.2 }`**: Applies a staggered animation to each `.hero` element, with a delay of 0.2 seconds between them.
    *   **`scrollTrigger: { ... }`**: Configures the animation to be triggered by scrolling.
        *   **`trigger: '.lol'`**: The animation starts when the element with class `lol` enters the viewport.
        *   **`start: 'top 60%'`**: The animation begins when the top of the trigger element (`.lol`) is 60% from the top of the viewport.
        *   **`end: 'top -190%'`**: The animation ends when the top of the trigger element is 190% *above* the top of the viewport (effectively, when scrolling far past it).
        *   **`scrub: true`**: The animation progress is tied directly to the scroll position. As the user scrolls, the animation plays forward or backward.

This animation creates a "growing" effect for each project card as the user scrolls down the page, making the initial presentation more dynamic.

### Navigation Animations

The Projects Page integrates with the global navigation system.

*   **`Navbar.jsx`**: The static navigation bar at the top. Its logo color dynamically changes to black when on the Projects or Agence pages, managed by `NavContext.jsx`.
*   **`FullScreenNav.jsx`**: The full-screen overlay navigation. It's triggered by the hamburger menu icon in the `Navbar`.
*   **`NavContext.jsx`**: This context provider manages the `navOpen` state (for the full-screen nav) and `navColor` state. The `useEffect` hook within `NavContext.jsx` specifically checks the current route (`useLocation().pathname`) and sets `navColor` to 'black' if the path is `/projects` or `/agence`.

## Integration Points

*   **Routing**: The Projects Page is accessible via the `/projects` route, defined in `src/App.jsx`.
*   **Global Navigation**: The `Navbar` and `FullScreenNav` components are present on this page, providing consistent site navigation. The `NavContext` ensures the navbar's color adapts to the Projects page.
*   **Page Transitions**: The `Stairs.jsx` component wraps the entire application, providing a consistent page transition animation across all routes, including the Projects Page.

## Best Practices and Usage Patterns

*   **Consistent Data Structure**: Ensure all project entries in the `projects` array adhere to the defined structure (`image1`, `image2`).
*   **Image Optimization**: Use optimized image formats and sizes for `image1` and `image2` to ensure fast loading times. The provided URLs suggest images are already optimized for web use.
*   **Responsive Design**: The use of Tailwind CSS classes like `lg:w-1/2`, `lg:h-[850px]`, and `lg:flex-row` ensures the layout adapts well to different screen sizes.
*   **Accessibility**: While not explicitly detailed in the provided code, consider adding `alt` text to images for better accessibility. The current `alt=""` is a placeholder.
*   **Clear Call to Action**: The "View Project" overlay provides a clear call to action. Ensure that clicking this overlay (or the card itself) navigates the user to the respective project's detail page (this functionality is not implemented in the provided snippet but is the logical next step).

## Common Pitfalls and Gotchas

*   **Broken Image Links**: Ensure all image URLs in the `projects` array are valid and accessible. Broken links will result in broken image displays.
*   **ScrollTrigger Configuration**: Incorrect `start`, `end`, or `trigger` configurations in `ScrollTrigger` can lead to animations not firing as expected or firing at the wrong times. Debugging these often involves inspecting the `ScrollTrigger` instance's state.
*   **`group-hover` Scope**: Remember that `group-hover:` variants only work on direct children of an element with the `group` class. If the overlay were nested deeper, the hover effect would not propagate.
*   **Performance with Many Projects**: If the `projects` array grows very large, rendering all `ProjectCard` components at once might impact performance. Consider implementing virtualization or lazy loading for very extensive lists.
*   **Context Updates**: Ensure that any changes to `NavContext.jsx` that affect the `Navbar`'s color are correctly propagated and that the `useEffect` hook accurately reflects the desired page conditions.

## Mermaid Diagram: Projects Page Component Flow

```mermaid
flowchart LR
    subgraph Projects Page
        A[Projects Component] --> B{Map Projects Data}
        B --> C[ProjectCard Component]
        C --> D[Image 1]
        C --> E[Image 2]
        C --> F[Hover Overlay]
    end
    
    subgraph Global Components
        G[Navbar Component]
        H[FullScreenNav Component]
        I[NavContext Provider]
    end
    
    subgraph Layout
        J[Stairs Component]
    end
    
    A --> J
    J --> G
    J --> H
    I --> G
    I --> A
    
    classDef page fill:#2D3748,stroke:#4A5568,stroke-width:2px,color:#E2E8F0
    classDef component fill:#1A202C,stroke:#2D3748,stroke-width:2px,color:#E2E8F0
    classDef data fill:#1F2937,stroke:#374151,stroke-width:2px,color:#E2E8F0
    classDef context fill:#372442,stroke:#914EB8,stroke-width:2px,color:#E2E8F0
    
    class A page
    class C,D,E,F component
    class B data
    class G,H component
    class I context
    class J component


    # Navigation Context

This section documents the `NavContext` module, which manages the global state for navigation elements within the K72 application. Specifically, it controls the visibility of the full-screen navigation overlay and the color of the primary navbar.

## Core Concepts

The navigation context is built around two primary pieces of state:

1.  **`navOpen`**: A boolean indicating whether the full-screen navigation menu is currently displayed.
2.  **`navColor`**: A string representing the current color of the main navbar. This is used to adapt the navbar's appearance to different page backgrounds.

## Integration Points

### `NavContext.jsx`

This file defines and exports the `NavbarContext` and `NavbarColorContext` using React's `createContext` API.

*   **`NavbarContext`**: Provides the `navOpen` state and its setter function (`setNavOpen`).
*   **`NavbarColorContext`**: Provides the `navColor` state and its setter function (`setNavColor`).

The `NavContext` component acts as a provider, wrapping its children with both contexts. It initializes `navOpen` to `false` (closed) and `navColor` to `'white'`.

**Key Logic:**

The `useEffect` hook within `NavContext.jsx` is crucial for dynamically updating `navColor` based on the current route.

```javascript
// src/context/NavContext.jsx
import React, { createContext, useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'

export const NavbarContext = createContext()
export const NavbarColorContext = createContext()

const NavContext = ({ children }) => {

    const [navColor, setNavColor] = useState('white')
    const [navOpen, setNavOpen] = useState(false)

    const locate = useLocation().pathname
    useEffect(function(){
        if(locate === '/projects' || locate === '/agence'){
            setNavColor('black')
        }else{
            setNavColor('white')
        }
    },[locate])
    
    return (
        <NavbarContext.Provider value={[navOpen, setNavOpen]}>
            <NavbarColorContext.Provider value={[navColor,setNavColor]}>
                {children}
            </NavbarColorContext.Provider>
        </NavbarContext.Provider>
    )
}

export default NavContext
```

*   **`useLocation().pathname`**: This hook from `react-router-dom` provides the current URL path.
*   **`useEffect` Dependency**: The effect re-runs whenever `locate` (the current path) changes.
*   **Conditional Logic**: If the path is `/projects` or `/agence`, `navColor` is set to `'black'`. Otherwise, it defaults to `'white'`. This ensures the navbar's logo color is legible against different backgrounds.

### `App.jsx`

The `App.jsx` component renders the main layout, including the `Navbar` and `FullScreenNav` components. It is wrapped by the `NavContext` provider in `main.jsx`, allowing these navigation components to access and manipulate the navigation state.

```javascript
// src/App.jsx
import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Agence from './pages/Agence'
import Projects from './pages/Projects'
import Navbar from './components/common/Navigation/Navbar'
import FullScreenNav from './components/common/Navigation/FullScreenNav'

const App = () => {
  return (
     <div className='overflow-x-hidden'>
      <Navbar />
      <FullScreenNav />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/agence' element={<Agence />} />
        <Route path='/projects' element={<Projects />} />
      </Routes>
    </div>
  )
}

export default App
```

### `Navbar.jsx`

This component displays the primary navigation bar at the top of the screen.

*   **Logo Color**: It consumes `NavbarColorContext` to dynamically set the `fill` color of the SVG logo.
*   **Toggle Navigation**: It exposes a clickable element (the hamburger icon) that calls `setNavOpen(true)` from `NavbarContext` to open the full-screen navigation.
*   **Hover Effect**: Implements a subtle hover effect on the hamburger icon using a `navGreenRef` to animate a green bar.

```javascript
// src/components/common/Navigation/Navbar.jsx
import React, { useContext, useRef } from 'react'
import { NavbarColorContext, NavbarContext } from '../../../context/NavContext'

const Navbar = () => {
    const navGreenRef = useRef(null)
    const [navOpen, setNavOpen] = useContext(NavbarContext)
    const [navColor, setNavColor] = useContext(NavbarColorContext)
    
    return (
        <div className='z-4 flex fixed top-0 w-full items-start justify-between'>
            <div className='lg:p-5 p-2 '>
                <div className='lg:w-36 w-24'>
                    {/* Logo with dynamic fill color */}
                    <svg className=' w-full' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 103 44">
                        <path fill={navColor} fillRule="evenodd" d="..." />
                    </svg>
                </div>
            </div>
            {/* Hamburger icon to open nav */}
            <div onClick={()=>{
                setNavOpen(true)
            }} onMouseEnter={() => {
                navGreenRef.current.style.height = '100%'
            }}
                onMouseLeave={() => {
                    navGreenRef.current.style.height = '0%'
                }}
                className='lg:h-16 h-10 bg-black relative lg:w-[16vw] w-48'>
                <div ref={navGreenRef} className='bg-[#D3FD50] transition-all absolute top-0 h-0 w-full'></div>
                <div className='relative h-full lg:px-12 px-8 flex flex-col justify-center items-end lg:gap-1.5 gap-0.5'>
                    <div className="lg:w-18 w-12 h-0.5 bg-white"></div>
                    <div className="lg:w-10 w-6 h-0.5 bg-white"></div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
```

### `FullScreenNav.jsx`

This component renders the full-screen navigation overlay.

*   **State Consumption**: It consumes `NavbarContext` to determine its visibility (`navOpen`).
*   **GSAP Animations**: It uses `useGSAP` and `gsap` to animate the appearance and disappearance of the navigation menu. The animations are triggered based on the `navOpen` state.
*   **Closing Navigation**: The close button (an 'X' icon) within `FullScreenNav` calls `setNavOpen(false)` to close the overlay.

```javascript
// src/components/common/Navigation/FullScreenNav.jsx
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { NavbarContext } from '../../../context/NavContext'

const FullScreenNav = () => {
    const fullNavLinksRef = useRef(null)
    const fullScreenRef = useRef(null)

    const [navOpen, setNavOpen] = useContext(NavbarContext)
    
    // ... gsapAnimation and gsapAnimationReverse functions ...

    useGSAP(function () {
        if (navOpen) {
            gsapAnimation() // Animation to show the nav
        } else {
            gsapAnimationReverse() // Animation to hide the nav
        }
    }, [navOpen]) // Re-run animation when navOpen changes

    return (
        <div ref={fullScreenRef} id='fullscreennav' className='fullscreennav hidden text-white overflow-hidden h-[100vh] w-full z-999 absolute'>
            {/* ... content of the full screen nav ... */}
            <div className="navlink flex w-full justify-between lg:p-5 p-2 items-start">
                {/* ... logo ... */}
                <div onClick={() => {
                    setNavOpen(false) // Close nav on click
                }} className='lg:h-32 h-20 w-20 lg:w-32 relative cursor-pointer'>
                    <div className='lg:h-44 h-28 lg:w-1 w-0.5 -rotate-45 origin-top absolute bg-[#D3FD50]'></div>
                    <div className='lg:h-44 h-28 lg:w-1 w-0.5 right-0 rotate-45 origin-top absolute bg-[#D3FD50]'></div>
                </div>
            </div>
            {/* ... navigation links ... */}
        </div>
    )
}

export default FullScreenNav
```

## Usage Patterns

### Opening the Full-Screen Navigation

To open the full-screen navigation from any component that has access to `NavbarContext`:

```javascript
import { useContext } from 'react';
import { NavbarContext } from '../../context/NavContext'; // Adjust path as needed

function MyComponent() {
  const [navOpen, setNavOpen] = useContext(NavbarContext);

  const handleOpenNav = () => {
    setNavOpen(true);
  };

  return (
    <button onClick={handleOpenNav}>Open Menu</button>
  );
}
```

### Closing the Full-Screen Navigation

To close the full-screen navigation from any component that has access to `NavbarContext`:

```javascript
import { useContext } from 'react';
import { NavbarContext } from '../../context/NavContext'; // Adjust path as needed

function MyComponent() {
  const [navOpen, setNavOpen] = useContext(NavbarContext);

  const handleCloseNav = () => {
    setNavOpen(false);
  };

  return (
    <button onClick={handleCloseNav}>Close Menu</button>
  );
}
```

### Dynamically Setting Navbar Color

To change the navbar color based on the current route or other conditions, use `NavbarColorContext`:

```javascript
import { useContext, useEffect } from 'react';
import { NavbarColorContext } from '../../context/NavContext'; // Adjust path as needed
import { useLocation } from 'react-router-dom';

function MyComponent() {
  const [navColor, setNavColor] = useContext(NavbarColorContext);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/special-page') {
      setNavColor('green'); // Example custom color
    } else {
      setNavColor('white'); // Default color
    }
  }, [location.pathname, setNavColor]);

  return (
    // ... component JSX ...
    <p>Navbar color is currently: {navColor}</p>
  );
}
```

## Best Practices

*   **Centralized State Management**: Leverage the provided contexts for all global navigation state. Avoid managing `navOpen` or `navColor` in individual component states unless it's strictly local to that component.
*   **Clear Naming**: The context names (`NavbarContext`, `NavbarColorContext`) and state variables (`navOpen`, `navColor`) are descriptive and should be maintained.
*   **Route-Based Color**: The current implementation of `NavContext.jsx` effectively handles navbar color changes based on routes. This is a robust pattern for ensuring UI consistency.

## Common Pitfalls and Gotchas

*   **Missing Provider**: Ensure that `NavContext` is correctly wrapped around `App.jsx` in `main.jsx`. Components attempting to consume the contexts without a provider will result in errors or undefined values.
*   **Incorrect Path Matching**: When updating the `useEffect` logic in `NavContext.jsx`, ensure exact path matching or use more sophisticated routing logic if needed (e.g., checking for path prefixes).
*   **Animation Dependencies**: When modifying `FullScreenNav.jsx` animations, ensure that the `useGSAP` hook's dependency array (`[navOpen]`) is correctly configured to trigger animations when the `navOpen` state changes.
*   **Z-Index Conflicts**: The `z-999` class on `FullScreenNav` is critical for ensuring it appears above other content. Be mindful of other elements that might require high z-index values and potential conflicts.

## Architecture Overview

The navigation context follows a standard React Context API pattern for global state management.

```mermaid
flowchart LR
    subgraph Application Root
        A[main.jsx] --> B(NavContext Provider)
    end
    
    subgraph Navigation Context
        B --> C{NavbarContext}
        B --> D{NavbarColorContext}
    end
    
    subgraph Components
        E[App.jsx] --> F(Navbar)
        E --> G(FullScreenNav)
    end
    
    subgraph Consumers
        F --> C
        F --> D
        G --> C
    end
    
    subgraph Routing
        H[react-router-dom] --> I(useLocation Hook)
        I --> B
    end
    
    classDef context fill:#2D3748,stroke:#4A5568,stroke-width:2px,color:#E2E8F0
    classDef component fill:#1A202C,stroke:#2D3748,stroke-width:2px,color:#E2E8F0
    classDef provider fill:#1F2937,stroke:#374151,stroke-width:2px,color:#E2E8F0
    
    class C,D context
    class F,G component
    class B provider

This documentation provides a foundational understanding of the Home Page's architecture and functionality within the k72 repository. Engineers can use this information to effectively contribute to, debug, or extend this section of the application.
