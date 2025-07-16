import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { postsApi } from '@/services/api';
import type { Post } from '@/types/post';
import { Plus, Calendar, Edit, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function PostList() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const data = await postsApi.getAllPosts();
      
      // check if data is an array or an object with a data field
      if (Array.isArray(data)) {
        setPosts(data);
      } else if (data && typeof data === 'object' && 'data' in data && Array.isArray((data as any).data)) {
        // If API returns an object with a data field
        setPosts((data as any).data);
      } else {
        console.error('Unexpected API response format:', data);
        setPosts([]);
      }
    } catch (err) {
      setError('Error loading posts');
      console.error('Fetch posts error:', err);
      setPosts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsApi.deletePost(id);
        setPosts(posts.filter(post => post.id !== id));
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Error deleting post');
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-black mb-2">My Blog</h1>
            <p className="text-gray-600">All my thoughts and ideas in one place</p>
          </div>
          <Link to="/create">
            <Button className="bg-black text-white hover:bg-gray-800 transition-colors">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>

        {/* Posts Grid */}
        {!Array.isArray(posts) || posts.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No posts yet</div>
            <Link to="/create">
              <Button className="bg-black text-white hover:bg-gray-800">
                Create First Post
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            {posts.map((post) => (
              <Card key={post.id} className="border border-gray-200 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-xl font-bold text-black mb-2 line-clamp-2">
                        <Link to={`/post/${post.id}`} className="hover:text-gray-700 transition-colors">
                          {post.title}
                        </Link>
                      </CardTitle>
                      <div className="flex flex-col gap-1 text-sm text-gray-500">
                        <div className="inline-flex items-center">
                          <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs font-medium">
                            {post.topic}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {formatDate(post.created_at)}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Link to={`/edit/${post.id}`}>
                        <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDelete(post.id)}
                        className="border-red-300 text-red-600 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 line-clamp-3">
                    {post.content.substring(0, 150)}
                    {post.content.length > 150 && '...'}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
