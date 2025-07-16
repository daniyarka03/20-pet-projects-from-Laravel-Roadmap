export interface Post {
  id: number;
  title: string;
  content: string;
  topic: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  title: string;
  content: string;
  topic: string;
}

export interface UpdatePostData {
  title: string;
  content: string;
  topic: string;
}