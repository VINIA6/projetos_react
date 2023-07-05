import './styles.css';
import { Component } from 'react';
import { loadPosts } from '../../utils/loadPosts'
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';

export class Home extends Component {

  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 2,
    seacrhValue: '',
  };

  async componentDidMount() {

    const { page, postsPerPage } = this.state;
    const photosAndPosts = await loadPosts();

    this.setState({
      posts: photosAndPosts.slice(page, postsPerPage),
      allPosts: photosAndPosts
    });
  };

  loadMorePosts = () => {

    const {
      posts,
      allPosts,
      page,
      postsPerPage
    } = this.state;

    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  }

  hadleChange = (event) => {
    const { value } = event.target;
    this.setState({ seacrhValue: value });
  }

  render() {
    const { posts, page, postsPerPage, allPosts, seacrhValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    // Operação ternária
    // if searchBalue for verdadeiro faça antes dos :, caso contrário faça após os :.
    const filteredPosts = !!seacrhValue ?
      allPosts.filter(post => {
        return post.title.toLowerCase().includes(
          seacrhValue.toLowerCase()
        );
      })
      :
      posts;

    return (
      <section className='container'>
        {/* Caso tenha (!!) pesquisa faça aparecer o titulo*/}

        <div className="search-container">
          {!!seacrhValue && (
            <h1>Search Value: {seacrhValue}</h1>
          )}
          
          <TextInput
            seacrhValue={seacrhValue}
            hadleChange={this.hadleChange}
          />
        </div>

        {
          filteredPosts.length === 0 && (
            <h1 className='h1-busca'>Não foi possível encontrar sua busca</h1>
          )
        }

        <Posts posts={filteredPosts} />

        <div className="button-container">
          {/* Caso não (!) tenha pesquisa faça aparecer o botão*/}
          {!seacrhValue && (
            <Button
              disabled={noMorePosts}
              text={"Load more posts"}
              onClick={this.loadMorePosts}
            />
          )}

        </div>

      </section>
    );
  }
}

