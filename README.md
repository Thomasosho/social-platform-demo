# Social Platform Demo

A React Native social networking application with feed, profiles, posts, and social interactions. Built to demonstrate expertise in React Native, social platforms, and modern mobile app architecture.

## Features

- **Social Feed**: Scrollable feed of posts with like, comment, and share
- **User Profiles**: View profiles with followers, following, and posts
- **Post Creation**: Create text posts with real-time feed updates
- **Post Details**: View full posts with comments and interactions
- **Follow System**: Follow/unfollow users with real-time updates
- **Optimistic Updates**: Instant UI feedback for better UX

## Tech Stack

- **React Native** with Expo
- **TypeScript** for type safety
- **Zustand** for state management
- **React Navigation** for navigation
- **date-fns** for relative time formatting
- **Expo Vector Icons** for icons

## Project Structure

```
src/
  components/     # Reusable UI components (PostCard)
  screens/        # Screen components (Feed, Profile, CreatePost, PostDetails)
  store/          # Zustand state management with normalized data
  data/           # Mock data
  types/          # TypeScript type definitions
  utils/          # Helper functions (date formatting)
```

## Key Technical Decisions

1. **State Management**: Zustand with normalized data structure for efficiency
2. **Performance**: FlatList for efficient feed rendering with large datasets
3. **Optimistic Updates**: Instant feedback for likes and comments
4. **Component Memoization**: Prevent unnecessary re-renders
5. **Type Safety**: Full TypeScript for reliability

## Running the Project

```bash
# Install dependencies
npm install

# Start Expo
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Run on Web
npm run web
```

## Demo Walkthrough

1. **Feed Screen**: Scroll through posts, like, comment, navigate to profiles
2. **Profile Screen**: View user profiles, follow/unfollow, see user's posts
3. **Create Post**: Create new posts with form validation
4. **Post Details**: View full post with comments, add comments

<!-- ## Ready for Production

- Mock data structure matches real API patterns
- Store pattern ready for API integration
- Real-time updates can be added with WebSockets
- Image upload ready for implementation
- Comment threading can be extended -->

<!-- ## Interview Talking Points

- Demonstrates social platform expertise
- Shows understanding of feed algorithms and performance
- React Native best practices
- Optimistic updates for better UX
- Scalable architecture for growth -->

# social-platform-demo
