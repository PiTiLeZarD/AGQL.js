import { Environment, Network, RecordSource, Store } from "relay-runtime";

export const fetchGraphQL = async (query, variables) => {
    const BACKEND_GQL_API_URL = process.env.BACKEND_GQL_API_URL;

    // Fetch data from GitHub's GraphQL API:
    const response = await fetch(BACKEND_GQL_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify({
            query,
            variables,
        }),
    });

    // Get the response as JSON
    return await response.json();
};

async function fetchRelay(params, variables) {
    console.log(`fetching query ${params.name} with ${JSON.stringify(variables)}`);
    return fetchGraphQL(params.text, variables);
}

export default new Environment({
    network: Network.create(fetchRelay),
    store: new Store(new RecordSource()),
});
