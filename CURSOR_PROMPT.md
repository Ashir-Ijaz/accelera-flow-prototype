# ACCELERA FLOW LTD — COMPLETE CURSOR BUILD BRIEF

Build a complete, presentation-ready, highly animated prototype website for Accelera Flow LTD inside the current Vite + React + TypeScript project.

You are working as an implementation agent. Inspect the current project and local public folder first, then write the actual project files. Do not merely explain the solution or stop after making a plan. Do not deploy the website.

The first prototype must be ready for a client presentation. Prioritize a polished, coherent experience over adding unfinished features.

## NON-NEGOTIABLE ASSET

The supplied official logo is located at:

public/brand/accelera-flow-logo.png

Browser path:

/brand/accelera-flow-logo.png

Verify that the file exists before implementing the website. Use this exact logo in the navigation, preloader and footer. Do not redraw, replace, recolour or invent a different company logo.

The provided logo has a dark rectangular background rather than transparency. Blend it naturally into the dark navigation and footer. Do not display it inside a white box and do not stretch it.

## COMPANY FACTS

Company name: Accelera Flow LTD

Accelera Flow is a faceless content company creating content that makes a positive difference in people’s lives while opening up job opportunities for students in developing countries.

For Accelera Flow, faceless means letting the work take centre stage. The content does not rely on an on-camera personality, and the team works behind the scenes. Real people, ideas and creativity remain behind everything the company produces without requiring those people to become public figures.

This approach allows students to contribute their talents, gain professional experience and earn while studying while keeping their personal lives private.

The business was founded in Pakistan in 2019 and officially registered in the United Kingdom in 2025.

The company currently has 12 team members based in Pakistan, all of whom are students.

Founder: Aoun Muhammad

Founder statement:

I started Accelera Flow in 2019 with a belief that meaningful work does not always need a face in front of it. I chose a faceless approach to build a company where ideas, creativity and the quality of our content lead the way. I want students to have the opportunity to build a career through their skills without feeling they need to put themselves in the public eye. My goal is to grow Accelera Flow into a company that creates value for its audience and meaningful opportunities for the people behind the work.

## WORKING CREATIVE MESSAGE

Primary campaign statement:

FACELESS DOES NOT MEAN HUMANLESS.

Supporting line:

The work takes centre stage. The people behind it move forward.

Hero supporting copy:

We build faceless content systems that turn ideas into attention, conversations and opportunity.

The campaign language is working prototype copy, not a legally registered tagline. Keep company facts separate from campaign copy.

## VISUAL DIRECTION

Create an original premium creative-technology identity inspired by the supplied logo.

Colour system:

- Near-black page background: #211D1E
- Deep charcoal surface: #2C2829
- Elevated charcoal: #373233
- Primary orange: #FF6A00
- Red-orange: #F04400
- Amber highlight: #FF9400
- Warm white: #F5F3F1
- Muted grey text: #A8A4A5
- Dark divider: rgba(255,255,255,0.10)

Use orange and red as controlled highlights. The website must remain predominantly dark and premium.

Typography:

- Use Space Grotesk or a similarly expressive geometric sans-serif for headings.
- Use Manrope or a clean modern sans-serif for body text.
- Headings should be bold, confident and editorial.
- Body copy must remain readable and compact.
- Avoid overly wide paragraphs and giant blocks of text.

Visual character:

- Dark cinematic environments
- Orange flowing light trails
- Layered charcoal panels
- White typography
- Angular grey geometry inspired by the logo background
- Controlled glow rather than excessive neon
- Generous but purposeful spacing
- Editorial compositions that change as the page scrolls

Avoid:

- Purple or pink palettes
- Generic SaaS gradients
- Repetitive glass cards
- Random floating blobs
- Unrelated 3D objects
- Stock-office photography
- Fake dashboards or fake analytics
- Excessive empty space
- Copying the layout, source code, assets or wording of Nex Developers or Goodwork

Those websites are competitive references only. This website must have its own identity.

## TECHNOLOGY

Use:

