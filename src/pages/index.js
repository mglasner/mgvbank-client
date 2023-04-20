import Head from "next/head";
import Layout from "../../components/layout";
import Card from "../../components/card";
import Image from "next/image";

export default function Home() {
  return (
    <Layout>
      <Head>
        <title>mgv bank home page</title>
      </Head>
      <Card
        header="BadBank Landing Module"
        title="Welcome to the bank"
        text="You can move around using the navigation bar."
        body={
          <Image
            src="/images/bank.svg"
            height={60}
            width={60}
            alt="bank logo"
          />
        }
      />
    </Layout>
  );
}
