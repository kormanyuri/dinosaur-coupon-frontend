/**
 * Created by korman on 03.06.17.
 */

import React from 'react';
import CouponList from './CouponList';
import PageLoader from '../parts/PageLoader';
import Header from '../parts/Header';
import Menu from '../parts/Menu';
import {Link} from 'react-router-dom';
import Bootstrap from 'bootstrap';
import SentCouponToFriendPopup from '../popup/SentCouponToFriendPopup';
import Config from '../Config';
import axios from 'axios';

export default class BodyCoupon extends React.Component {

    constructor(props){
        super(props);

        let tab = 'received';

        if (props.location.pathname == '/coupon/friend/list') {
            tab = 'friends';
        }

        if (props.location.pathname == '/') {
            tab = 'received';
        }

        if (props.location.pathname == '/coupon/coupons/list') {
            tab = 'coupons';
        }

        this.state = {
            tab: tab,
            user: null
        };

        console.log(this.state);
    }


    componentDidMount(props){
        const config = new Config();

        this.state.user = window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null;
        const matchUser = /\?user=([\w\W]+)/.exec(window.location.search);

        const user = matchUser ? JSON.parse(decodeURI(matchUser[1])) : null;


        if (this.state.user != null) {

            axios.post(config.baseUrl + 'coupon/consumer/rest/0', {
                socialId: this.state.user.unionid,
                socialDataProfile: this.state.user
            }).then(result => {

                window.localStorage.setItem('user_id', result.data.id);
                window.localStorage.setItem('user', JSON.stringify(this.state.user));

            }).catch(error => {
                console.log(error);
            });
        } else {

            console.log(this.state.user);

            window.location = config.buildAuthUrl();
            //get login url
            // axios.get(config.baseUrl + 'wechat/build-get-code-url').then(response => {
            //
            //
            //     this.setState({url: response.data.url});
            //     console.log(this.state);
            //     //window.location = response.data.url;
            //     const u = config.buildAuthUrl();
            //     console.log(u);
            //
            // }).catch(error => {
            //     console.log(error);
            // });
        }
    }

    render(){

        if (this.state.user) {
            return (
                <div>
                    <PageLoader/>
                    <Header/>
                    <SentCouponToFriendPopup/>

                    <div id="page-content" className="page-content fadeIn page-content show-containers">
                        <div id="page-content-scroll">
                            <div className="content">
                                <div className="home-tabs">
                                    <Link to={'/'}
                                          className={`activate-tab-1 ${this.state.tab == 'received' ? 'active-home-tab' : ''}`}>Received</Link>
                                    <Link to={'/coupon/coupons/list'}
                                          className={`activate-tab-2 ${this.state.tab == 'coupons' ? 'active-home-tab' : ''}`}>Coupons</Link>
                                    <Link to={'/coupon/friend/list'}
                                          className={`activate-tab-3 ${this.state.tab == 'friends' ? 'active-home-tab' : ''}`}>Friend's</Link>
                                    <div className="clear"></div>
                                </div>
                            </div>


                            <div className="content" id="tab-1">
                                <div className="zan-thumb-layout">
                                    <CouponList tab={this.state.tab}/>
                                </div>
                            </div>


                            <div className="footer footer-light"></div>

                        </div>
                    </div>

                    <Menu/>

                    <div className="background"></div>
                </div>
            );
        } else {
            return (
                <div></div>
            );
        }
    }
}

