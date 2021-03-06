
import React from 'react';
import ReactDOM from 'react-dom';
import BodyCoupon from './components/coupon/BodyCoupon';
import BodyStore from './components/store/BodyStore';
import BodyMessage from './components/message/BodyMessage';

import Profile from './components/user/Profile';
import Login from './components/user/Login';
import LoginWechat from './components/user/LoginWechat';
import CouponDetail from './components/coupon/CouponDetail';
import StoreDetail from './components/store/StoreDetail';
import CouponFriendDetail from './components/coupon/CouponFriendDetail';
import CouponScanDetail from './components/coupon/CouponScanDetail';
import CouponMessageDetail from './components/coupon/CouponMessageDetail';

import StoreCouponDetail from './components/store/StoreCouponDetail';

import { HashRouter,Route, hashHistory } from 'react-router-dom'

export default class Index extends React.Component{
    constructor(){
        super();

    }

    render(){


        return (
            <HashRouter history={hashHistory}>
                <div>
                    <Route exact path="/" component={BodyCoupon} />
                    <Route exact path="/coupon/friend/list" component={BodyCoupon} />
                    <Route exact path="/coupon/:id" component={CouponDetail} />
                    <Route exact path="/coupon/scan/:source_type/:id" component={CouponScanDetail} />
                    <Route exact path="/coupon/message/detail/:id" component={CouponMessageDetail} />

                    {/*<Route exact path="/friend/coupon/:id" component={CouponFriendDetail} />*/}
                    <Route exact path="/friend/coupon/:id/:issuedCouponId/:ownerUserId" component={CouponFriendDetail} />

                    <Route exact path="/stores" component={BodyStore} />
                    <Route exact path="/store/:id" component={StoreDetail} />
                    <Route exact path="/store/all-coupons/:id" component={StoreDetail} />
                    <Route exact path="/store/your-coupons/:id" component={StoreDetail} />
                    <Route exact path="/store/coupon/:id" component={StoreCouponDetail} />

                    <Route exact path="/profile" component={Profile} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/login-wechat" component={LoginWechat} />

                    <Route exact path="/messages" component={BodyMessage} />

                </div>
            </HashRouter>
        )
    }
}
ReactDOM.render(<Index/>,document.getElementById('page-transitions'));