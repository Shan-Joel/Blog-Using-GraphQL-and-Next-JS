import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { GraphQLClient, gql } from 'graphql-request';
import BlogCard from '../components/BlogCard';

const graphcms = new GraphQLClient('https://api-ap-south-1.hygraph.com/v2/cl5qvfr3a0m9801tcg6ty6432/master');

const QUERY = gql`
   {
      posts {
         id
         title
         datePublished
         slug
         content {
            html
         }
         author {
            name
            avatar {
               url
            }
         }
         coverPhoto {
            publishedAt
            createdBy {
               id
            }
            url
         }
      }
   }
`;

export async function getStaticProps() {
   const { posts } = await graphcms.request(QUERY);
   return {
      props: {
         posts,
      },
      revalidate: 30,
   };
}

export default function Home({ posts }) {
   return (
      <div className={styles.container}>
         <Head>
            <title>Blog Sparkly</title>
            <meta name="description" content="Welcome to Blog Sparkly" />
            <link rel="icon" href="/favicon.ico" />
         </Head>

         <main className={styles.main}>
            {posts.map((post) => (
               <BlogCard title={post.title} author={post.author} coverPhoto={post.coverPhoto} key={post.id} datePublished={post.datePublished} slug={post.slug} />
            ))}
         </main>
      </div>
   );
}
