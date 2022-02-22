import React from 'react';
import {
    Route, Switch, withRouter, Redirect,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import PublicRoute from 'routes/PublicRoute';

import Home from 'containers/Home';
import NotFound from 'containers/NotFound';
import MerchantPage from './containers/Merchant';
import MerchantDetailPage from './containers/MerchantDetail';
import ProfilePage from './containers/Profile';
import ProductsPage from './containers/Products';
import DisputesPage from './containers/Disputes';
import ProductDetailPage from './containers/ProductDetail';
import OrdersPage from './containers/Orders';
import OrderDetailPage from './containers/OrderDetail';

import AgentsPage from './containers/Agents';

import DisputeDetailPage from './containers/DisputeDetail';

const App = (props) => (
    <SnackbarProvider maxSnack={3}>
        <Switch>
            <Route exact path="/">
                <Redirect to="/home" />
            </Route>

            <PublicRoute exact path="/home" component={Home} props={props} />

            <PublicRoute
                exact
                path="/merchants"
                component={MerchantPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/merchants/:id"
                component={MerchantDetailPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/products"
                component={ProductsPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/products/:id"
                component={ProductDetailPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/orders"
                component={OrdersPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/orders/:id"
                component={OrderDetailPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/disputes"
                component={DisputesPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/disputes/:id"
                component={DisputeDetailPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/agents"
                component={AgentsPage}
                props={props}
            />

            <PublicRoute
                exact
                path="/profile"
                component={ProfilePage}
                props={props}
            />

            <Route component={NotFound} />
        </Switch>
    </SnackbarProvider>
);

export default withRouter(App);
