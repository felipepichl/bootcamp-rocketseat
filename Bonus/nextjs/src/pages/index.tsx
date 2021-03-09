import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import SEO from '@/components/SEO';

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

  async function handleSum() {
    const { sum } = (await import('../lib/math')).default;

    alert(sum(3, 5));
  }

  return (
    <div>
      <SEO 
        title="DevCommerce - Your better E-Comerce"
        image="boost.png"
        shouldExcludeTitleSiffix      
      />

      <title>Products</title>
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

      <button onClick={handleSum}>Sum!</button>
    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/recommended`,
  );
  const recommendedProducts = await response.json(); 
  
  return {
    props: {
      recommendedProducts,
    },
  };
}