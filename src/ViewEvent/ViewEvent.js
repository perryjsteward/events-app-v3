import React , { Component } from 'react';
import { Helmet } from 'react-helmet';
import './ViewEvent.scss';

// state
import * as actions from '../_store/actions';
import { connect } from 'react-redux';

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

    componentDidMount = () => {
        if(this.props.match && this.props.match.params.eventId){
            this.props.onReadEvent(this.props.match.params.eventId);
        } else {
            // redirect or show error
        }
        
    }

    onShare = () => {
        this.setState({
            showModal: true,
            modalTemplate: <ViewEventShare location={this.props.location}></ViewEventShare>
        })
    }

    onSave = () => {
        this.setState({
            showModal: true,
            modalTemplate: <ViewEventSave event={this.props.event}></ViewEventSave>
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
                    {/* <title>{this.props.event.name}</title>
                    <meta property="og:title" content={this.props.event.name} /> */}
                    {/* <meta property="og:url" content="https://eventsapp.co.uk/event/2323" />
                    <meta property="og:description" content={this.state.event.location.address} />
                    <meta property="fb:app_id" content="1846350962106408" />
                    <meta property="og:image" content="https://static.spin.com/files/130816_strokes-640x426.jpg" />   */}
                </Helmet>

                <ViewEventHeaderControls
                    onShare={() => this.onShare()}
                    onSave={() => this.onSave()}>
                </ViewEventHeaderControls>

                <ViewEventImage event={this.props.event}></ViewEventImage>

                <div className="view-event__row">
                    <ViewEventContent event={this.props.event}></ViewEventContent>
                    <ViewEventSidebar
                        event={this.props.event}
                        onSave={() => this.onSave()}>
                    </ViewEventSidebar>
                </div>

                <ViewEventFooterControls
                    event={this.props.event}
                    onSave={() => this.onSave()}>
                </ViewEventFooterControls>

                <Modal
                    event={this.props.event}
                    showModal={this.state.showModal}
                    onCloseModal={() => this.onCloseModal()}>
                    {this.state.modalTemplate}
                </Modal>

            </React.Fragment>
        );
    } 
};

const mapStateToProps = state => {
    return {
        event: state.event,
        readSuccess: state.readSuccess,
        readError: state.readError
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onReadEvent: id => dispatch( actions.readEvent(id) )
    };
  };

export default connect( mapStateToProps, mapDispatchToProps )(ViewEvent);