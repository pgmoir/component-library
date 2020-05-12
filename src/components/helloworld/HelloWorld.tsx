import * as React from 'react';

export interface HelloWorldProps {
  userName: string;
  lang: string;
}

const HelloWorld = (props: HelloWorldProps) => <h1>Hi {props.userName} from React Typescript where we speak {props.lang}!</h1>;

export default HelloWorld;