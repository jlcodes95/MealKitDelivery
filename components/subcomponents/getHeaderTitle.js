import { getFocusedRouteNameFromRoute } from '@react-navigation/native'

function getHeaderTitle(route) {

  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Order'
  console.log(routeName)
  switch (routeName) {
    case 'Shop':
      return 'Shop'
    case 'Pickup':
      return 'Order Pickup'
    case 'MyOrders':
      return 'My Orders'
    case 'Account':
      return 'My Account'
  }
}

export default getHeaderTitle
