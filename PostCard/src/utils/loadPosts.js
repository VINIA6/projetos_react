export const loadPosts = async () =>{
    const postsResponse = fetch('https://jsonplaceholder.typicode.com/posts');
    const photosRespnse = fetch('https://jsonplaceholder.typicode.com/photos');

    const [posts, photos] = await Promise.all([postsResponse, photosRespnse]);

    const postsJson = await posts.json();
    const photosJson = await photos.json();

    const photosAndPosts = postsJson.map((post, index) => {
      return { ...post, cover: photosJson[index].url };
    })

    return photosAndPosts;
};