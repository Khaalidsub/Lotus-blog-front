import React from "react";

export interface CardProps {
  image: string;
  title: string;
  subtitle: string;
  info?: string;
}

export class PostImageCard extends React.Component<CardProps> {
  render() {
    return (
      <div className="max-w-sm  rounded lg:max-w-full lg:flex m-5">
        <div
          className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
          style={{ backgroundImage: `url(${this.props.image})` }}
        ></div>
        <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
          <h4 className="text-gray-700">{this.props.info}</h4>
          <div className="mb-8">
            <div className="text-gray-900 font-bold text-xl mb-2">
              {this.props.title}
            </div>
            <p className="text-gray-700 text-base">{this.props.subtitle}</p>
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}
