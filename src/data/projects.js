// Portfolio project data. Single source of truth for the public project
// section. To publish admin edits for all visitors: paste the exported JSON
// from /#/admin into the `projects` array below and redeploy.
export const projects = [
  {
    slug: 'e-commerce',
    name: 'E-Commerce Application',
    tech: 'TypeScript, React, database integration, authentication',
    summary:
      'Full-stack store with customer and vendor roles: browsing, carts, wishlists, notes, and database-backed user data.',
    decisions: 'Separate customer and vendor flows backed by one user store.',
    lessons: 'Case study and screenshots still to come (TODO: Project Documentation).',
    contribution: 'Solo build: storefront, cart and wishlist state, auth wiring.',
    caseStudy:
      'Problem: one storefront serving two roles without leaking vendor tools to customers. Approach: role checks at the route and query level. Challenge: keeping cart state consistent across sessions.',
    repo: 'https://github.com/Surbhitnand001/E-Commerce',
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
    repo: 'https://github.com/Surbhitnand001/Central-Buses',
    live: '',
    gallery: [],
  },
  {
    slug: 'weather-forecast',
    name: 'Weather Forecast',
    tech: 'JavaScript, web interface, forecast API',
    summary:
      'Simple web interface that displays forecast information for a chosen location.',
    decisions: 'Kept the UI thin so the forecast data stays the focus.',
    lessons: 'Deployment link and write-up still to come.',
    contribution: 'Interface and forecast API integration.',
    caseStudy:
      'Problem: readable forecast with minimum chrome. Approach: thin UI over the forecast API. Challenge: empty and error states for unknown locations.',
    repo: 'https://github.com/Surbhitnand001/Weather-Forecast',
    live: '',
    gallery: [],
  },
]
