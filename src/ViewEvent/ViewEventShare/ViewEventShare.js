import React, { Component} from 'react';
import './ViewEventShare.scss';
import copy from 'copy-to-clipboard';
import ReactGA from 'react-ga';
import { isMobileDevice } from '../../_utils/appUtils';

class ViewEventShare extends Component{
    state = {
        copyLinkText: 'Copy URL'
    }

   copyToClipboard = () => {
        copy(document.location)
        this.setState({
            copyLinkText: 'Copied!'
        })
        ReactGA.event({
            category: 'View Event',
            action: 'Copied URL'
        });
    };

    render() {
        let subText = 'Check out my upcoming event';

        if(this.props.event){
            subText += `: ${this.props.event.name}`;
        }
    
        if(this.props.event && this.props.event.location && this.props.event.location.name){
            subText += ` at ${this.props.event.location.name}`;
        }

        const emailBody = encodeURI(`Hi There! ${subText}\n\nView your invite here: ${document.location.href}`)
        const emailSubject = encodeURI(`Phil @ EventsApp: You've been invited to ${this.props.event.name}!`);
        let emailLink = `mailto:?subject=${emailSubject}&body=${emailBody}`;

        let smsLinkItem = null;
        let whatsappItem = null;
        if(isMobileDevice()){
            let smsBody = encodeURI(`${emailBody}`);
            let smsLink = `sms:&body=${smsBody}`;
            smsLinkItem = (
                <li>
                    <a id="sms-link"
                        target="_self"
                        href={smsLink}>
                        Text Message
                    </a>
                </li>
            );
            let whatsappBody = decodeURI(smsBody);
            let whatsappLink = `https://wa.me/?text=${whatsappBody}`;
            whatsappItem = (
                <li>
                    <a id="whatsapp-link"
                        target="_self"
                        href={whatsappLink}>
                        WhatsApp
                    </a>
                </li>
            );

        };

        return (
            <div>
                <h5>Share Event</h5>
                <p>{subText}</p>
                <ul>
                    <li>
                        {/* eslint-disable-next-line */}
                        <a id="url-link"
                            onClick={() => this.copyToClipboard()}>
                            {this.state.copyLinkText}
                        </a>
                    </li>
                    <li>
                        <a id="email-link"
                            href={emailLink}>
                            Email
                        </a>
                    </li>
                    {smsLinkItem}
                    {whatsappItem}
                    {/* <li>
                        <a id="facebook-link"
                            href={facebookLink} 
                            target="_blank noopener noreferrer">
                            Facebook
                        </a>
                    </li>
                    <li>
                        <a id="twitter-link"
                            href={twitterLink}
                            target="_blank noopener noreferrer">
                            Twitter
                        </a>
                    </li>
                    <li>
                        <a id="twitter-link"
                            href={messengerLink}
                            target="_blank noopener noreferrer">
                            Messenger
                        </a>
                    </li>
                    <li>
                        <a id="whatsapp-link"
                            href={whatsappLink}
                            data-action="share/whatsapp/share">
                            WhatsApp
                        </a>
                    </li>
                    <li>
                        <a id="sms-link"
                            href={smsLink}>
                            Text Message
                        </a>
                    </li> */}
                </ul>
            </div>
        );
    }
 
};

export default ViewEventShare;