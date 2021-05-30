import CardItem from '@src/components/CardItem';
import { Wrapper } from '@src/components/Wrapper';
import { PostType } from '@src/types';
import fs from 'fs';
import Link from 'next/link';

export default function Home({ posts }: { posts: PostType[] }) {
  return (
    <Wrapper>
      {posts !== null
        && posts.map((post) => (
          // @ts-ignore
          <Link key={post} href={`/blog/${post}`}>
            <a>
              <CardItem post={post} />
            </a>
          </Link>
        ))}
    </Wrapper>
  );
}

export const getStaticProps = async () => {
  const files = fs.readdirSync('src/posts');
  return {
    props: {
      posts: files.map((filename) => filename.replace('.md', '')),
    },
  };
};