- React
- TypeScript
- Vite
- React Router
- Three.js
- @react-three/fiber
- @react-three/drei
- GSAP
- GSAP ScrollTrigger
- Lenis
- Framer Motion
- React Hook Form
- Zod
- @hookform/resolvers
- Lucide React

If any dependency is missing, install it.

Do not use experimental WebGPU or TSL. Use reliable WebGL.

Use one Lenis instance only. Register ScrollTrigger once. Avoid multiple requestAnimationFrame loops.

## REQUIRED ROUTES

Implement:

- / — cinematic homepage
- /brands — owned brands and channels
- /services — detailed services
- /results — results and growth
- /about — company story, founder and people
- /contact — project enquiry
- * — branded 404 page

Every navigation item, CTA and internal link must work.

## GLOBAL NAVIGATION

Create a fixed premium navigation containing:

- Official logo
- Home
- Brands
- Services
- Results
- About
- Contact
- Primary CTA: START A PROJECT

Desktop:

- Dark transparent navigation at the top
- Becomes a compact charcoal pill or panel after scrolling
- Orange active-page indicator
- Strong keyboard focus states

Mobile:

- Accessible hamburger button
- Full-screen animated menu
- Large route links
- Contact CTA
- Escape key closes the menu
- Route selection closes the menu
- Body scroll locks only while the menu is open

## PRELOADER

Create a short branded preloader:

- Display the real logo.
- Reveal it with a horizontal mask.
- Pass a controlled orange light sweep over the mark.
- Animate a progress line from 0 to 100.
- Transition into the hero with the logo scaling slightly and the dark overlay splitting diagonally.

Keep it approximately 1.2–1.8 seconds after critical assets are ready.

Do not fake a long loading sequence.

Skip or simplify it for prefers-reduced-motion.

## HOMEPAGE — SIGNATURE 3D FLOW ENGINE

This is the primary signature experience and must feel more advanced than the competitor references.

Create one persistent full-screen React Three Fiber Canvas inside a pinned storytelling section approximately 500–600vh tall.

The 3D scene represents how an idea travels through Accelera Flow.

The scene must combine all three ideas:

1. An abstract world derived from the curved motion and energy of the Accelera logo.
2. A three-dimensional content-flow system.
3. Floating Instagram, YouTube and content screens representing the company portfolio.

Do not make three separate canvases.

### 3D construction

Build the scene from performant procedural geometry:

- Two or three curved orange/red ribbon paths
- TubeGeometry or carefully constructed curves
- Flowing particles travelling along the curves
- A central portal or gateway composition inspired by the movement of the stylized A
- Floating screen planes
- Thin connection lines
- Small data pulses
- Soft orange point lights
- A restrained charcoal environment
- Subtle fog for depth

The 3D mark is an abstract spatial interpretation, not a replacement logo. Always use the real supplied logo for official branding.

Floating screens should represent:

- Idea
- Script
- Design
- Short-form video
- Publishing
- Community
- DM conversation
- Growth
- Opportunity

Add channel screens for the real owned brands listed later in this brief.

Use readable DOM text overlays for important copy. Do not render every paragraph as Three.js text.

### Camera choreography

The camera must physically move through the scene. Do not keep the camera stationary while only spinning the group.

Use a GSAP ScrollTrigger timeline with scrub around 1–1.3 and pinning.

STAGE 1 — ARRIVAL, 0–14%

- Camera begins outside the Flow Engine.
- The full structure is visible.
- The logo appears in the navigation.
- Left-side text:
  ACCELERA FLOW LTD
  CONTENT IN MOTION.
  OPPORTUNITY IN FLOW.
- Add START A PROJECT and EXPLORE THE FLOW buttons.
- Add an animated scroll indicator.

STAGE 2 — IDEA, 14–29%

- Camera approaches a small glowing orange signal.
- The signal activates the first curve.
- Main composition moves slightly right.
- Text appears upper-left:
  01 / IDEA
  Every meaningful result starts with a thought worth sharing.
- A small storyboard card enters in the lower-left.

STAGE 3 — CREATE, 29–45%

- Camera travels along the illuminated curve.
- The signal separates into script, design, caption and video screens.
- Visual composition moves left.
- Text appears right-centre:
  02 / CREATE
  Faceless content, shaped by real people and real creative thinking.
