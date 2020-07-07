import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import Paper from '@material-ui/core/Paper'
import { withStyles } from '@material-ui/core/styles'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { sendMessage } from '../../actions/authActions'

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

class Message extends Component {
    constructor (props) {
        super(props)
        this.state = {
            tweet: '',
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
            tweet: this.state.tweet
        }
        this.props.sendMessage(userData)
    }
    render() {
        const { classes } = this.props;
        const { errors } = this.state
        return(
            <Paper className= {classes.paperBlock}>
                <form onSubmit={this.handleSubmit}>
                    <TextField 
                        type="tweet"
                        label="Message the Universe..."
                        className= {classes.textField}
                        value={this.state.tweet}
                        onChange={this.handleChange}
                        name="tweet"
                        helperText={errors.tweet ? errors.tweet : ''}
                        error={errors.tweet ? true : false }
                    />
                    <div className={classes.btnBlock}>
                        <Button variant="outlined" type="submit">Send</Button>
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

export default connect(mapStateToProps, { sendMessage })(withRouter(withStyles(styles)(Message)))