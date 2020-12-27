import React, { Component } from "react";
import onClickOutside from "react-onclickoutside";
let e = require("./emoji.json");

class Emoji extends Component {
  state = {
    picker: false,
    emoji: null,
  };

  componentDidMount() {
    this.setState({
      emoji: this.getEmojis(),
    });
  }

  handleClickOutside = () => {
    this.setState({ picker: false });
  };

  render() {
    let { picker, emoji } = this.state;
    return (
      <label
        title="Add emoji"
        htmlFor="text"
        style={{ width: "43px", height: "44.5px", margin: 0 }}
      >
        {picker && emoji}
        <span
          className="smiley"
          onClick={() => this.setState({ picker: !picker })}
        ></span>
      </label>
    );
  }

  getEmojis = () => {
    let em = e.slice(0, 4022 / 6);
    return (
      <div className="box">
        <ul className="emoji-list" id="h">
          {em.map((_, key) => {
            let i = key > 0 ? key * 6 : key;
            return (
              <li key={Math.random()}>
                {e.slice(i, i + 6).map(({ char, name }, k) => {
                  return (
                    <span
                      title={name}
                      key={k}
                      onClick={() => this.props.onSelect(char)}
                    >
                      {char}
                    </span>
                  );
                })}
              </li>
            );
          })}
        </ul>
      </div>
    );
  };

  // paneDidMount = (node) => {
  //   if (node && !this.emojiRendered) {
  //     node.addEventListener("scroll", () => {
  //       window.requestAnimationFrame(() => {
  //         let ul = document.querySelector("#h").getBoundingClientRect().height;
  //         let { height } = node.getBoundingClientRect();
  //         if (height + node.scrollTop >= ul) {
  //           console.log(this.emojiRendered);
  //           this.setState(
  //             { from: this.state.to, to: this.state.to + 600 },
  //             () => this.setState({ picker: this.getEmojis() })
  //           );
  //         }
  //       });
  //     });
  //   }
  // };
}

Emoji.defaultProps = {
  onSelect: "",
};

export default onClickOutside(Emoji);