- Screens should rotate gently toward the camera as it passes.

STAGE 4 — PUBLISH, 45–61%

- Camera moves through a ring of channel screens.
- Instagram and YouTube screens move at different depths.
- Text appears upper-left or left-centre:
  03 / PUBLISH
  One system. Multiple channels. Consistent momentum.
- Show channel names without inventing performance figures.

STAGE 5 — ENGAGE AND CONVERT, 61–79%

- Comment, message and enquiry pulses travel between cards.
- A DM-style screen connects to a conversion node.
- Text appears on the right:
  04 / ENGAGE
  Attention becomes conversation. Conversation becomes opportunity.
- Add subtle metric shapes, but do not display fake numbers.

STAGE 6 — HUMAN OPPORTUNITY, 79–92%

- Camera passes beyond the screens and reveals twelve small lights representing the student team.
- Those lights connect back into the Flow Engine.
- Text appears left:
  05 / OPPORTUNITY
  Built behind the scenes by students developing skills, experience and independence.

STAGE 7 — RESOLUTION, 92–100%

- Camera pulls back to reveal the full connected system.
- Curves settle into an A-like spatial composition.
- Centre CTA appears:
  LET YOUR NEXT IDEA FLOW.
  START A PROJECT
- Transition naturally into the manifesto.

### Stage composition rules

- Change the text position during every stage.
- Text must move opposite the visual weight of the 3D scene.
- Prevent text from overlapping screens.
- Keep all primary copy readable against the background.
- Use clip-path, blur, opacity and directional motion for transitions.
- Avoid abrupt content replacement.
- Scrolling upward must reverse the complete camera and content sequence.
- Pointer movement should add only subtle damped parallax.
- The Canvas must not block links or normal page scrolling.

### 3D performance

- Canvas DPR: [1, 1.5]
- Antialiasing enabled
- Use low-cost lighting
- Avoid expensive real-time shadows unless essential
- Use InstancedMesh for repeated particles
- Reuse geometry and materials
- Dispose custom resources
- Pause or reduce scene updates when the section is offscreen
- No heavy post-processing requirement
- Use CSS or material emissive glow instead of an expensive bloom stack
- Provide an error boundary and a styled fallback

### Mobile 3D behaviour

On mobile:

- Use a shorter 300–380vh sequence.
- Reduce particle count.
- Reduce curve segments.
- Remove nonessential lights.
- Keep text above or below the main scene.
- Preserve touch scrolling.
- Keep CTAs clickable.
- Never crop headings.
- If WebGL fails, show an animated CSS composition of the same flow stages.

For reduced motion:

- Show a static hero composition.
- Display each story stage as ordinary readable sections.
- Do not pin the user inside a long scroll experience.

## MANIFESTO

Build a strong editorial section:

FACELESS DOES NOT MEAN HUMANLESS.

THE WORK TAKES CENTRE STAGE.
THE PEOPLE BEHIND IT MOVE FORWARD.

Reveal the lines using large masked typography.

Include concise supporting copy explaining that the company does not depend on public-facing personalities, but real people and creativity remain behind every piece of content.

Add a moving orange line that crosses between the statements.

## OWNED BRANDS — INTERACTIVE ORBIT

Section title:

OUR BRANDS / ONE CREATIVE SYSTEM

Create a responsive perspective carousel or spatial orbit of brand cards. This can use CSS 3D or be connected visually to the main Canvas, but do not mount another expensive full-screen WebGL scene.

Instagram brands:

- Wealth Whizz — https://www.instagram.com/wealth.whizz/
- Neuromatrix — https://www.instagram.com/neuromatrix_/
- Anonhabit — https://www.instagram.com/anonhabit/
- Reboot with Ash — https://www.instagram.com/rebootwithash/

YouTube channels:

- GuideTechPro — https://www.youtube.com/@GuideTechPro
- Cyzmify — https://www.youtube.com/@cyzmify
- iQuickFixer — https://www.youtube.com/@iquickfixer

Requirements:

