import { Container, Stack } from '@/components/layout';
import { BlogHero } from '@/components/blog/BlogHero';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { PostList } from '@/components/blog/PostList';
import { getAllPosts } from '@/lib/content';
import { COPY } from '@/data';
import { pageMeta } from '@/lib/metadata';
import type { Metadata } from 'next';

export const metadata: Metadata = pageMeta({ title: 'Blog', description: COPY.blog.heroIntro, path: '/blog' });

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  return (
    <Container>
      <Stack>
        <BlogHero />
        {featured && <FeaturedPost post={featured} />}
        <PostList posts={rest} />
      </Stack>
    </Container>
  );
}
