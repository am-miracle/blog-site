import { request, gql } from "graphql-request";


const graphqlAPI = 'https://api-eu-west-2.graphcms.com/v2/ckz4wy9za0gqg01xnc1289fmu/master';

export const getPosts = async ()=> {
    const query = gql`
        query MyQuery{
            postsConnection {
                edges {
                    node {
                        author {
                            bio
                            name
                            id
                            photo {
                                url
                            }
                        }
                        createdAt
                        slug
                        title
                        excerpt
                        featuredimage {
                            url
                        }
                        categories {
                        name
                        slug
                        }
                    }
                }
            }
        }
    `

    const result = await request(graphqlAPI,query);

    return result.postsConnection.edges;
}