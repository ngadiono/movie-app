// Vendors
import type { ReactElement } from 'react';
import Head from 'next/head';

// Layouts
import Container from '@/layouts/landing/container/Container';
import { NextPageWithLayout } from '../_app';

// Components
import Detail from '@/page/movie/Detail';

const DetailPage: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Movie Detail</title>
      </Head>
      <Detail />
    </>
  );
};

DetailPage.getLayout = function getLayout(page: ReactElement) {
  return <Container>{page}</Container>;
};

export default DetailPage;
