import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import Head from 'next/head';
import marked from 'marked';
import React from 'react';
import styled from '@emotion/styled';
import { PostType } from '@src/types';

interface PostProps {
  htmlString: string;
  data: PostType;
}

const Title = styled.h1`
  font-size: 30px;
  text-transform: capitalize;
  margin-bottom: 0.3rem;
`;

const BlogContent = styled.div`
  font-size: 25px;
`;

const Ul = styled.ul`
  margin: 20px 0 20px 0;
`;

const Tag = styled.li`
  font-size: 20px;
`;

const BlogFlex = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 100vw;
  width: 800px;
  justify-content: center;
  align-items: center;
`;

const Post: React.FC<PostProps> = ({ htmlString, data }) => {
  return (
    <BlogFlex>
      <Head>
        <title>{data.title}</title>
      </Head>
      <Title>{data.title}</Title>
      <Title>{data.date}</Title>
      <Title>
        {data.tags
          && data.tags.map((t) => (
            <Ul>
              <Tag>{t}</Tag>
            </Ul>
          ))}
      </Title>

      <BlogContent
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: htmlString }}
      />
    </BlogFlex>
  );
};

export const getStaticPaths = async () => {
  const files = fs.readdirSync('src/posts');
  const paths = files.map((filename) => ({
    params: {
      post: filename.replace('.md', ''),
    },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({
  params: { post },
}: {
  params: { post: string };
}) => {
  const markdownWithFrontmatter = fs
    .readFileSync(path.join('src/posts', `${post}.md`))
    .toString();

  const parsedMarkdown = matter(markdownWithFrontmatter);

  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Post;
