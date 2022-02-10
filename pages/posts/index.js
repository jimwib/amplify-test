import Link from "next/link";
import { getFAQs } from "../../lib/api";
export default function Page({ data }) {
  return (
    <>
      <div className="app-grid wrapper">Post listings</div>
      {data.questions.map((q) => (
        <div key={q.id}>
          <Link href={`/posts/${q.id}`}>
            <a>{q.question}</a>
          </Link>
        </div>
      ))}
    </>
  );
}

export async function getStaticProps() {
  const data = (await getFAQs()) || {};

  return {
    props: { data },
    revalidate: 5,
  };
}
