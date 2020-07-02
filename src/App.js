import React, { useState, useEffect, Fragment, createRef } from "react";

const styled = {
  container: {
    margin: "1em",
    width: "90%",
  },
  form: {
    margin: "2em 0em",
  },
  input: {
    width: "20%",
    padding: "2% 1%",
    margin: "0em 0.2em",
  },
};

function App() {
  const [state, setState] = useState({
    first: "",
    second: "",
    third: "",
    fourth: "",
  });
  let keysForInput = Object.keys(state);
  const inputRefs = [createRef(), createRef(), createRef(), createRef()];
  const changeIndex = (id, e) => {
    let { name, value } = e.target;
    if (value.length <= 4) {
      setState({ ...state, [name]: value });
      if (e.keyCode !== 8 && state[name].length === 3) {
        if (id < inputRefs.length - 1) {
          inputRefs[id + 1].focus();
        }
      }
      if (e.keyCode === 8 && !state[name].length) {
        if (id > 0) {
          inputRefs[id - 1].focus();
        }
      }
    } else {
      setState({
        ...state,
        [keysForInput[0]]: value.substring(0, 4),
        [keysForInput[1]]: value.substring(4, 8),
        [keysForInput[2]]: value.substring(8, 12),
        [keysForInput[3]]: value.substring(12, 16),
      });
    }
  };

  useEffect(() => {
    inputRefs[0].focus();
  }, []);

  return (
    <Fragment>
      <div style={styled.container}>
        <h4>Card Number*</h4>
        <form style={styled.form}>
          {keysForInput.map((v, i) => (
            <input
              key={i}
              style={styled.input}
              defaultValue={state[v]}
              name={v}
              ref={(r) => (inputRefs[i] = r)}
              onKeyUp={(e) => changeIndex(i, e)}
              // onPaste={(e) => divideIntoFourEach(e.target.value)}
              // maxLength="4"
            />
          ))}
        </form>
      </div>
    </Fragment>
  );
}

export default App;