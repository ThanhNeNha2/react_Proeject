import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom/cjs/react-router-dom.min";
import "./ListUser.scss";
import { toast } from "react-toastify";

class ListUser extends React.Component {
  state = {
    listUser: [],
    editingUserId: null,
    editedUserData: {},
  };

  async componentDidMount() {
    let res = await axios.get("https://reqres.in/api/users?page=1");
    this.setState({
      listUser: res && res.data && res.data.data ? res.data.data : [],
    });
    console.log(">>> check res ", res.data.data);
  }

  handleOnClickUser = (user) => {
    this.props.history.push(`user/${user.id}`);
  };

  handleEditUser = (userId) => {
    this.setState({ editingUserId: userId });
  };

  handleCancelEdit = () => {
    this.setState({ editingUserId: null, editedUserData: {} });
  };

  handleSaveEdit = async (userId) => {
    const { editedUserData } = this.state;

    try {
      // Make an API call to update the user data
      await axios.put(`https://reqres.in/api/users/${userId}`, editedUserData);

      // Update the state with the edited user data
      this.setState((prevState) => ({
        listUser: prevState.listUser.map((user) =>
          user.id === userId ? { ...user, ...editedUserData } : user
        ),
        editingUserId: null,
        editedUserData: {},
      }));

      console.log("User updated successfully!");
      toast.success("Logged in successfully");
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  handleDeleteUser = async (userId) => {
    // Make an API call to delete the user
    try {
      await axios.delete(`https://reqres.in/api/users/${userId}`);
      // Update the state to remove the deleted user
      this.setState((prevState) => ({
        listUser: prevState.listUser.filter((user) => user.id !== userId),
      }));
      console.log("User deleted successfully!");

      toast.success("Delete data success!");
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  handleInputChange = (e, field) => {
    const { value } = e.target;
    this.setState((prevState) => ({
      editedUserData: {
        ...prevState.editedUserData,
        [field]: value,
      },
    }));
  };

  render() {
    const { listUser, editingUserId, editedUserData } = this.state;

    return (
      <div className="main">
        <div className="list-user-container">
          <div className="title">Fetch all list user</div>
        </div>
        <div className="list-user-content">
          {listUser &&
            listUser.length > 0 &&
            listUser.map((item, index) => (
              <div className="child" key={index}>
                {editingUserId === item.id ? (
                  <>
                    <input
                      type="text"
                      value={editedUserData.first_name || item.first_name}
                      onChange={(e) => this.handleInputChange(e, "first_name")}
                    />
                    <input
                      type="text"
                      value={editedUserData.last_name || item.last_name}
                      onChange={(e) => this.handleInputChange(e, "last_name")}
                    />
                    <button onClick={() => this.handleSaveEdit(item.id)}>
                      Save
                    </button>
                    <button onClick={this.handleCancelEdit}>Cancel</button>
                  </>
                ) : (
                  <>
                    <div className="Content_btn">
                      {item.id} - {item.first_name} + {item.last_name}
                      <button onClick={() => this.handleOnClickUser(item)}>
                        View Details
                      </button>
                      <button onClick={() => this.handleEditUser(item.id)}>
                        Edit
                      </button>
                      <button onClick={() => this.handleDeleteUser(item.id)}>
                        Delete
                      </button>
                    </div>
                  </>
                )}
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default withRouter(ListUser);
