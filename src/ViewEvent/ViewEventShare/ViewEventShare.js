import React from 'react';
import './ViewEventShare.scss';

const ViewEventShare = () => {
    return (
        <div>
            <h5>Share Event</h5>
            <p>Check out this event on EventsApp: The Strokes @ All Points East at Victoria Park</p>
            <ul>
                <li>
                <a id="facebook-Link"
                    href="https://www.facebook.com/dialog/share?app_id=1846350962106408&display=popup&href=https://massive-tiger-97.localtunnel.me/event/123&redirect_uri=https://localhost:3000/" 
                    target="_blank">
                    Facebook
                </a>
                </li>
            </ul>
        </div>
    );
};

export default ViewEventShare;