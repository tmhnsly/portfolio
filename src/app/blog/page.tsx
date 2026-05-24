import { Page, Nav, Footer, Container, Stack } from '@/components/layout';
import { BlogHero } from '@/components/blog/BlogHero';
import { FeaturedPost } from '@/components/blog/FeaturedPost';
import { PostList } from '@/components/blog/PostList';
import { getAllPosts } from '@/lib/content';

export default function BlogPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;
  return (
    <Page discipline="blog">
      <Nav active="blog" />
      <Container>
        <Stack>
          <BlogHero count={posts.length} />
          {featured && <FeaturedPost post={featured} />}
          <PostList posts={rest} />
        </Stack>
      </Container>
      <Footer />
    </Page>
  );
}
