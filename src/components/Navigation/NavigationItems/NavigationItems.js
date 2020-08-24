import React from 'react';
import NavigationItem from '../NavigationItem/NavigationItem';
import classes from './NavigationItems.css';

const navigationItems = () => (

    <ul className={classes.NavigationItems}>
        <NavigationItem link="/">HOME</NavigationItem>
        <NavigationItem link="/">ABOUT</NavigationItem>
        <NavigationItem link="/">CONTACT US</NavigationItem>
    </ul>
);

export default navigationItems;