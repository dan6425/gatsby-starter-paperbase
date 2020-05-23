import React from 'react'
import PropTypes from 'prop-types'
import Layout from 'components/Layout'
import OrderContent1 from 'components/OrderContent'

function OrderPage({ location }) {
	const pageTitle = location ? location.pathname.replace(/\//g, '') : ''
	return (
		<Layout location={location} title={pageTitle}>
			<OrderContent1 />
		</Layout>
	)
}
OrderPage.propTypes = {
	location: PropTypes.object,
}
export default OrderPage
