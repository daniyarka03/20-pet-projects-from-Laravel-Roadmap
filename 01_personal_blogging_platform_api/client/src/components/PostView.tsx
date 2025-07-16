import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { postsApi } from '@/services/api';
import type { Post } from '@/types/post';
import { ArrowLeft, Calendar, Edit, Trash2 } from 'lucide-react';
import { formatDate } from '@/lib/utils';

export default function PostView() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchPost(parseInt(id));
    }
  }, [id]);

  const fetchPost = async (postId: number) => {
    try {
      setLoading(true);
      const data = await postsApi.getPost(postId);
      setPost(data);
    } catch (err) {
      setError('Post not found');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (post && window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postsApi.deletePost(post.id);
        navigate('/');
      } catch (err) {
        console.error('Error deleting post:', err);
        alert('Error deleting post');
      }
    }
  };

  const formatContent = (content: string) => {
    return content.split('\n').map((paragraph, index) => (
      <p key={index} className="mb-4 text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
        {paragraph}
      </p>
    ));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-lg text-gray-600">Loading...</div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-lg text-red-600 mb-4">{error || 'Post not found'}</div>
          <Link to="/">
            <Button className="bg-black text-white hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Navigation */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Posts
            </Button>
          </Link>
        </div>

        {/* Post Content */}
        <Card className="border border-gray-200">
          <CardHeader className="pb-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold text-black mb-4 leading-tight word-break-all break-words break-spacing">
                  {post.title}
                </CardTitle>
                <div className="flex flex-col gap-3 mb-4">
                  <div className="inline-flex items-center">
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {post.topic}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="w-4 h-4 mr-2" />
                    <span>Published {formatDate(post.created_at)}</span>
                    {post.updated_at !== post.created_at && (
                      <span className="ml-4">
                        • Updated {formatDate(post.updated_at)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex gap-2 ml-6">
                <Link to={`/edit/${post.id}`}>
                  <Button variant="outline" className="border-gray-300 hover:bg-gray-50">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="outline"
                  onClick={handleDelete}
                  className="border-red-300 text-red-600 hover:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="prose prose-lg max-w-none">
              {formatContent(post.content)}
            </div>
          </CardContent>
        </Card>

        {/* Footer Navigation */}
        <div className="mt-8 flex justify-center">
          <Link to="/">
            <Button className="bg-black text-white hover:bg-gray-800">
              Back to Posts
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
