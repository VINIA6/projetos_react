import './App.css';
import {Component} from 'react';
import {loadPosts} from './utils/loadPosts'
import {Posts} from './components/Posts';
class App extends Component {
  state = {
    posts: [],
  };

  async componentDidMount() {
    const photosAndPosts = await loadPosts();
    this.setState({ posts: photosAndPosts });
  };

  render() {
    const {posts} = this.state;

    return (
      <section className='container'>
        <Posts posts={posts} />
      </section>
    );
  }
}

export default App;
