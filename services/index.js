import { request, gql } from "graphql-request";


const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

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
};

// Getting the recent posts

export const getRecentPost = async () => {
    const query = gql`
        query GetPostDetails() {
            posts(orderBy: createdAt_ASC, last: 3) {
                title
                featuredimage {
                  url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI,query);

    return result.posts;
}

// don't display the current article but display other article that display some the categories we want to get

export const getSimilarPosts = async (categories, slug) => {
    const query = gql`
        query GetPostDetails($slug: String!, $categories: [String!]) {
            posts(
                where: {slug_not: $slug, AND: {categories_some: { slug_in: $categories}}}
                last: 3
            ){
                title
                featuredimage {
                  url
                }
                createdAt
                slug
            }
        }
    `
    const result = await request(graphqlAPI, query, { categories, slug });

    return result.posts;
}

// getting the categories_some

export const getCategories = async () => {
    const query = gql`
        query GetCategories {
            categories {
                name
                slug
            }
        }
    `
    const result = await request(graphqlAPI,query);

    return result.categories;
}

// getting specific article

export const getPostDetails = async (slug)=> {
    const query = gql`
        query GetPostDetails($slug: String!) {
            post(where: {slug: $slug }){
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
                content {
                    raw
                }

            }
        }
    `

    const result = await request(graphqlAPI, query, { slug });

    return result.post;
};