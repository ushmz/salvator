import Head from "next/head";
import { getTaskByID } from "../../lib/api";
import markdownToHTML from "../../lib/markdownToHTML";
import styles from "../../styles/Home.module.css";
import markdownStyle from "../../styles/markdown.module.css";

type Props = {
  id: string;
  query?: string;
  title?: string;
  content: string;
};

const Task = (props: Props) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>タスク詳細</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1 className={styles.title}>タスク内容</h1>
        {props.title && (
          <div className={markdownStyle["markdown"]}>
            <h2>{props.title}</h2>
          </div>
        )}
        <div className={markdownStyle["markdown"]} dangerouslySetInnerHTML={{ __html: props.content }} />
      </main>
    </div>
  );
};

export default Task;

type Params = {
  params: {
    id: number;
  };
};

export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }, { params: { id: "3" } }],
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const task = getTaskByID(params.id, ["id", "query", "title", "content"]);

  const htmlContent = await markdownToHTML(task.content);
  return {
    props: {
      id: task.id,
      query: task.query,
      title: task.title,
      content: htmlContent,
    },
  };
}
