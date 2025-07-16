# Personal Blog Platform - Frontend

A modern web interface for a personal blogging platform built with React, TypeScript, TailwindCSS, and Shadcn UI.

## 🚀 Features

- **Clean black and white design** - Minimalist and elegant interface
- **Full CRUD management** - Create, read, update, and delete posts
- **Responsive design** - Looks great on all devices
- **Modern tech stack** - React 18 + TypeScript + Vite
- **UI components** - Shadcn UI for consistent design

## 🛠 Technologies

- **React 18** - UI library
- **TypeScript** - Typed JavaScript
- **Vite** - Fast build tool
- **TailwindCSS** - Utility-first CSS framework
- **Shadcn UI** - Reusable components
- **React Router** - Routing
- **Axios** - HTTP client
- **Lucide React** - Icons

## 📱 Pages

1. **Post List** (`/`) - Main page with all posts
2. **Post View** (`/post/:id`) - Detailed view of a single post
3. **Create Post** (`/create`) - Form for creating a new post
4. **Edit Post** (`/edit/:id`) - Form for editing an existing post

## 🔗 API Endpoints

The application interacts with Laravel API:

- `GET /api/posts/` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts/` - Create a new post
- `PUT /api/posts/:id` - Update a post
- `DELETE /api/posts/:id` - Delete a post

## 🚀 Installation and Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Run the project in development mode:**
   ```bash
   npm run dev
   ```

3. **Open your browser and navigate to:**
   ```
   http://localhost:5174
   ```

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/           # Base UI components (Shadcn)
│   ├── PostList.tsx  # Post list
│   ├── PostView.tsx  # Post view
│   ├── CreatePost.tsx # Create post
│   └── EditPost.tsx  # Edit post
├── services/
│   └── api.ts        # API service for posts
├── types/
│   └── post.ts       # TypeScript interfaces
├── lib/
│   └── utils.ts      # Utilities
└── App.tsx           # Main component with routing
```

## 🎨 Design System

The application uses a minimalist black and white color scheme:

- **Primary color:** Black (#000000)
- **Background:** White (#FFFFFF)
- **Text:** Shades of gray
- **Accents:** Subtle gray borders

## 🔧 Implementation Features

- **TypeScript interfaces** for post data typing
- **Error handling** for all API requests
- **Form validation** with error display
- **Loading states** for better UX
- **Delete confirmation** to prevent accidental actions
- **Responsive layout** for mobile devices

## 📝 Usage

### Creating a Post
1. Click the "New Post" button on the main page
2. Fill in the title, topic, and content
3. Click "Publish"

### Editing a Post
1. Open a post or find it in the list
2. Click the edit icon
3. Make your changes
4. Click "Save Changes"

### Deleting a Post
1. Find the post in the list or open it
2. Click the delete icon
3. Confirm the action

## 🤝 API Requirements

Make sure your Laravel API is running on `http://localhost:8000` and supports:

- CORS for frontend domain
- JSON responses
- Proper HTTP status codes
- Post data structure:
  ```json
  {
    "id": 1,
    "title": "Post Title",
    "content": "Post Content",
    "topic": "Post Topic",
    "created_at": "2024-01-01T00:00:00.000000Z",
    "updated_at": "2024-01-01T00:00:00.000000Z"
  }
  ```
