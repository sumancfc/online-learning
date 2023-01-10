import Head from "next/head";

const HtmlHead = ({ title }) => (
  <Head>
    <meta name='description' content='Online Learning Platform' />
    <meta name='keywords' content='Online Learning Platform' />
    <meta name='author' content='Online Learning Platform' />
    <meta name='viewport' content='width=device-width, initial-scale=1.0' />
    <title>{title}</title>
  </Head>
);

export default HtmlHead;
