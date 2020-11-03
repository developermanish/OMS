import React from "react";
import Dashboard from "../components/dashboard/dashboard";
import Head from "next/head";
// import Search from "../components/search/search";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";

const Home = () => (
  <>
    <div >
      <Head>
        <title>OMS</title>
      </Head>
      <Header />
    </div>
    <div >
      <Dashboard />
    </div>
    <Footer/>
  </>
);

export default Home;
