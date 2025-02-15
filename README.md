# Event Ticket Booking App

A simple event ticket booking application built with **Next.js**, **TypeScript**, and **Tailwind CSS**. Users can book tickets, download them as images, and manage their reservations.

## Features

- Step-by-step ticket booking process
- Local storage persistence for form data
- Ticket image generation & download
- Responsive design

## Tech Stack

- **Next.js** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **dom-to-image** (for ticket downloads)

## Installation

```sh
git clone https://github.com/hng12-stage2-event-ticket-generator.git
cd ticket-generator-app
npm install
npm run dev
```

## Deployment

- Deployed using **Vercel**. Ensure `localStorage` is accessed only in the browser (e.g., inside `useEffect`).

## Usage

- Select ticket details
- Enter personal information
- Download the image
