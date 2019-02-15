import React, { Component } from "react";
import { connect } from "react-redux";
import { SideNav, Nav } from "react-sidenav";
import styled from "styled-components";

// This component was made from a guide: https://www.npmjs.com/package/react-sidenav

// Component Styling, imported from Containers.js
import {
  AppContainer as BaseAppContainer,
  ExampleNavigation as Navigation,
  Theme as ContainerTheme
} from "./Containers";

export default class SideNavBar extends Component {
  state = {
    selectedPath: ''
  }

  onItemSelection = (arg) => {
    this.setState({selectedPath:arg.path})
  }

  render() {
    return (
      <BaseAppContainer>
      <Navigation>
      <SideNav selectedPath={this.state.selectedPath} onItemSelection={this.onItemSelection} theme={ContainerTheme}>
        <Nav id={'1'}>1</Nav>
        <Nav id={'2'}>2</Nav>
      </SideNav>
      </ Navigation>
      </ BaseAppContainer>
    )
  }
}
