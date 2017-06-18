/**
 * Created by korman on 03.06.17.
 */

import Config from '../../Config';
import React from 'react';
import axios from 'axios';

export default class StoreDetailYourCoupons extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            shopperId: props.shopperId,
            items: [],
            count_pages: 1,
            status: 'Load...'
        };
    }

    componentDidMount(props) {
        const config = new Config();
        const consumerId = window.localStorage.getItem('user_id');

        axios.get(config.baseUrl + 'coupon/shopper-your-coupon/rest/' + this.state.shopperId + '/' + consumerId, {
            params: {
                method: 'LIST',
                page: 1,
                items_on_page: 5
            }
        }).then(response => {
            this.setState({
                items: response.data.items,
                count_pages: response.data.count_pages
            });
            this.setState({status: 'List empty'});
            console.log(response);
        }).catch(function(error){
            console.log(error);
        });
    }

    render(){
        if (this.state.items.length > 0) {
            return (
                <div className="zan-thumb-layout">
                    {
                        this.state.items.map((item, index) =>
                            <div key={index} className="zan-card zan-container-content">
                                <a href="coupon-detail.html">
                                    <div className="zan-container zan-red">
                                        <h4>{item.issued_coupon.coupon.title}</h4>
                                        <b>Days left: {item.daysLeft} </b>
                                        <em>{item.startTimeFormat} - {item.expiredTimeFormat}</em>
                                    </div>
                                </a>
                                <div className="zan-action-button">
                                    {/*<a href="#" className="show-dialog-add-coupon">*/}
                                    {/*<img src="images/zan-icon/coupon-add.png" alt="" width="28" height="28"/>*/}
                                    {/*</a>*/}
                                </div>
                            </div>
                        )
                    }
                </div>
            );
        } else {
            return (
                <div>{this.state.status}</div>
            );
        }
    }
}