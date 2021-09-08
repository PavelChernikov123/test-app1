import React    from 'react'
import { Link } from 'react-router-dom'

const TabItem = ({ name, onClick, active }) => {
    let classNames = 'list-group-item'
    if(active)  classNames += ' active'

    return (
        <li className ={ classNames } key ={ name } >
            <Link 
                    to      = { `/${name}` } 
                    onClick = { onClick } > 
                { name } 
            </Link>
        </li>
    )
}

export default TabItem