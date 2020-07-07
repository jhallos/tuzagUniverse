import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { registerUser } from '../../actions/authActions'

const styles= {
    textField: {
        display: 'flex',
        flexDirection: 'column',
        margin: '1rem'
    },
    paperBlock: {
        /*minWidth: '400px' */
    },
    btnBlock: {
        textAlign: 'center',
        padding: '1rem'
    }
}

class Register extends Component {
    constructor (props) {
        super(props)
        this.state = {
            email: '',
            username: '',
            password: '',
            password2: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
            this.setState({ errors: nextProps.errors })
        }
    }
    handleChange (e) {
        this.setState({ [e.target.name]: e.target.value })
    }
    handleSubmit (e) {
        e.preventDefault()
        const userData = {
            email: this.state.email,
            username: this.state.username,
            password: this.state.password,
            password2: this.state.password2
        }
        this.props.registerUser(userData, this.props.history)
    }
    render() {
        const { classes } = this.props;
        const { errors } = this.state
        return(
            <Paper className= {classes.paperBlock}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        type="email"
                        label="Email"
                        className= {classes.textField}
                        value={this.state.email}
                        onChange={this.handleChange}
                        name="email"
                        helperText={errors.email ? errors.email : ''}
                        error={errors.email ? true : false }
                    />
                    <TextField 
                        type="text"
                        label="Username"
                        className= {classes.textField}
                        value={this.state.username}
                        onChange={this.handleChange}
                        name="username"
                        helperText={errors.username ? errors.username : ''}
                        error={errors.username ? true : false }
                    />
                    <TextField 
                        type="password"
                        label="Password"
                        className= {classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false }
                    />
                    <TextField 
                        type="password"
                        label="Repeat Password"
                        className= {classes.textField}
                        value={this.state.password2}
                        onChange={this.handleChange}
                        name="password2"
                        helperText={errors.password2 ? errors.password2 : ''}
                        error={errors.password2 ? true : false }
                    />
                    <div className={classes.btnBlock}>
                        <Button variant="outlined" type="submit">Submit</Button>
                    </div>
                </form>
            </Paper>
        )
    }
}

const mapStateToProps = (state) => ({
    errors: state.errors
})

export default connect(mapStateToProps, { registerUser })(withRouter(withStyles(styles)(Register)))