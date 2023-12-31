import Head from 'next/head';
import React from 'react'

type IApplicationConfigProps = {
  title: string;
  description: string;
  canonical?: string;
};

const ApplicationConfig = (props: IApplicationConfigProps) => {
  return (
      <Head>
        <meta charSet="UTF-8" key="charset" />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1"
          key="viewport"
        />
      </Head>

  );
};

export default ApplicationConfig;
