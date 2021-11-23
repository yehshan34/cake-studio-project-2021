import { Link } from "react-router-dom";
import "./SideBar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">關於 Sunny 工作坊</span>
        <img
          src="https://themegoods-cdn-pzbycso8wng.stackpathdns.com/grandblog/demo/wp-content/uploads/2015/11/aboutme.jpg"
          alt=""
        />
        <p>
            因緣際會下接觸到裱花的世界，從此為之著迷的裱花女子，決定開啟自己的裱花工作室，讓更多人有機會接觸裱花之美。
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">文章分類</span>
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <Link className="link" to="">
              學生作品
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="">
              活動消息
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="t">
              課程花絮
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="">
              好評回饋
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="">
              報章報導
            </Link>
          </li>
          <li className="sidebarListItem">
            <Link className="link" to="">
              近期規劃
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}