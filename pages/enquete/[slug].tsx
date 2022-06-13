import Head from "next/head";
import Link from "next/link";
import { getAllEnquetePaths, getEnqueteBySlug } from "../../lib/api";
import markdownToHTML from "../../lib/markdownToHTML";
import styles from "../../styles/Home.module.css";
import markdownStyle from "../../styles/markdown.module.css";

type Props = {
  title: string;
  slug: string;
  url: string;
  content: string;
};

const Enquete = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>props.title</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>{props.title}</h1>
        <div className={markdownStyle["markdown"]} dangerouslySetInnerHTML={{ __html: props.content }} />
        <div className="mt-16">
          <Link href={props.nextPath || "#"} as={props.nextPath || "#"}>
            <a>
              <button
                type="submit"
                className="h-[50px] w-[175px] bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
              >
                {false ? "Loader" : "タスクを開始する"}
              </button>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Enquete;

export async function getStaticPaths() {
  const paths = getAllEnquetePaths();
  return {
    paths: paths,
    fallback: false,
  };
}

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticProps({ params }: Params) {
  const enquete = getEnqueteBySlug(params.slug, ["slug", "title", "url", "nextPath", "content"]);

  const htmlContent = await markdownToHTML(enquete.content);
  return {
    props: {
      slug: enquete.slug,
      title: enquete.title,
      url: enquete.url,
      nextPath: enquete.nextPath,
      content: htmlContent,
    },
  };
}
