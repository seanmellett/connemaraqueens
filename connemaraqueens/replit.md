# Connemara Queens - Native Irish Honeybee Website

## Overview
A specialized e-commerce platform for Native Irish Honeybee queens and nucleus colonies from Connemara, offering comprehensive bee breeding services and educational resources.

**Purpose**: Sell Native Irish Honeybee queens and nucs, educate about conservation, accept bookings with deposits for 2026 season.

**Current State**: Fully functional React/TypeScript website with Stripe payment integration, ready for deployment.

## Project Architecture

### Tech Stack
- **Frontend**: React.js with TypeScript, Tailwind CSS, shadcn/ui components
- **Backend**: Express.js with TypeScript
- **Payment**: Stripe integration for deposit processing
- **Routing**: Wouter for client-side routing
- **Forms**: React Hook Form with Zod validation
- **Storage**: In-memory storage (MemStorage)

### Key Features
- **5 Main Pages**: Home, About, Products, Booking, Contact
- **Stripe Payment Integration**: Secure deposit processing (€50 per nuc, €20 per queen)
- **Responsive Design**: Mobile-friendly with earthy color palette
- **Educational Content**: Native Irish Honeybee conservation information
- **Booking System**: 2026 season reservation system

### File Structure
```
client/src/
├── pages/ (Home, About, Products, Booking, Contact)
├── components/ui/ (shadcn components)
├── assets/ (bee images)
server/
├── routes.ts (API endpoints)
├── storage.ts (data management)
shared/
├── schema.ts (data models)
```

## Recent Changes

### Latest Updates (January 25, 2025)
- ✓ Updated beekeeper bio to include mentors Dave Geoghegan, Paddy Finnerty, and Ger Coyne
- ✓ Changed main section header to "About Connemara Queens"
- ✓ Updated beekeeper section to "Meet the Beekeeper Behind Connemara Queens"
- ✓ Updated queen price from €45 to €60 (deposit remains €20)
- ✓ Updated location to "Camus Oughter, Co. Galway, Ireland"
- ✓ Updated contact details: phone +353 87 326 8019, email info@connemaraqueens.ie
- ✓ Integrated authentic bee imagery throughout the site

### Previous Updates
- ✓ Created complete website structure with all 5 pages
- ✓ Implemented Stripe payment integration
- ✓ Added Sean Mellett's background and story
- ✓ Incorporated supplied bee photography
- ✓ Established earthy design theme with Native Irish Honeybee focus

## User Preferences
- **Domain**: User owns connemaraqueens.ie and has it on Netlify
- **Focus**: Native Irish Honeybee conservation and breeding
- **Pricing**: €60 per queen (€20 deposit), €50 per nuc deposit
- **Location**: Camus Oughter, Co. Galway, Ireland
- **Contact**: +353 87 326 8019, info@connemaraqueens.ie

## Deployment Status
- **Current**: Running locally on Replit
- **Next Step**: Deploy to connect with user's Netlify domain (connemaraqueens.ie)
- **Payment**: Stripe integration configured with environment variables