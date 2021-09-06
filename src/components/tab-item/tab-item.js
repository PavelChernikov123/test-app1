import React    from 'react'
import { Link } from 'react-router-dom'

const TabItem = ({name, onClick}) => {
    
    let classNames = 'list-group-item'
    if(document.URL.indexOf(name)> -1 )  classNames += ' active'

    return (
        <li className={classNames} key={name} >
            <Link to={`/${name}`} key={name} onClick={onClick}> {name} </Link>
        </li>
    )
}

export default TabItem