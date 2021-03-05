import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import { Title } from '../styles/pages/Home'

interface IProducts {
  id: string;
  title: string;
}

interface IHomeProps {
  recommendedProducts: IProducts[];
}

export default function Home({ recommendedProducts }: IHomeProps) {
  /** 
  const [recommendedProducts, setRecommendedProducts] = useState<IProducts[]>([]);

  useEffect(() => {
    fetch('http://localhost:3333/recommended').then(response => {
      response.json().then(data => {
        setRecommendedProducts(data);
      })
    })
  }, [])
  */
  return (
    <div>
      <Title>Products</Title>
      <ul>
        {
          recommendedProducts.map(recommendedProduct => {
            return (
              <li key={recommendedProduct.id}>
                {recommendedProduct.title}
              </li>
            )
          })
        }
      </ul>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch('http://localhost:3333/recommended');
  const recommendedProducts = await response.json(); 
  
  return {
    props: {
      recommendedProducts,
    },
  };
}