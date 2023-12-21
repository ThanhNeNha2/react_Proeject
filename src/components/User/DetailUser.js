import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import axios from "axios";
import "./DetailUser.scss";
class DetailUser extends React.Component {
  state = { user: {} };
  async componentDidMount() {
    if (this.props.match.params && this.props.match) {
      let id = this.props.match.params.id;
      let res = await axios.get(`https://reqres.in/api/users/${id}`);
      this.setState({
        user: res && res.data && res.data.data ? res.data.data : {},
      });
    }
  }
  render() {
    let { user } = this.state;
    let checkempty = Object.keys(user).length === 0;

    return (
      <>
      <div className="backrou">

        <div className="title">Thành viên thứ  {this.props.match.params.id}</div>
        <br></br>
        {checkempty === false && (
          <div className="main-user">
            <div className="main-user_name">
              {" "}
              Name {user.first_name} - {user.last_name}
            </div>
            <div className="main-user_email"> Email {user.email}</div>
            <div className="main-user_img">
              {" "}
              <img src={user.avatar} />
            </div>
          </div>
        )}
        </div>
      </>
    );
  }
}
export default withRouter(DetailUser);
