import paste from "./assets/images/icon-copy.svg";
import { useState } from "react";
import { useEffect } from "react";
import arrow from "./assets/images/icon-arrow-right.svg";

function App() {
  const [error, setError] = useState(false);
  const [password, setPassword] = useState("34@#GSdv");
  const [inputvalue, setInputvalue] = useState<any>(0);
  const [uppercase, setUppercase] = useState<any>(true);
  const [lowercase, setLowercase] = useState<any>(true);
  const [number, setNumber] = useState<any>(false);
  const [symbol, setSymbol] = useState<any>(false);
  const [state, setState] = useState<any>(undefined);
  const [color, setColor] = useState<any>("");
  const [obj, setObj] = useState({
    one: true,
    two: true,
    three: false,
    four: false,
  });

  function  copy() {
    // Get the text field
    let copyText = password;
  
    window.prompt("Copy to clipboard: Ctrl+C, Enter", copyText);

  }
  function generatePass(pLength: any) {
    let keyListAlpha = "abcdefghijklmnopqrstuvwxyz",
      keyListUpers = "QWERTYUIOPASDFGHJKLZXCVBNM",
      keyListInt = "123456789",
      keyListSpec = "!@#_",
      password = "";
      let len;
      if(state === 1){
        len = Math.floor(pLength + 1);
      } else if(state === 2) {
        len = Math.floor(pLength/2 + 1);
      } else if(state === 3) {
         len = Math.floor(pLength/3 + 1);
      } else if (state === 4) {
        len = Math.floor(pLength/4 + 1);

      }
  



    for (let i = 0; i < len; i++) {
      if (lowercase) {
       if(password.length != pLength) {
        password += keyListAlpha.charAt(
          Math.floor(Math.random() * keyListAlpha.length)
        )
       }
      }
       ;
      if (number) {
       if(password.length != pLength) {
        password += keyListInt.charAt(
          Math.floor(Math.random() * keyListInt.length)
        );
       } 
      }
       
      if (uppercase) {
        if(password.length != pLength) {
          password += keyListUpers.charAt(
            Math.floor(Math.random() * keyListUpers.length)
          );
        }
       
      }
     

        if (symbol) {
          if(password.length != pLength) {
            password += keyListSpec.charAt(
              Math.floor(Math.random() * keyListSpec.length)
            );
          }
         
        }
           
    
    }

  

   
 
    password = password
      .split("")
      .sort(function () {
        return 0.5 - Math.random();
      })
      .join("");

    return password;
  }

  function handleClick() {
    setPassword(generatePass(inputvalue));
  }
  useEffect(() => {
    setState(Object.values(obj).filter((item) => item === true).length);

    let num = Object.values(obj).filter((item) => item === true).length;
    if (inputvalue >= 3) {
      setError(false);
    }
    if (inputvalue < 6) {
      setState(1);
    }
  }, [obj, inputvalue]);

  useEffect(() => {
    if (state === 1) {
      setColor("rgb(246, 74, 74)");
    }
    if (state === 2) {
      setColor("rgb(251, 124, 88)");
    }
    if (state === 3) {
      setColor("rgb(248,205,101)");
    }

    if (state === 4) {
      setColor("rgb(164, 255, 175)");
    }
  }, [uppercase, lowercase, number, symbol, state]);

  return (
    <div className="App">
      <div className="box">
        <div className="header">
          {" "}
          <h1>Password Generator</h1>{" "}
        </div>
        <div className="inp">
          <div className="display">
            <p className="password">{password}</p>{" "}
            <img onClick={() => {
              copy();
            }} className="pasimg" src={paste} />{" "}
          </div>
        </div>
        <div className="functionality">
          <div className="range">
            <div className="lables">
              {" "}
              <label className="chartxt">Character Length</label>{" "}
              <label className="charnum">{inputvalue}</label>{" "}
            </div>
            <div className="range-inp">
              <input
                style={{ color: color }}
                value={inputvalue}
                onChange={(e) => {
                  setInputvalue(e.target.value);
                }}
                min="0"
                max="20"
                type="range"
              />
              {error ? (
                <p style={{ color: "red", fontSize: "10px" }}>
                  Password should contain at least 2 symbols
                </p>
              ) : null}
            </div>
          </div>
          <div className="ticks">
            <div className="tick">
              <div className="tickbox">
                <input
                  type="checkbox"
                  checked={uppercase}
                  onChange={(e) => {
                    setUppercase(e.target.checked);
                    setObj({
                      one: e.target.checked,
                      two: lowercase,
                      three: number,
                      four: symbol,
                    });
                  }}
                />
                <label>Include Uppercase Letters</label>{" "}
              </div>
              <div className="tickbox">
                {" "}
                <input
                  type="checkbox"
                  checked={lowercase}
                  onChange={(e) => {
                    setLowercase(e.target.checked);
                    setObj({
                      one: uppercase,
                      two: e.target.checked,
                      three: number,
                      four: symbol,
                    });
                  }}
                />
                <label>Include Lowercase Letters</label>{" "}
              </div>
              <div className="tickbox">
                {" "}
                <input
                  type="checkbox"
                  checked={number}
                  onChange={(e) => {
                    setNumber(e.target.checked);
                    setObj({
                      one: uppercase,
                      two: lowercase,
                      three: e.target.checked,
                      four: symbol,
                    });
                  }}
                />
                <label>Include Numbers</label>{" "}
              </div>
              <div className="tickbox">
                {" "}
                <input
                  type="checkbox"
                  checked={symbol}
                  onChange={(e) => {
                    setSymbol(e.target.checked);
                    setObj({
                      one: uppercase,
                      two: lowercase,
                      three: number,
                      four: e.target.checked,
                    });
                  }}
                />
                <label>Include Symbols</label>{" "}
              </div>
            </div>
          </div>
          <div className="strength">
            <div className="strbox">
              <div className="p">
                <p>Strength </p>
              </div>
              <div className="strboxes">
                <div className="tx">
                  <p>
                    {state === 1 ? "Too Weak" : " "}
                    {state === 2 ? "Weak" : " "}
                    {state === 3 ? "Medium" : " "}
                    {state === 4 ? "Strong" : " "}
                  </p>{" "}
                </div>
                <div className="divs">
                  <div className="disbox">
                    {state > 0 ? (
                      <div
                        style={{ backgroundColor: color }}
                        className="element"
                      >
                        {" "}
                      </div>
                    ) : null}
                  </div>
                  <div className="disbox">
                    {state > 1 ? (
                      <div
                        style={{ backgroundColor: color }}
                        className="element"
                      >
                        {" "}
                      </div>
                    ) : null}
                  </div>
                  <div className="disbox">
                    {state > 2 ? (
                      <div
                        style={{ backgroundColor: color }}
                        className="element"
                      >
                        {" "}
                      </div>
                    ) : null}
                  </div>
                  <div className="disbox">
                    {state > 3 ? (
                      <div
                        style={{ backgroundColor: color }}
                        className="element"
                      >
                        {" "}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="btn">
            <button
              onClick={() => {
                if (inputvalue >= 3) {
                  handleClick();
                } else {
                  setError(true);
                }
              }}
            >
              Generate <img src={arrow} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
