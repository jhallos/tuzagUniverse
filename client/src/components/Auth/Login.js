import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { loginUser } from '../../actions/authActions'

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

class Login extends Component {
    constructor (props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    componentDidMount () {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/')
        }
    }
    UNSAFE_componentWillReceiveProps(nextProps) {
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
            password: this.state.password
        }
        this.props.loginUser(userData)
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
                        type="password"
                        label="Password"
                        className= {classes.textField}
                        value={this.state.password}
                        onChange={this.handleChange}
                        name="password"
                        helperText={errors.password ? errors.password : ''}
                        error={errors.password ? true : false }
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
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, { loginUser })(withRouter(withStyles(styles)(Login)))