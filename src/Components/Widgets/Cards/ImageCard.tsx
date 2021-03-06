import React from "react";

export interface CardProps {
  image: string;
  function: Function;
}

export class ImageCard extends React.Component<CardProps> {
  state = {
    date: Date(),
  };

  render() {
    return (
      <div
        onClick={() => this.props.function()}
        className="rounded-lg shadow-lg m-4 cursor-pointer"
      >
        <div className="md:flex-shrink-0 ">
          <img
            className="h-16 w-16 lg:h-32 lg:w-32 rounded"
            src={this.props.image}
            alt="post"
          />
        </div>
      </div>
    );
  }
}
