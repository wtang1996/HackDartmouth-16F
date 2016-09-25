
const ResultReducer = (state = { result: [] }, action) => {
  switch (action.type) {
    case 'RESULT':
      return { ...state, result: action.result };
    default:
      return state;
  }
};

export default ResultReducer;
