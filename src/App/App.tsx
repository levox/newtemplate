import * as React from "react";
import { connect } from "react-redux";
import { sayhello } from "actions/actionHome";
import * as styles from "./App.scss";

import { hot } from "react-hot-loader";

interface IAppProps {
  sayhello: (msg: string) => void;
  msg: string;
}
const App = (props: IAppProps) => {
  return (
    <main className={styles.main}>
      <button style={{ backgroundColor: "red" }} onClick={() => props.sayhello("das geht :D neee")}>
        {props.msg || "neeee mich"}
      </button>
    </main>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    msg: state.main.msg
  };
};

declare let module: object;

export default hot(module)(
  connect(
    mapStateToProps,
    { sayhello }
  )(App)
);
