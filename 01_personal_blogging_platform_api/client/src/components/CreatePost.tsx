import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ErrorModal } from '@/components/ui/modal';
import { postsApi } from '@/services/api';
import type { CreatePostData } from '@/types/post';
import { ArrowLeft, Save } from 'lucide-react';

export default function CreatePost() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CreatePostData>({
    title: '',
    content: '',
    topic: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<{ title?: string; content?: string; topic?: string }>({});
  const [errorModal, setErrorModal] = useState<{
    isOpen: boolean;
    message?: string;
    errors?: Record<string, string[]>;
  }>({
    isOpen: false,
    message: undefined,
    errors: undefined,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    const newErrors: { title?: string; content?: string; topic?: string } = {};
    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!formData.content.trim()) {
      newErrors.content = 'Content is required';
    }
    if (!formData.topic.trim()) {
      newErrors.topic = 'Topic is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      setLoading(true);
      await postsApi.createPost(formData);
      navigate('/');
    } catch (err: any) {
      console.error('Error creating post:', err);
      
      // Check if it's a validation error from the server
      if (err.response && err.response.data) {
        const serverError = err.response.data;
        setErrorModal({
          isOpen: true,
          message: serverError.message || 'An error occurred while creating the post',
          errors: serverError.errors || undefined,
        });
      } else {
        setErrorModal({
          isOpen: true,
          message: 'An unexpected error occurred while creating the post',
          errors: undefined,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: keyof CreatePostData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
    
    // Clear error when field changes
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

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

        {/* Form */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-black">
              Create New Post
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-black mb-2">
                  Title
                </label>
                <Input
                  id="title"
                  type="text"
                  value={formData.title}
                  onChange={(e) => handleChange('title', e.target.value)}
                  placeholder="Enter post title..."
                  className={`border-gray-300 focus:border-black focus:ring-black ${
                    errors.title ? 'border-red-500' : ''
                  }`}
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">{errors.title}</p>
                )}
              </div>

              {/* Topic */}
              <div>
                <label htmlFor="topic" className="block text-sm font-medium text-black mb-2">
                  Topic
                </label>
                <Input
                  id="topic"
                  type="text"
                  value={formData.topic}
                  onChange={(e) => handleChange('topic', e.target.value)}
                  placeholder="Enter post topic (e.g., Technology, Travel, Lifestyle)..."
                  className={`border-gray-300 focus:border-black focus:ring-black ${
                    errors.topic ? 'border-red-500' : ''
                  }`}
                />
                {errors.topic && (
                  <p className="mt-1 text-sm text-red-600">{errors.topic}</p>
                )}
              </div>

              {/* Content */}
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-black mb-2">
                  Content
                </label>
                <Textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) => handleChange('content', e.target.value)}
                  placeholder="Write your post content..."
                  rows={12}
                  className={`border-gray-300 focus:border-black focus:ring-black resize-none ${
                    errors.content ? 'border-red-500' : ''
                  }`}
                />
                {errors.content && (
                  <p className="mt-1 text-sm text-red-600">{errors.content}</p>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white hover:bg-gray-800 disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? 'Saving...' : 'Publish'}
                </Button>
                <Link to="/">
                  <Button
                    type="button"
                    variant="outline"
                    className="border-gray-300 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Error Modal */}
        <ErrorModal
          isOpen={errorModal.isOpen}
          onClose={() => setErrorModal({ isOpen: false, message: undefined, errors: undefined })}
          title="Error Creating Post"
          message={errorModal.message}
          errors={errorModal.errors}
        />
      </div>
    </div>
  );
}