- Separate Instagram and YouTube filters
- External links open safely in a new tab
- Use rel="noopener noreferrer"
- Show platform, brand name and VIEW CHANNEL CTA
- Use purpose-built abstract thumbnails if real approved screenshots are unavailable
- Do not invent usernames, follower counts or analytics
- Cards tilt gently based on pointer position
- Active card moves forward in depth
- Arrow controls and keyboard controls
- Swipe support on mobile

## SERVICES — PINNED HORIZONTAL STORY

Build a vertically controlled horizontal-scroll section.

Title:

FROM ATTENTION TO ACTION.

Service panels:

1. Instagram Page Management
   Keep pages active and consistent through content planning, scheduling, publishing and community management.

2. Content Creation
   Create faceless videos, reels, graphics and social posts tailored to each brand.

3. Instagram DM Management and Sales Closing
   Manage enquiries, qualify leads, follow up with prospects and guide conversations toward sales in the client’s brand voice.

4. Cold Outreach
   Connect with potential clients, partners and creators through targeted research, personalised messaging and consistent follow-up.

5. Clipping
   Turn long videos, podcasts and livestreams into platform-ready Reels, Shorts and TikTok clips with editing and captions.

Animation:

- Pin the section.
- Move panels horizontally as the page scrolls vertically.
- Increase the active panel slightly.
- Run an orange progress line beneath the panels.
- Animate a small visual demonstration unique to each service.
- Exit the pinned section naturally.

On mobile, replace pinning with a vertical or swipeable layout.

## PROCESS SECTION

Show the content workflow:

DISCOVER → PLAN → CREATE → PUBLISH → ENGAGE → GROW

Use one continuous curved orange line connecting the stages.

As the line reaches each stage:

- Illuminate the number.
- Reveal one sentence.
- Animate the corresponding icon.

Do not copy Goodwork’s three-card process layout.

## VOICES BEHIND THE WORK

Create a human, editorial section explaining:

Our content may be faceless, but the people behind it have stories to share.

The source document does not provide real team member names, roles or testimonials.

Do not invent them.

Create three clearly marked prototype cards:

- TEAM STORY / NAME TO BE ADDED
- ROLE TO BE ADDED
- TESTIMONIAL TO BE ADDED

Use abstract silhouettes, initials or typographic portraits rather than fake photographs.

Make the cards move through a layered depth carousel with arrow, drag and keyboard controls.

Include:

- Working while studying
- Skills developed
- Professional growth

These are discussion themes, not fake personal quotations.

## RESULTS AND GROWTH

Create a premium analytics presentation.

The source requests:

- One owned Instagram result
- One owned YouTube result
- Selected client results
- Views
- Followers gained
- Accounts reached
- Subscribers gained
- Watch time
- Reporting period
- Analytics screenshots

No verified values or screenshots have been supplied.

Never invent numbers.

Use designed placeholder panels with:

- VERIFIED FIGURES TO BE ADDED
- ANALYTICS SCREENSHOT PLACEHOLDER
- REPORTING PERIOD TO BE ADDED

Animate the panels through a horizontal reveal or stacked depth transition.

Clearly differentiate placeholders from real data.

## COMPANY ORIGIN

Create a cinematic origin section using:

- 2019 — Founded in Pakistan
- 2025 — Officially registered in the United Kingdom
- 12 — Student team members based in Pakistan

These are supplied company facts and may be displayed as animated counters or timeline values.

Use an orange path that moves between Pakistan and the United Kingdom as an abstract connection, not a generic stock map.

Keep the focus on global work and student opportunity.

## FOUNDER SECTION

Present Aoun Muhammad’s founder story.

Use a large typographic quotation and an abstract portrait placeholder if no approved photograph is supplied.

Do not invent a founder photograph.

Use the provided founder statement from this brief, editing only for presentation length without changing its meaning.

## FINAL CTA

Headline:

LET’S BUILD SOMETHING WORTH SHARING.

Supporting text:

Tell us what you want to grow, and we’ll explore how content, management and conversation can move it forward.

Buttons:

- START A PROJECT
- EXPLORE OUR BRANDS

## FOOTER

Include:

- Real logo
- Short company description
- Home
- Brands
- Services
- Results
- About
- Contact
- Instagram and YouTube platform labels
- Back-to-top control
- Newsletter prototype
- Current-year copyright
- Accelera Flow LTD

