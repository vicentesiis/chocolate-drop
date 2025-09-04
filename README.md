# ChocolateDrop - Project Documentation

## 🍫 Overview

**ChocolateDrop** is a modern e-commerce platform specifically designed for selling artisanal chocolates online. Built on the robust Relivator Next.js template, it combines a sleek storefront with comprehensive business management tools.

### Product Description

*"ChocolateDrop — Productos artesanales de chocolate"* - An e-commerce platform and presentational website for artisanal chocolate brands, with the tagline "Store which makes you happy."

## 🏗️ Architecture & Technology Stack

### Core Framework

- **Frontend**: Next.js 15.3 with React 19.1
- **Language**: TypeScript 5.8
- **Styling**: Tailwind CSS 4.1 + shadcn/ui components
- **Runtime**: Bun (package manager and runtime)

### Backend & Database

- **Database**: PostgreSQL with Drizzle ORM
- **Hosting**: Neon Database (with Supabase as alternative)
- **Schema Management**: Drizzle Kit for migrations

### Authentication & Security

- **Auth System**: Better Auth with multi-provider support
- **Providers**: Google OAuth, GitHub OAuth
- **Features**:
  - Multi-factor authentication (MFA)
  - Session management
  - Email verification
  - Two-factor authentication with backup codes

### Payment Processing

- **Provider**: Polar.sh integration
- **Features**:
  - Subscription management
  - Customer portal
  - Webhook handling
  - Automatic customer creation

### File Management

- **Service**: UploadThing
- **Features**: Secure file uploads with URL-based uploads

### Additional Integrations

- **Analytics**: Vercel Speed Insights
- **Animations**: Anime.js + Framer Motion
- **Forms**: TanStack React Form (with ArkType validation - WIP)
- **Tables**: TanStack React Table
- **Notifications**: Sonner toast notifications
- **Themes**: Next Themes with system preference support

## 📁 Project Structure

```
chocolatedrop/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── (auth)/            # Authentication pages
│   │   ├── admin/             # Admin dashboard
│   │   ├── dashboard/         # User dashboard
│   │   ├── api/               # API routes
│   │   └── products/          # Product pages
│   ├── db/                    # Database schema & config
│   │   └── schema/            # Drizzle schemas
│   │       ├── users/         # User-related tables
│   │       ├── payments/      # Payment & subscription tables
│   │       └── uploads/       # File upload tables
│   ├── lib/                   # Utilities & configurations
│   │   ├── hooks/             # React hooks
│   │   └── queries/           # Database queries
│   └── ui/                    # UI components
│       ├── components/        # Business components
│       └── primitives/        # Base UI primitives
├── public/                    # Static assets
└── .tests/                    # Test files
```

## 🗄️ Database Schema

### User Management

- **Users Table**: Core user information with profile data
- **Sessions Table**: Active user sessions with device tracking
- **Accounts Table**: OAuth provider accounts
- **Verification Table**: Email verification tokens
- **Two Factor Table**: MFA secrets and backup codes

### Payment System

- **Polar Customer Table**: Links users to Polar customers
- **Polar Subscription Table**: Manages subscription states and products

### File Management

- **Uploads Table**: Tracks uploaded files and metadata

## 🔧 Configuration

### Environment Variables

```env
# App Configuration
NEXT_PUBLIC_APP_URL="http://localhost:3000"
NEXT_SERVER_APP_URL="http://localhost:3000"

# Database
DATABASE_URL="postgresql://..."

# Authentication
AUTH_SECRET="..."
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
AUTH_GITHUB_ID="..."
AUTH_GITHUB_SECRET="..."

# File Uploads
UPLOADTHING_TOKEN="..."
UPLOADTHING_SECRET_KEY="..."

# Payments
POLAR_ACCESS_TOKEN="..."
POLAR_WEBHOOK_SECRET="..."
POLAR_ENVIRONMENT="production"
```

### App Configuration (`src/app.ts`)

