import { create } from 'zustand';
import { User, Post, Comment, Connection } from '../types';
import { mockUsers, mockPosts, mockComments, mockConnections, currentMockUser } from '../data/mockData';

interface SocialStore {
  currentUser: User | null;
  users: User[];
  posts: Post[];
  comments: Comment[];
  connections: Connection[];
  
  setCurrentUser: (user: User) => void;
  addPost: (post: Post) => void;
  updatePost: (postId: string, updates: Partial<Post>) => void;
  deletePost: (postId: string) => void;
  toggleLike: (postId: string) => void;
  addComment: (comment: Comment) => void;
  toggleFollow: (userId: string) => void;
  getPostComments: (postId: string) => Comment[];
  getUserPosts: (userId: string) => Post[];
  getUserFollowers: (userId: string) => User[];
  getUserFollowing: (userId: string) => User[];
}

export const useSocialStore = create<SocialStore>((set, get) => ({
  currentUser: currentMockUser,
  users: mockUsers,
  posts: mockPosts,
  comments: mockComments,
  connections: mockConnections,
  
  setCurrentUser: (user) => set({ currentUser: user }),
  
  addPost: (post) => set((state) => ({
    posts: [post, ...state.posts],
    users: state.users.map((u) =>
      u.id === post.userId ? { ...u, postsCount: u.postsCount + 1 } : u
    ),
  })),
  
  updatePost: (postId, updates) => set((state) => ({
    posts: state.posts.map((p) =>
      p.id === postId ? { ...p, ...updates } : p
    )
  })),
  
  deletePost: (postId) => set((state) => {
    const post = state.posts.find((p) => p.id === postId);
    if (!post) return state;
    
    return {
      posts: state.posts.filter((p) => p.id !== postId),
      users: state.users.map((u) =>
        u.id === post.userId ? { ...u, postsCount: Math.max(0, u.postsCount - 1) } : u
      ),
    };
  }),
  
  toggleLike: (postId) => set((state) => {
    const post = state.posts.find((p) => p.id === postId);
    if (!post) return state;
    
    const isLiked = post.isLiked || false;
    const newLikesCount = isLiked ? post.likesCount - 1 : post.likesCount + 1;
    
    return {
      posts: state.posts.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !isLiked, likesCount: newLikesCount }
          : p
      ),
    };
  }),
  
  addComment: (comment) => set((state) => ({
    comments: [...state.comments, comment],
    posts: state.posts.map((p) =>
      p.id === comment.postId
        ? { ...p, commentsCount: p.commentsCount + 1 }
        : p
    ),
  })),
  
  toggleFollow: (userId) => set((state) => {
    const user = state.users.find((u) => u.id === userId);
    if (!user || !state.currentUser) return state;
    
    const isFollowing = user.isFollowing || false;
    const currentUserId = state.currentUser.id;
    
    // Update user's following status
    const updatedUsers = state.users.map((u) => {
      if (u.id === userId) {
        return {
          ...u,
          isFollowing: !isFollowing,
          followersCount: isFollowing ? u.followersCount - 1 : u.followersCount + 1,
        };
      }
      if (u.id === currentUserId) {
        return {
          ...u,
          followingCount: isFollowing ? u.followingCount - 1 : u.followingCount + 1,
        };
      }
      return u;
    });
    
    // Update connections
    let updatedConnections = [...state.connections];
    const existingConnection = updatedConnections.find(
      (c) => c.userId === currentUserId && c.connectedUserId === userId
    );
    
    if (isFollowing && existingConnection) {
      updatedConnections = updatedConnections.filter((c) => c.id !== existingConnection.id);
    } else if (!isFollowing && !existingConnection) {
      updatedConnections.push({
        id: `conn-${Date.now()}`,
        userId: currentUserId,
        connectedUserId: userId,
        status: 'accepted',
        createdAt: new Date().toISOString(),
      });
    }
    
    return {
      users: updatedUsers,
      connections: updatedConnections,
    };
  }),
  
  getPostComments: (postId) => {
    return get().comments
      .filter((c) => c.postId === postId)
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  },
  
  getUserPosts: (userId) => {
    return get().posts
      .filter((p) => p.userId === userId)
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  },
  
  getUserFollowers: (userId) => {
    const followerIds = get().connections
      .filter((c) => c.connectedUserId === userId && c.status === 'accepted')
      .map((c) => c.userId);
    return get().users.filter((u) => followerIds.includes(u.id));
  },
  
  getUserFollowing: (userId) => {
    const followingIds = get().connections
      .filter((c) => c.userId === userId && c.status === 'accepted')
      .map((c) => c.connectedUserId);
    return get().users.filter((u) => followingIds.includes(u.id));
  },
}));

