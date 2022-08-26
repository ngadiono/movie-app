// Vendors
import type { ReactElement } from 'react';
import Head from 'next/head';

// Layouts
import Container from '@/layouts/landing/container/Container';
import { NextPageWithLayout } from './_app';

// Home
import Home from '@/page/home/Home';

const IndexPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Movie List</title>
      </Head>
      <Home />
    </>
  );
};

IndexPage.getLayout = function getLayout(page: ReactElement) {
  return <Container>{page}</Container>;
};

export default IndexPage;
