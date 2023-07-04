import './styles.css';
import {Component} from 'react';
import {loadPosts} from '../../utils/loadPosts'
import {Posts} from '../../components/Posts';
import { Button } from '../../components/Button';

export class Home extends Component {

  state = {
    posts: [],
    allPosts:[],
    page:0,
    postsPerPage:2,
  };

  async componentDidMount() {

    const {page,postsPerPage} = this.state;
    const photosAndPosts = await loadPosts();

    this.setState({ 
      posts: photosAndPosts.slice(page,postsPerPage),
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
    posts.push( ... nextPosts);
    this.setState({posts, page:nextPage});
  }

  render() {
    const {posts, page, postsPerPage, allPosts} = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;
    return (
      <section className='container'>
        <Posts posts={posts} />
        <div className="button-container">
          <Button
            disabled = {noMorePosts} 
            text = {"Load more posts"}
            onClick = {this.loadMorePosts}
          />
        </div>
      </section>
    );
  }
}

