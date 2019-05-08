import React , { Component } from 'react';
import { Helmet } from 'react-helmet';
import './ViewEvent.scss';

import ViewEventImage from './ViewEventImage/ViewEventImage';
import ViewEventHeaderControls from './ViewEventHeaderControls/ViewEventHeaderControls';
import ViewEventFooterControls from './ViewEventFooterControls/ViewEventFooterControls';
import ViewEventContent from './ViewEventContent/ViewEventContent';
import ViewEventSidebar from './ViewEventSidebar/ViewEventSidebar';
import ViewEventShare from './ViewEventShare/ViewEventShare';
import ViewEventSave from './ViewEventSave/ViewEventSave';

import Modal from '../_shared/Modal/Modal';

class ViewEvent extends Component {

    state = {
        showModal: false,
        modalTemplate: null,
        metaTags: null
    }

    onShare = () => {
        this.setState({
            showModal: true,
            modalTemplate: <ViewEventShare></ViewEventShare>
        })
    }

    onSave = () => {
        this.setState({
            showModal: true,
            modalTemplate: <ViewEventSave></ViewEventSave>
        })
    }

    onCloseModal = () => {
        this.setState({
            showModal: false,
            modalTemplate: null
        })
    }



    render() {

        return (
            <React.Fragment>

                <Helmet>
                    <title>The Strokes @ All Points East</title>
                    <meta property="og:title" content="The Strokes @ All Points East" />
                    <meta property="og:url" content="https://eventsapp.co.uk/event/2323" />
                    <meta property="og:description" content="23rd March 18:00 at Victoria Park, London, W4 2NL" />
                    <meta property="fb:app_id" content="1846350962106408" />
                    <meta property="og:image" content="https://static.spin.com/files/130816_strokes-640x426.jpg" />  
                </Helmet>

                <ViewEventHeaderControls
                    onShare={() => this.onShare()}
                    onSave={() => this.onSave()}>
                </ViewEventHeaderControls>

                <ViewEventImage></ViewEventImage>

                <div className="view-event__row">
                    <ViewEventContent></ViewEventContent>
                    <ViewEventSidebar
                        onSave={() => this.onSave()}>
                    </ViewEventSidebar>
                </div>

                <ViewEventFooterControls
                    onSave={() => this.onSave()}>
                </ViewEventFooterControls>

                <Modal
                    showModal={this.state.showModal}
                    onCloseModal={() => this.onCloseModal()}>
                    {this.state.modalTemplate}
                </Modal>

            </React.Fragment>
        );
    } 
};

export default ViewEvent;