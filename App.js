import React, { useState, useEffect } from "react";
import { Select, Dropdown, Menu } from "antd";
import FacebookLogin from "react-facebook-login";
import axios from "axios";


function App() {
  const [ids, setIds] = useState([]);
  const [matchedPosts, setMatchedPosts] = useState([]);
  const [userData, setUserData] = useState();

  console.log(userData)

  const items = ["Restaurant", "Beauty", "Fashion"];

  const componentClicked = () => {
    console.log("Facebook button clicked");
  };

  const responseFacebook = (response) => {
    setUserData(response);
    console.log("userData: ", response);
    axios
      .post("http://localhost:3000/api/facebook", {
        accessToken: response.accessToken,
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  };

  const handleMenuClick = async (e) => {
   const data = await axios.post("http://localhost:3000/api/posts", {
      data: e
    }, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    // console.log(data)
    let idArray = [];
    let dataArray = []
    data.data.map(item => {
      !idArray.includes(item.id) && dataArray.push(item);
      idArray.push(item.id)
    })
    setMatchedPosts(dataArray)
  };

  return (
    <div className="App">
         <Menu mode="horizontal"  theme='dark'>
       <Menu.Item>
        <h2>MOVIEBANK</h2>
        
        </Menu.Item>
        {/* <SubMenu title={<span>Blogs</span>}>
          <MenuItemGroup title="Item 1">
            <Menu.Item key="setting:1">Option 1</Menu.Item>
            <Menu.Item key="setting:2">Option 2</Menu.Item>
          </MenuItemGroup>
          <MenuItemGroup title="Item 2">
            <Menu.Item key="setting:3">Option 3</Menu.Item>
            <Menu.Item key="setting:4">Option 4</Menu.Item>
          </MenuItemGroup>
        </SubMenu> */}
        {/* <Menu.Item key="alipay">
          <a href="">Contact Us</a>
        </Menu.Item> */}
      </Menu>
      {!userData ? (
        <div class="fb-login-box">
            <h1>Login With Facebook</h1>
        
        <FacebookLogin
          appId="510971874509018"
          autoLoad={true}
          fields={
            "name,email, picture,last_name,first_name,gender,friends,birthday,likes,posts"
          }
          onClick={componentClicked}
          callback={responseFacebook}
        />
          </div>
      ) :
      (
        <div className="influencer-recommend">
          <h1 className="heading">Influencer Recommedation</h1>
        
        <Select className="influencer-dropdown"  onChange={handleMenuClick} size="large" placeholder = "Select Your Influencer">
        {items.map((item) => (
          <Select.Option key={item}>{item}</Select.Option>
        ))}
      </Select>
        {/* <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={(e) => e.preventDefault()}>
            {selectedItem} ▼
          </a>
        </Dropdown> */}
        {matchedPosts.length > 0 && (
          <div>
            <h2>Matched Posts:</h2>
            <ul>
            {console.log("post", matchedPosts, ids)}

              {matchedPosts.map((post) => (
                <li key={post.id}>{post.name}</li>
              ))}
            </ul>
          </div>
        )}
        </div>
      )}
          

    </div>
  );
}

export default App;





















