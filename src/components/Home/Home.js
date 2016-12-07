import React, { Component } from 'react';
import reactCSS from 'reactcss';
import fetch from 'whatwg-fetch';

const styles = reactCSS({
  'default': {
    main: {
      height: '100vh',
      width: '100vw',
      backgroundImage: 'url("./public/images/landing-bg.jpg")',
      backgroundSize: 'cover',
      fontSize: '18px',
      color: '#3b3b3b'
    },
    wrapper: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      position: 'relative',
      zIndex: '100',
      height: '80vh',
      width: '60%'
    },
    nav: { height: '60px' },
    logo: {

    },
    headline: {
      borderBottom: '1px solid lightgray',
      fontSize: '36px',
      paddingBottom: '20px',
      marginBottom: '20px'
    },
    subHeadline: {
      color: '#4D9DFA',
      paddingBottom: '20px',
      marginBottom: '20px'
    },
    cta: {
      paddingBottom: '20px'
    },
    form: {

    },
    email: { padding: '5px 10px' },
    submit: {
      padding: '7px 20px',
      backgroundColor: '#4D9DFA',
      color: 'white',
      border: 'none'
    },
    phones: {
      position: 'absolute',
      backgroundImage: 'url("./public/images/iphones-3.png")',
      backgroundSize: 'cover',
      width: '60vw',
      height: '90vh',
      right: '0',
      bottom: '0',
      zIndex: '0'
    }
  }
});

export default class Home extends Component {
  constructor() {
    super();
    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit() {
    fetch('/api/submitemail', {
      method: 'POST',
      body: JSON.stringify({
        email: this.state.email
      })
    }).then(() => this.setState({ submitted: true }))
  }

  render() {
    return (
      <div style={styles.main}>
        <div style={styles.nav} className="container">
          <img src="#" style={styles.logo} role="presentation" />
        </div>
        <div className="container">
          <div style={styles.wrapper}>
            <div style={styles.headline}>
              Rent the equipment you need for your project. Or, rent
              your own equipment out for extra money. Or both.
            </div>
            <div style={styles.subHeadline}>
              Imagine being able to create high end projects by renting top
              quality equipment for a small fee. Now imagine making extra money
              renting out your own equipment. That's us.
            </div>
            <div style={styles.cta}>
              Be notified when our app launches in your region
            </div>
            <form style={styles.form} id="myform" name="myform">
              <input style={styles.email} id="email" type="email" name="email" placeholder="Email"/>
              <input style={styles.submit} type="submit" onSubmit={this.onSubmit} value="Save" />
            </form>
          </div>
        </div>

        <div style={styles.phones}></div>
      </div>
    );
  }
}
