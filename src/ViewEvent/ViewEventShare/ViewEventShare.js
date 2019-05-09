import React from 'react';
import './ViewEventShare.scss';

const ViewEventShare = () => {

    let eventName = 'The Strokes @ All Points East';
    let eventUrl = 'http://dev.eventsapp.co.uk/event/123';
    let eventLocation = 'Victoria Park, London, London, NW6 6NH';
    let eventDate = '24th March 18:00 - Late';
    let eventImage = 'https://static.spin.com/files/130816_strokes-640x426.jpg';


    let twitterLink = `https://twitter.com/intent/tweet?text=${eventName} (${eventDate}) at ${eventLocation}&url=${eventUrl}`;
    let facebookLink = `https://www.facebook.com/dialog/share?app_id=1846350962106408&display=page&href=eventsapp.co.uk&redirect_uri=https://localhost:3000/`;
    
    
    let messengerLink = `fb-messenger://share?link=${eventUrl}`;
    messengerLink = `https://www.facebook.com/dialog/send?app_id=1846350962106408&link=eventsapp.co.uk&redirect_uri=https://localhost:3000/`;

    let whatsappLink = `whatsapp://send?text=The text to share!`;
    let emailLink = `mailto:?subject=your%20subject&body=your%20body`;
    let smsLink = `sms:;body=example body`;

    let urlLink = ``;
    let embedLink = ``;

    return (
        <div>
            <h5>Share Event</h5>
            <p>Check out this event on EventsApp: The Strokes @ All Points East at Victoria Park</p>
            <ul>
                <li>
                    <a id="facebook-link"
                        href={facebookLink} 
                        target="_blank">
                        Facebook
                    </a>
                </li>
                <li>
                    <a id="twitter-link"
                        href={twitterLink}
                        target="_blank">
                        Twitter
                    </a>
                </li>
                <li>
                    <a id="twitter-link"
                        href={messengerLink}
                        target="_blank">
                        Messenger
                    </a>
                </li>
                <li>
                    <a id="email-link"
                        href={emailLink}>
                        Email
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
                </li>
                <li>
                    <a id="url-link"
                        href={urlLink}>
                        Copy URL
                    </a>
                </li>
            </ul>
        </div>
    );
};

export default ViewEventShare;