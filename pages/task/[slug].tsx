import Head from "next/head";
import Link from "next/link";
import { getTaskBySlug, getAllTaskPaths } from "../../lib/api";
import markdownToHTML from "../../lib/markdownToHTML";
import styles from "../../styles/Home.module.css";
import markdownStyle from "../../styles/markdown.module.css";

type Props = {
  id: string;
  query?: string;
  title?: string;
  step?: {
    current: number;
    max: number;
  };
  nextPath: string;
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

        <div className="mt-16">
          <Link href={props.nextPath || "#"} as={props.nextPath || "#"}>
            <a>
              <button
                type="submit"
                className="h-[50px] w-[175px] bg-blue-500 hover:bg-blue-700 text-white px-2 rounded"
              >
                {false ? "Loader" : "次へ"}
              </button>
            </a>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Task;

type Params = {
  params: {
    slug: string;
  };
};

export async function getStaticPaths() {
  const tasks = getAllTaskPaths();
  console.log(tasks);
  return {
    paths: tasks,
    fallback: false,
  };
}

export async function getStaticProps({ params }: Params) {
  const task = getTaskBySlug(params.slug, ["id", "query", "title", "nextPath", "content"]);

  const htmlContent = await markdownToHTML(task.content);
  return {
    props: {
      id: task.id,
      query: task.query,
      title: task.title,
      nextPath: task.nextPath,
      content: htmlContent,
    },
  };
}
