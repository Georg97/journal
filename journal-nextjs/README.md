# DIY Journal - Next.js Version

A beautiful printable journal application built with Next.js, Tailwind CSS, and TypeScript using the T3 Stack.

## Features

- **Title Page**: Custom cover page with "What I Learned" summary section and initial journal entries
- **Journal Pages**: Multiple pages with 6 life categories each:
  - Ernährung & Gewicht (Nutrition & Weight)
  - Fitness & Physis (Fitness & Physical Health)
  - Sozial- und Beziehungsleben (Social & Relationship Life)
  - Kreative Entfaltung, Kunst, Musik & Projekte (Creative Development, Art, Music & Projects)
  - Sauberkeit & Ordnung (Cleanliness & Order)
  - Finanzen (Finances)
- **Rating System**: Each category has a /10 rating, with automatic totals (/60) and overall rating (=/10)
- **Print-Optimized**: Designed for A4 paper that creates A5 journal pages when cut horizontally
- **Responsive UI**: Clean interface with easy navigation between title and journal pages

## Tech Stack

- **Next.js 15** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** for UI components (configured)
- **T3 Stack** boilerplate

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or pnpm

### Installation

Dependencies are already installed. If you need to reinstall:
```bash
npm install
```

### Running the Application

The development server is currently running at [http://localhost:3000](http://localhost:3000)

To start it manually:
```bash
npm run dev
```

## Usage

### Viewing Pages

1. **Home Page**: Landing page with navigation to Title or Journal pages
2. **Title Page**: Click "Title Page" to view and print the cover page
3. **Journal Pages**: Click "Journal Pages" to view and print journal entries

### Printing

1. Navigate to either the Title or Journal page
2. Click the "Print / Save as PDF" button in the top-left corner
3. In the print dialog:
   - Select "Save as PDF" or your printer
   - Set paper size to A4
   - Ensure margins are minimal (or use "None")
   - Print/Save

### Creating Your Physical Journal

1. Print the Title page (1 page)
2. Print as many Journal pages as you need
3. Cut each A4 page horizontally in the middle
4. Stack the resulting A5 pages
5. Bind them together (staple, clip, or bind)

## Project Structure

```
src/
├── app/
│   ├── page.tsx          # Main page with navigation
│   └── layout.tsx        # Root layout
├── components/
│   ├── JournalPage.tsx   # Journal page component
│   └── TitlePage.tsx     # Title/cover page component
├── styles/
│   └── globals.css       # Global styles with print media queries
└── lib/
    └── utils.ts          # Utility functions
```

## Customization

### Changing Categories

Edit the `categories` array in both `JournalPage.tsx` and `TitlePage.tsx`:

```typescript
const categories = [
  'Your Category 1',
  'Your Category 2',
  // ... add up to 6 categories
];
```

### Styling

The project uses Tailwind CSS. Main styling can be found in:
- Component files for component-specific styles
- `src/styles/globals.css` for global and print styles

### Print Settings

Adjust print-specific styles in `globals.css` under the `@media print` section.

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Type checking
npm run typecheck

# Linting
npm run lint

# Code formatting
npm run format
```

## Learn More About T3 Stack

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available)
- [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app)

## License

This project is open source and available for personal use.

## Credits

Built with the [T3 Stack](https://create.t3.gg/) - The best way to start a full-stack, typesafe Next.js app.
