import { useState, useEffect } from 'react';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import SEO from '@/components/SEO';
import { client } from '@/lib/prismic';
import Prismic from 'prismic-javascript';
import PrismicDOM from 'prismic-dom';

import { Document } from 'prismic-javascript/types/documents'

interface IHomeProps {
  recommendedProducts: Document[];
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
                <Link href={`/catalog/product/${recommendedProduct.uid}`}>
                  <a>
                    {PrismicDOM.RichText.asText(recommendedProduct.data.title)}
                  </a>
                </Link>
                </li>
            )
          })
        }
      </ul>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps<IHomeProps> = async () => {
  const recommendedProducts = await client().query([
    Prismic.Predicates.at('document.type', 'product'),
  ]);


  return {
    props: {
      recommendedProducts: recommendedProducts.results,
    },
  };
}