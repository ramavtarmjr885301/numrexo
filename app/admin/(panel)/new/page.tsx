import PostForm from '@/components/admin/PostForm';
import { listAllPostsForAdmin } from '@/lib/blogDb';

export default async function NewPostPage() {
  const allPosts = await listAllPostsForAdmin();
  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">New post</h1>
      <PostForm otherPosts={allPosts.map((p) => ({ slug: p.slug, title: p.title }))} />
    </div>
  );
}
