import PostForm from '@/components/admin/PostForm';

export default function NewPostPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-white mb-6">New Post</h1>
      <PostForm />
    </div>
  );
}
