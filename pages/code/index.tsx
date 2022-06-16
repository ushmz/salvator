import { NextPage } from "next";

type Props = {
  code: string;
};

const Code: NextPage<Props> = (props) => {
  return (
    <div>
      <div>{props.code}</div>
    </div>
  );
};

export default Code;

export const getStaticProps = async () => {
  const code = "code";
  return {
    props: {
      code: code,
    },
  };
};
