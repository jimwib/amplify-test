import { useRouter } from "next/router";
import { posts } from "../../posts";
import { getFAQs } from "../../lib/api";

export default function Page(props) {
  const router = useRouter();
  const { slug } = router.query;
  return (
    <>
      <div className="app-grid wrapper">Post page: {slug} </div>
      <pre>{JSON.stringify(props)}</pre>
    </>
  );
}

export async function getStaticPaths() {
  const data = (await getFAQs()) || {};
  return {
    paths: data.questions.map((x) => `/posts/${x.id}`),
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const data = (await getFAQs()) || {};
  const { params } = context;
  const slug = params.slug;
  const post = data.questions.find((x) => x.id == slug);
  return {
    props: {
      post,
    },
    revalidate: 5,
  };
}
