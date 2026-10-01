import { notFound } from 'next/navigation';
import { getPostById } from '@/lib/blogDb';
import PostForm from '@/components/admin/PostForm';

interface EditPostPageProps {
  params: { id: string };
}

export default async function EditPostPage({ params }: EditPostPageProps) {
  const id = Number(params.id);
  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8 max-w-5xl">
      <h1 className="text-xl sm:text-2xl font-semibold text-ink mb-6">Edit Post</h1>
      <PostForm
        initial={{
          id: post.id,
          title: post.title,
          slug: post.slug,
          category: post.category,
          author: post.author,
          excerpt: post.excerpt,
          contentMarkdown: post.contentMarkdown,
          featuredImage: post.featuredImage || '',
          metaTitle: post.metaTitle || '',
          metaDescription: post.metaDescription || '',
          faqs: post.faqs || [],
          published: post.published,
        }}
      />
    </div>
  );
}