```typescript
export const SEO_CONFIG = {
  fullName: "ChocolateDrop — Productos artesanales de chocolate",
  name: "ChocolateDrop",
  slogan: "Store which makes you happy.",
};

export const SYSTEM_CONFIG = {
  redirectAfterSignIn: "/dashboard/uploads",
  redirectAfterSignUp: "/dashboard/uploads",
  repoName: "chocolatedrop",
  repoOwner: "blefnk",
  repoStars: true,
};
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- Bun package manager
- PostgreSQL database (Neon recommended)

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd chocolatedrop

# Install dependencies
bun install

# Setup environment
cp .env.example .env
# Edit .env with your credentials

# Setup database
bun db:push

# Start development server
bun dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server with Turbopack |
| `bun build` | Create production build |
| `bun db:push` | Apply database schema changes |
| `bun db:studio` | Open Drizzle Studio (visual DB editor) |
| `bun db:auth` | Update auth-related tables |
| `bun ui` | Add shadcn/ui components |
| `bun latest` | Update all dependencies |
| `bun check` | Run TypeScript, ESLint, Biome, and Knip |
| `bun tests` | Run test suite |

## 🎨 Features

### Customer-Facing Features

- **Product Catalog**: Browse artisanal chocolate products
- **Shopping Cart**: Add/remove items with persistent state
- **User Authentication**: Sign up/in with Google or GitHub
- **Product Search & Filtering**: Find products easily
- **Responsive Design**: Mobile-first approach
- **Dark/Light Theme**: System preference support

### Business Features

- **Admin Dashboard**: Manage products and orders
- **User Management**: View and manage customers
- **Upload Management**: Handle product images and files
- **Subscription Billing**: Polar.sh integration for recurring payments
- **Analytics**: Built-in performance monitoring

### Developer Features

- **Type Safety**: Full TypeScript coverage
- **Code Quality**: ESLint, Biome, and Knip integration
- **Modern Tooling**: Latest Next.js with App Router
- **Database Management**: Drizzle ORM with migrations
- **Testing**: Bun test runner

## 🔐 Authentication Flow

1. **Sign Up/In**: Users can register or login using:
   - Google OAuth
   - GitHub OAuth
   - Email/password (with Better Auth)

2. **Multi-Factor Authentication**: Optional MFA with:
   - TOTP (Time-based One-Time Password)
   - Backup codes for recovery

3. **Session Management**: Secure session handling with:
   - Device tracking
   - IP address logging
   - Automatic session cleanup

## 💳 Payment Integration

### Polar.sh Setup

1. Create Polar account and organization
2. Configure webhook endpoints
3. Set up products in Polar dashboard
4. Update product IDs in `src/lib/auth.ts`

### Subscription Flow

1. User selects subscription plan
2. Redirected to Polar checkout
3. Webhook confirms payment
4. User gains access to premium features

## 🎯 Target Audience

### Primary Users

- **Chocolate Artisans**: Small to medium chocolate makers
- **Gourmet Food Retailers**: Specialty food stores
- **Direct-to-Consumer Brands**: Chocolate brands selling online

### Use Cases

- Online chocolate store
- Subscription box service
- Wholesale chocolate platform
- Brand showcase website

## 🔄 Development Workflow

### Code Quality

- **Linting**: ESLint with React and TypeScript rules
- **Formatting**: Biome for consistent code style
- **Dead Code**: Knip for unused code detection
- **Type Checking**: Strict TypeScript configuration

### Database Workflow

1. Modify schema in `src/db/schema/`
2. Run `bun db:push` to apply changes
3. Use `bun db:studio` for visual inspection

### Component Development

- Use shadcn/ui primitives as base
- Create business components in `src/ui/components/`
- Follow atomic design principles

## 🚀 Deployment

### Recommended Platforms

- **Vercel**: Optimized for Next.js (recommended)
- **Netlify**: Alternative with good Next.js support
- **Railway**: Full-stack deployment option

### Environment Setup

1. Set production environment variables
2. Configure database connection
3. Set up OAuth providers for production domains
4. Configure Polar webhooks for production

### Performance Optimizations

- Built-in Vercel Speed Insights
- Image optimization with Next.js
- Automatic code splitting
- Server-side rendering where appropriate

## 📈 Future Roadmap

### Planned Features (Work in Progress)

- **Internationalization**: next-intl integration
- **Email System**: Resend integration for transactional emails
- **Advanced Forms**: Enhanced form validation with ArkType
- **API Layer**: ORPC integration for type-safe APIs

### Potential Enhancements

- **Inventory Management**: Stock tracking and alerts
- **Order Management**: Advanced order processing
- **Customer Reviews**: Product rating system
- **Marketing Tools**: Discount codes and promotions
- **Mobile App**: React Native companion app

## 🤝 Contributing

### Development Setup

1. Fork the repository
2. Create feature branch
3. Follow code quality standards
4. Submit pull request with tests

### Code Standards

- Use TypeScript for all new code
- Follow existing component patterns
- Add tests for new features
- Update documentation as needed
