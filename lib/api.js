async function fetchAPI(query, { variables } = {}) {
  const res = await fetch(`https://staging.api.strivecommunity.org/graphql`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch API");
  }

  return json.data;
}

/* FAQs
  -----------------------------------------------*/

export async function getFAQs() {
  const data = await fetchAPI(`
        {
          frequentlyAskedQuestion {
              data {
                attributes {
                  questions {
                    id
                    question
                    answer
                  }
                }
              }
            }
        }
      `);

  return data?.frequentlyAskedQuestion?.data?.attributes;
}
