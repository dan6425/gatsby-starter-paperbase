import React from 'react'
import PropTypes from 'prop-types'
import LoginContent from 'components/LoginContent'

function LoginPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		
			<LoginContent location={location} title={pageTitle} />
		
	)
}
LoginPage.propTypes = {
	location: PropTypes.object,
}
export default LoginPage
