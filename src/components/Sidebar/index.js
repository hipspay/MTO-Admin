import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import {
    AccountBalance,
    Person,
    House,
    Style,
    CardTravel,
    AmpStories,
} from '@material-ui/icons';

import './style.scss';

const menuItems = [
    {
        title: 'Home',
        link: '/home',
        icon: <House />,
    },
    {
        title: 'Merchant',
        link: '/merchants',
        icon: <Person />,
    },
    {
        title: 'Products',
        link: '/products',
        icon: <Style />,
    },
    {
        title: 'Orders',
        link: '/orders',
        icon: <CardTravel />,
    },
    {
        title: 'Disputes',
        link: '/disputes',
        icon: <AmpStories />,
    },
    {
        title: 'Agents',
        link: '/agents',
        icon: <AccountBalance />,
    },
];

const Sidebar = ({ title, open }) => (
    <div className={`app-sidebar ${open ? 'opened' : 'closed'}`}>
        <div className="logo">
            <span>{title}</span>
        </div>
        <div className="nav">
            {menuItems.map((menuItem, index) => (
                <NavLink
                    className="nav-link"
                    to={menuItem.link}
                    activeClassName="active"
                    key={index}
                >
                    {menuItem.icon}
                    <span>{menuItem.title}</span>
                </NavLink>
            ))}
        </div>
    </div>
);

Sidebar.propTypes = {
    title: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
};

Sidebar.defualtProps = {
    title: '',
    open: true,
};

export default Sidebar;
