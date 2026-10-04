import PostForm from '@/components/admin/PostForm';
import { listAllPostsForAdmin } from '@/lib/blogDb';

export default async function NewPostPage() {
  const allPosts = await listAllPostsForAdmin();
  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-6xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-ink mb-6">New Post</h1>
      <PostForm otherPosts={allPosts.map((p) => ({ slug: p.slug, title: p.title }))} />
    </div>
  );
}
