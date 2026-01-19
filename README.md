# Incel Travel

A modern, feature-rich travel and tourism website built with Next.js 14, TypeScript, and Tailwind CSS. This platform offers comprehensive travel services including tour packages, local tours, visa services, and more.

## 🚀 Features

- **Tour Packages**: Browse and explore various travel packages with detailed information
- **Local Tours**: Discover local tour options with dynamic routing
- **Visa Services**: UAE and Global visa services information and applications
- **Interactive UI**: Modern, responsive design with smooth animations
- **WhatsApp Integration**: Direct WhatsApp contact support
- **Search Functionality**: Hero search bar for quick package discovery
- **Hot Deals**: Featured deals carousel showcasing special offers
- **Smooth Scrolling**: Enhanced user experience with smooth scroll animations
- **Responsive Design**: Fully responsive across all device sizes

## 🛠️ Tech Stack

- **Framework**: [Next.js 14](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [React Lenis](https://github.com/studio-freight/react-lenis)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Forms**: [React Hook Form](https://react-hook-form.com/)
- **Carousels**: [Embla Carousel](https://www.embla-carousel.com/)

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (version 18 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## 🚦 Getting Started

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd "incel copy"
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3005](http://localhost:3005) in your browser to see the result.

### Build for Production

```bash
npm run build
npm start
```

## 📁 Project Structure

```
incel copy/
├── app/                    # Next.js app directory
│   ├── about-us/          # About us page
│   ├── account/           # Account page
│   ├── contact/           # Contact page
│   ├── global-visa/       # Global visa services
│   ├── local-tours/       # Local tours with dynamic routing
│   ├── packages/          # Tour packages with dynamic routing
│   ├── uae-visa/          # UAE visa services
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── data/                 # Mock data and constants
├── lib/                  # Utility functions
├── public/               # Static assets
├── styles/               # Global styles
└── views/               # Page view components
```

## 🎨 Key Components

- **Navigation**: Responsive navigation bar with mobile menu
- **HeroWithSearch**: Hero section with search functionality
- **PackageCard**: Reusable package card component
- **TourCard**: Tour display card component
- **VisaCard**: Visa service card component
- **HotDealsCarousel**: Featured deals carousel
- **LatestPackagesCarousel**: Latest packages showcase
- **WhatsAppButton**: Floating WhatsApp contact button
- **Footer**: Site footer with links and information
- **SmoothScroll**: Smooth scrolling wrapper
- **ScrollProgress**: Scroll progress indicator

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file in the root directory for environment-specific variables:

```env
# Add your environment variables here
```

### Next.js Config

The project uses Next.js 14 with:
- React Strict Mode enabled
- Image optimization configured for Unsplash
- TypeScript support

### Tailwind CSS

Tailwind is configured with custom animations and utilities. See `tailwind.config.js` for configuration details.

## 📱 Pages

- **Home** (`/`): Main landing page with featured content
- **About Us** (`/about-us`): Company information
- **Packages** (`/packages`): Browse all travel packages
- **Package Details** (`/packages/[id]`): Individual package details
- **Local Tours** (`/local-tours`): Browse local tour options
- **Tour Details** (`/local-tours/[id]`): Individual tour details
- **UAE Visa** (`/uae-visa`): UAE visa services
- **Global Visa** (`/global-visa`): Global visa services
- **Contact** (`/contact`): Contact information and form
- **Account** (`/account`): User account page

## 🎯 Development Guidelines

- Use TypeScript for all new files
- Follow the existing component structure
- Keep components small and focused
- Use Tailwind CSS for styling
- Implement responsive design for all components
- Add proper TypeScript types for all props and data

## 📦 Available Scripts

- `npm run dev`: Start development server on port 3005
- `npm run build`: Build the application for production
- `npm start`: Start the production server
- `npm run lint`: Run ESLint to check code quality

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Support

For support, contact via:
- WhatsApp: Available through the floating WhatsApp button on the site
- Contact Page: Visit `/contact` for more information

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing framework
- [shadcn/ui](https://ui.shadcn.com/) for beautiful UI components
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Radix UI](https://www.radix-ui.com/) for accessible component primitives

---

Built with ❤️ using Next.js and TypeScript
