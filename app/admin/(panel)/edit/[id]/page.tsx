import { notFound } from 'next/navigation';
import { getPostById, listAllPostsForAdmin } from '@/lib/blogDb';
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

  const allPosts = await listAllPostsForAdmin();

  return (
    <div>
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Edit post</h1>
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
          tags: post.tags,
          ogImage: post.ogImage || '',
          canonicalUrl: post.canonicalUrl || '',
          noindex: post.noindex,
          focusKeyword: post.focusKeyword,
          relatedSlugs: post.relatedSlugs,
          ctaCalculator: post.ctaCalculator,
          showToc: post.showToc,
          publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : '',
        }}
        otherPosts={allPosts.map((p) => ({ slug: p.slug, title: p.title }))}
      />
    </div>
  );
}
