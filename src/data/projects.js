// Portfolio project data. Single source of truth for the public project
// section. To publish admin edits for all visitors: paste the exported JSON
// from /#/admin into the `projects` array below and redeploy.
export const projects = [
  {
    slug: 'e-commerce',
    name: 'IslandCart — E-Commerce Platform',
    tech: 'React, TypeScript frontend · Node.js/Express backend · PostgreSQL (Neon)',
    summary:
      'Full-stack store with customer and vendor roles: browsing, carts, wishlists, notes, CRUD product flows, and database-backed user data.',
    decisions:
      'Migrated storage from flat JSON files to relational PostgreSQL to normalise product data and enable SQL reporting; vendor ownership checks plus role-based access control on every product mutation.',
    lessons:
      'Relational modelling paid off the moment reporting queries arrived; RBAC must live at the query level, not just in hidden UI.',
    contribution:
      'Solo build: storefront, cart and wishlist state, CRUD product flows with vendor ownership checks, auth and RBAC wiring.',
    caseStudy:
      'Problem: one storefront serving customers and vendors without leaking vendor tools. Approach: JSON files first for speed, then PostgreSQL on Neon with referential integrity; role checks at route and query level. Challenge: keeping cart state consistent across sessions after the migration.',
    repo: 'https://github.com/Surbhit-Nand/E-Commerce',
    live: 'https://e-commerce-island-cart.vercel.app',
    gallery: [],
  },
  {
    slug: 'computing-dashboard',
    name: 'Computing Project Dashboard',
    tech: 'Clerk authentication, Neon database, role-based dashboards',
    summary:
      'Authenticated dashboards where different users see different functionality based on role.',
    decisions: 'Delegated identity to Clerk; Postgres on Neon for role-scoped data.',
    lessons: 'Screenshots and contribution notes still to come.',
    contribution: 'Auth integration and role-scoped dashboard views.',
    caseStudy:
      'Problem: different users need different functionality from one app. Approach: Clerk for identity, Neon for role-scoped queries. Challenge: keeping unauthorized views unreachable, not just hidden.',
    repo: 'https://github.com/Surbhitnand001/IS314-Computing-Project',
    live: '',
    gallery: [],
  },
  {
    slug: 'central-buses',
    name: 'Central Buses',
    tech: 'JavaScript, application routing, wallet payments',
    summary:
      'Transport app with navigation, live tracking, ticket purchasing, and wallet payments.',
    decisions: 'Route-first navigation with wallet as the payment source of truth.',
    lessons: 'Case study still to come.',
    contribution: 'Routing, live-tracking view, ticket and wallet flows.',
    caseStudy:
      'Problem: plan a trip, track the bus, and pay in one flow. Approach: route-first navigation with the wallet as payment source of truth. Challenge: ticket state when tracking updates arrive mid-purchase.',
    repo: 'https://github.com/Surbhit-Nand/Central-Buses',
    live: '',
    gallery: [],
  },
  {
    slug: 'tcp-file-transfer',
    name: 'TCP-Based File Transfer',
    tech: 'Python, socket programming, TCP, binary protocols',
    summary:
      'Chunked binary file transfer over TCP with progress tracking and error handling for reliable, resumable transfers.',
    decisions:
      'Chunked framing with per-chunk acknowledgement so interrupted transfers resume instead of restarting.',
    lessons:
      'Protocol edge cases live at the boundaries: partial reads, disconnects mid-chunk, and mismatched file sizes.',
    contribution:
      'Solo build: transfer protocol, chunking, progress reporting, and error handling.',
    caseStudy:
      'Problem: move binary files reliably over raw TCP. Approach: fixed-size chunks with acknowledgements and progress tracking. Challenge: resuming cleanly after a dropped connection without corrupting the output file.',
    repo: 'https://github.com/Surbhit-Nand/TCP_FileTransfer',
    live: '',
    gallery: [],
  },
  {
    slug: 'weather-forecast',
    name: 'Weather Forecast',
    tech: 'JavaScript, web interface, forecast API',
    summary: 'Simple web interface that displays forecast information for a chosen location.',
    decisions: 'Kept the UI thin so the forecast data stays the focus.',
    lessons: 'Deployment link and write-up still to come.',
    contribution: 'Interface and forecast API integration.',
    caseStudy:
      'Problem: readable forecast with minimum chrome. Approach: thin UI over the forecast API. Challenge: empty and error states for unknown locations.',
    repo: 'https://github.com/Surbhit-Nand/Weather-Forecast',
    live: '',
    gallery: [],
  },
];