Do not display a fake business email, address or telephone number.

If no email is provided, use:

BUSINESS EMAIL TO BE ADDED

## BRANDS PAGE

Create a complete /brands page:

- Cinematic page introduction
- Platform filter: All, Instagram, YouTube
- Seven channel cards
- Working external links
- Search by channel name
- Animated layout transitions when filtering
- One featured-channel presentation
- CTA to contact
- Clear empty search state

Do not fetch or fabricate follower counts.

## SERVICES PAGE

Create a complete /services page:

- Editorial hero
- Five detailed service sections
- Suitable-for tags
- Deliverables for each service
- Connected service workflow
- FAQ accordion
- CTA to the contact page

Suggested FAQs:

- What does faceless content mean?
- Can Accelera Flow work in an existing brand voice?
- Which platforms are supported?
- Does the team handle audience conversations?
- Can long-form content be repurposed?

Do not invent contractual promises, turnaround times or prices.

## RESULTS PAGE

Create a complete /results page:

- Results introduction
- Instagram, YouTube and Client filters
- Placeholder analytics cards
- Explanation of what will eventually be measured
- Methodology labels
- CTA

Every unprovided result must remain explicitly marked as awaiting verified data.

## ABOUT PAGE

Create:

- Company mission
- Meaning of faceless content
- 2019 to 2025 origin timeline
- Founder story
- Student-opportunity model
- 12-person team fact
- Voices Behind the Work placeholders
- Company values:
  MEANINGFUL WORK
  PRIVACY
  CREATIVE QUALITY
  OPPORTUNITY
  GROWTH
- CTA to Brands and Contact

## CONTACT PAGE

Build a polished project enquiry form.

Fields:

- Your name
- Email address
- Brand name or social media link
- Service interested in
- Project goals and required support

Service options:

- Instagram Page Management
- Content Creation
- Instagram DM Management and Sales Closing
- Cold Outreach
- Clipping
- Multiple Services

Use React Hook Form and Zod.

Requirements:

- Accessible labels
- Inline validation
- Loading state
- Local prototype success state
- Reset button after success
- No network request unless a real endpoint is configured
- Clearly state that the prototype form does not yet send externally

Do not claim that a message was delivered if there is no backend.

## 404 PAGE

Create a branded 404:

- Broken orange flow line
- Message: THIS IDEA TOOK A WRONG TURN.
- Link back to Home
- Link to Brands

## ANIMATION SYSTEM

Use a varied but coherent animation system:

- Logo-mask preloader
- 3D camera choreography
- Scroll-linked particles
- Text line reveals
- Clip-path image and panel reveals
- Horizontal service story
- Perspective brand orbit
- Metric-panel depth transitions
- Animated timeline
- Magnetic primary buttons
- Restrained pointer parallax
- Smooth route transition overlay
- Animated active navigation state
- Mobile menu choreography

Do not apply the same fade-up animation to every element.

Motion timing:

- Micro interactions: 160–240ms
- Cards and panels: 400–700ms
- Section reveals: 700–1000ms
- Page transition: approximately 600–800ms
- Scroll animations controlled by progress

Respect prefers-reduced-motion across the entire website.

## ROUTE TRANSITIONS

Use Framer Motion for page transitions:

- Dark overlay enters.
- Orange line sweeps diagonally.
- Old route exits.
- New route enters.
- Scroll position resets only on genuine route change.

Do not replay the full preloader on every route.

## COMPONENT STRUCTURE

Use a maintainable structure:

src/
  components/
    animation/
    layout/
    navigation/
    sections/
    three/
    ui/
  data/
  hooks/
  pages/
  styles/
  types/

Suggested reusable components:

- AppShell
- Navigation
- MobileMenu
- Footer
- PageTransition
- LogoPreloader
- SmoothScrollProvider
- FlowEngineCanvas
- FlowEngineScene
- FlowCameraController
- FlowParticles
- ContentScreen3D
- ScrollStageCopy
- SectionHeading
- MagneticButton
- ChannelCard
- ServicePanel
- TestimonialPlaceholder
- AnalyticsPlaceholder
- ContactForm
- WebGLErrorFallback

