import {
    NavLink,
} from "react-router-dom";

import "./index.css"


export default function foo (props) {
    return(
        <NavLink {...props} activeClassName="activeClass"/>
    )
}