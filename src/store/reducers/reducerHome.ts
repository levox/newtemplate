import { SAY_HELLO } from "../actions/actionHome";

export interface IMainState {
  isLoading: boolean;
  hasErrored: boolean;
  msg: string;
}

const initState: IMainState = {
  isLoading: false,
  hasErrored: false,
  msg: ""
};

export function main(state = initState, action) {
  switch (action.type) {
    case SAY_HELLO: {
      return Object.assign({}, state, {
        msg: "Hello " + action.msg
      });
    }

    default:
      return state;
  }
}
