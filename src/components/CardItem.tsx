import styled from '@emotion/styled';
import { Post } from '@src/types';
import React from 'react';

const Card = styled.div`
  padding: 1rem;
  width: 500px;
  max-width: 500px;
  .title {
    font-size: 25px;
    color: #000;
  }
`;

interface Props {
  post: Post;
}

const CardItem: React.FC<Props> = ({ post }) => {
  return (
    <Card>
      <h1 className="title">{post}</h1>
    </Card>
  );
};
export default CardItem;
