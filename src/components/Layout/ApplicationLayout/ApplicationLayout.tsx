import type { ReactNode } from 'react';
import React from 'react';
// TO DO:
import NavBar from '@/components/NavBar';
import Footer from '@/components/Footer';

type IApplicationProps = {
  meta: ReactNode;
  children: ReactNode;
};

const ApplicationLayout = (props: IApplicationProps) => (
  <div className="w-full antialiased ">
    {props.meta}
    <div className="xl:max-w-screen-xl lg:max-w-screen-lg md:max-w-screen-md sm:max-w-screen-sm mb:max-w-screen-sm xl:mx-auto lg:mx-auto md:mx-auto sm:mx-auto mb:mx-3">
      <NavBar />
      <main className="content my-2">{props.children}</main>
      <Footer />
    </div>
  </div>
);

export default ApplicationLayout;
