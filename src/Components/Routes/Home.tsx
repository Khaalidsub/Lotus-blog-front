import React from "react";
import { PostImageCard } from "../Widgets/Cards/PostImageCard";
import { PostCard } from "../Widgets/Cards/PostCard";
import { ImageCard } from "../Widgets/Cards/ImageCard";
import { PostUserInfo } from "../Widgets/PostUserInfo";
import { PostDescription } from "../Widgets/Cards/PostDescription";
import CategoryCard from "../Widgets/Cards/CategoryCard";
import { PaginationButtons } from "../Widgets/Buttons/PaginationButtons";
import {
  PostAction,
  CombinedReducer,
  UserAction,
  CategoryAction,
} from "../../store/interface";
import { fetchCollection } from "../../store";
import { RouteComponentProps, Link } from "react-router-dom";
import { connect } from "react-redux";
import { dataTypes } from "../../store/types";
import { motion } from "framer-motion";
import { containerVariants } from "../../themes/motion";
export interface AddPostProps extends RouteComponentProps {
  posts: PostAction[];
  fetchCollection: (url: string, dataTypes: dataTypes.post) => Promise<any>;
}
const Post = (props: { post: PostAction }): JSX.Element => {
  return (
    <PostImageCard post={props.post} info="Latest">
      <PostUserInfo user={props.post.user as UserAction} />
      <CategoryCard category={(props.post.category as CategoryAction).name} />
    </PostImageCard>
  );
};

const FeauturedPost = (props: { post: PostAction }): JSX.Element => {
  return (
    <Link
      className="hover:bg-negative cursor-pointer"
      to={`/blogs/posts/view_post/${props.post.id}`}
    >
      <PostCard
        subtitle={props.post.subtitle}
        title={props.post.title}
        image="https://images.unsplash.com/photo-1541250628459-d8f2f0157289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1350&q=80"
      >
        <CategoryCard category={(props.post.category as CategoryAction).name} />
      </PostCard>
    </Link>
  );
};
class _Home extends React.Component<AddPostProps> {
  componentDidMount() {
    this.props.fetchCollection("posts", dataTypes.post);
  }
  renderLatestList(): JSX.Element[] | JSX.Element | undefined {
    // console.log("checking posts:", this.props.posts);
    if (this.props.posts !== undefined) {
      this.props.posts.map((post) => {
        post.title = post.title.replace(/&nbsp;/gi, "");
        post.subtitle = post.subtitle.replace(/&nbsp;/gi, "");
        return post;
      });
      return this.props.posts.map((data) => <Post post={data} key={data.id} />);
    } else return <div></div>;
  }

  renderFeatured(): JSX.Element[] | JSX.Element {
    // console.log("checking posts:", this.props.posts);
    if (this.props.posts !== undefined) {
      this.props.posts.map((post) => {
        post.title = post.title.replace(/&nbsp;/gi, "");
        post.subtitle = post.subtitle.replace(/&nbsp;/gi, "");
        return post;
      });
      let index = 0;
      return this.props.posts.map((data, i) => {
        if (i < 3) return <FeauturedPost post={data} key={data.id} />;

        return <div></div>;
      }, index++);
    } else return <div></div>;
  }

  render() {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className=""
      >
        <div className="relative">
          <img
            className="object-cover h-64 lg:h-76 w-full"
            src="https://images.unsplash.com/photo-1541332246502-2e99eaa96cc1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt=""
          />
          <div className="w-full absolute top-0  flex justify-center">
            <PostDescription
              subtitle="    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi magnam quis totam consequatur magni doloremque unde numquam laborum expedita. Quis, maiores. Laudantium enim tempore maxime voluptates nihil, officia sunt exercitationem."
              title="Post title"
            >
              <CategoryCard category="programming" />
            </PostDescription>
          </div>

          <div className="w-full  absolute bottom-0 left-0 right-0">
            <div className=" flex flex-row justify-center">
              <ImageCard image="https://images.unsplash.com/photo-1541250628459-d8f2f0157289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1350&q=80" />
              <ImageCard image="https://images.unsplash.com/photo-1541250628459-d8f2f0157289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1350&q=80" />
              <ImageCard image="https://images.unsplash.com/photo-1541250628459-d8f2f0157289?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjQzMzEwfQ&auto=format&fit=crop&w=1350&q=80" />
            </div>
          </div>
        </div>
        <div className=" grid grid-cols-1 lg:grid-cols-2 mt-10 mb-10">
          <div className="mx-auto">
            {this.props.posts !== undefined && this.props.posts.length > 8 && (
              <PaginationButtons />
            )}

            {this.renderLatestList()}

            {this.props.posts !== undefined && this.props.posts.length > 8 && (
              <PaginationButtons />
            )}
          </div>
          <div className="mx-auto  ">
            <h4 className="text-3xl italic text-tertiary text-center mb-16 mt-10 lg:mt-0">
              Feautured Posts
            </h4>

            {this.renderFeatured()}
          </div>
        </div>
      </motion.div>
    );
  }
}

const mapStateToProps = (state: CombinedReducer) => ({
  posts: state.modelData.POST,
});
export default connect(mapStateToProps, { fetchCollection })(_Home);
