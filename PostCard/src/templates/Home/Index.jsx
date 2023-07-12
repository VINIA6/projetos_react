import "./styles.css";
import { useCallback, useEffect, useState } from "react";
import { loadPosts } from "../../utils/loadPosts";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(3);
  const [seacrhValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  // Operação ternária
  // if searchBalue for verdadeiro faça antes dos :, caso contrário faça após os :.
  const filteredPosts = !!seacrhValue ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(seacrhValue.toLowerCase());
  })
  : posts;

  const handleLoadPosts = useCallback( async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page,postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(()=>{
    handleLoadPosts(0,postsPerPage);
  },[handleLoadPosts, postsPerPage]);
  
  const loadMorePosts = () => {

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

  const hadleChange = (event) => {
    const { value } = event.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      {/* Caso tenha (!!) pesquisa faça aparecer o titulo*/}

      <div className="search-container">
        {!!seacrhValue && <h1>Search Value: {seacrhValue}</h1>}

        <TextInput seacrhValue={seacrhValue} hadleChange={hadleChange} />
      </div>

      {filteredPosts.length === 0 && (
        <h1 className="h1-busca">Não foi possível encontrar sua busca</h1>
      )}

      <Posts posts={filteredPosts} />

      <div className="button-container">
        {/* Caso não (!) tenha pesquisa faça aparecer o botão*/}
        {!seacrhValue && (
          <Button
            disabled={noMorePosts}
            text={"Load more posts"}
            onClick={loadMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// export class Home2 extends Component {

//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 3,
//     seacrhValue: '',
//   };

//   async componentDidMount() {

//     const { page, postsPerPage } = this.state;
//     const photosAndPosts = await loadPosts();

//     this.setState({
//       posts: photosAndPosts.slice(page, postsPerPage),
//       allPosts: photosAndPosts
//     });
//   };

//   loadMorePosts = () => {

//     const {
//       posts,
//       allPosts,
//       page,
//       postsPerPage
//     } = this.state;

//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   }

//   hadleChange = (event) => {
//     const { value } = event.target;
//     this.setState({ seacrhValue: value });
//   }

//   render() {

//   }
// }
