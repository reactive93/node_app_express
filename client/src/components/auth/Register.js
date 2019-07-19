import React, {Component,Fragment} from 'react';


class Register extends Component {

    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <Fragment>
                <h1 className='large text-primary'>Sign Up</h1>
                <p className='lead'>
                    <i className='fas fa-user' /> Create Your Account
                </p>
                <form className='form' onSubmit={e => onSubmit(e)}>
                    <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                    />
                    </div>
                    <div className='form-group'>
                    <input
                        type='email'
                        placeholder='Email Address'
                        name='email'
                        value={email}
                        onChange={e => onChange(e)}
                    />
                    <small className='form-text'>
                        This site uses Gravatar so if you want a profile image, use a
                        Gravatar email
                    </small>
                    </div>
                    <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={e => onChange(e)}
                    />
                    </div>
                    <div className='form-group'>
                    <input
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                    />
                    </div>
                    <input type='submit' className='btn btn-primary' value='Register' />
                </form>
                <p className='my-1'>
                    Already have an account? <Link to='/login'>Sign In</Link>
                </p>
            </Fragment>)
    }
}

export default Register;