Do not put the complete website in App.tsx.

## DATA STRUCTURE

Store navigation, channels, services, process stages, values and FAQs in typed data files.

Do not repeat hard-coded arrays in multiple pages.

## RESPONSIVENESS

Test and correct:

- 1440px desktop
- 1280px laptop
- 1024px laptop/tablet
- 768px tablet
- 390px mobile
- 360px small mobile

Prevent:

- Horizontal overflow outside the intentionally pinned desktop section
- Cropped logo
- Cropped headings
- Canvas covering buttons
- Text overlapping 3D screens
- Unusable navigation
- Tiny body text
- Scroll traps
- Janky pinning
- Layout jumps
- Invisible focus indicators

Use clamp for responsive typography and spacing.

## ACCESSIBILITY

- Semantic headings
- One H1 per page
- Keyboard-operable controls
- Visible focus states
- Descriptive aria labels
- Minimum readable contrast
- Alt text for the real logo
- Decorative graphics hidden from screen readers
- No autoplay audio
- No essential information available only through animation
- Reduced-motion alternative

## PERFORMANCE

- Lazy-load noncritical routes
- Lazy-load noncritical images
- Preload only the logo and essential hero assets
- One WebGL Canvas
- Cap DPR
- Use instancing for particles
- Avoid multiple full-screen event loops
- Clean up every GSAP context and ScrollTrigger
- Refresh ScrollTrigger after fonts and layout load
- Integrate Lenis with GSAP correctly
- Avoid React state updates every frame
- Use refs for rapidly changing 3D values
- Pause nonvisible interactive sequences
- Provide WebGL fallback
- Avoid cumulative layout shift

## SEO AND META

Add route-specific document titles and descriptions.

Homepage description should describe Accelera Flow as a faceless content company offering content creation, social media management, DM management, sales support, outreach and clipping.

Add sensible Open Graph placeholders without claiming unverified achievements.

## QUALITY REQUIREMENTS

The website must not resemble a generic AI-generated template.

Prioritize:

- A recognizable art direction
- Consistent spacing
- Clear type hierarchy
- Intentional compositions
- Real company copy
- Working controls
- Smooth scene-to-section transitions
- Strong mobile layout
- Presentation-quality finishing

## IMPLEMENTATION ORDER

1. Inspect the project and verify the logo.
2. Install missing dependencies.
3. Build the global design tokens and typography.
4. Implement routing and layout.
5. Build the logo preloader.
6. Build the 3D Flow Engine with a simple stable scene first.
7. Add scroll camera choreography and DOM stage copy.
8. Complete every homepage section.
9. Complete all required routes.
10. Add interactions and route transitions.
11. Implement responsive and reduced-motion behaviour.
12. Run lint and build.
13. Fix all errors.
14. Start the development server and inspect the site.

Do not spend all available work on the 3D hero while leaving the other pages empty.

## FINAL VERIFICATION

Run:

npm run lint

npm run build

Fix every TypeScript, lint and build error.

Start:

npm run dev

Verify:

1. The official logo loads.
2. The preloader finishes and does not loop.
3. The Flow Engine is visible.
4. The camera position changes during scrolling.
5. Scrolling upward reverses the sequence.
6. Text changes position across stages.
7. Floating channel screens are readable.
8. The Canvas does not block links.
9. The service horizontal scroll enters and exits cleanly.
10. Brand filters work.
11. All seven real channel links are correct.
12. No fake metrics appear.
13. Team placeholders are clearly identified.
14. Every required route renders.
15. Navigation links work.
16. Mobile menu works.
17. Contact validation works.
18. The form does not claim external delivery.
19. Reduced-motion mode remains fully usable.
20. No horizontal overflow exists on ordinary sections.
21. No console errors remain.
22. The build succeeds.

At completion, report:

- Routes completed
- Homepage sections completed
- Animations implemented
- Accessibility and mobile adaptations
- Lint result
- Build result
- Any genuine remaining limitation

Do not deploy the project.

Do not stop after writing a plan or a hero. Finish the complete prototype.
