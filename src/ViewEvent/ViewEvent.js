import React , { Component } from 'react';
import ViewEventHeaders from './ViewEventHeaders/ViewEventHeaders';
import './ViewEvent.scss';
import { withRouter } from 'react-router-dom';
// state
import * as actions from '../_store/actions';
import { connect } from 'react-redux';
import ReactGA from 'react-ga';

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

    constructor(props){
        super(props)
        this.props.history.listen((location, action) => {
            if(this.props.match && this.props.match.params.eventId){
                this.props.onReadEvent(this.props.match.params.eventId);
            } 
        });
    }

    componentDidMount = () => {
        if(this.props.match && this.props.match.params.eventId){
            this.props.onReadEvent(this.props.match.params.eventId);
        } 
    }


    onShare = () => {
        this.setState({
            showModal: true,
            modalTemplate: (
                <ViewEventShare event={this.props.event}></ViewEventShare>
            )
        })
        ReactGA.event({
            category: 'View Event',
            action: 'Opened Share Dialog'
        });
    }

    onSave = () => {
        this.setState({
            showModal: true,
            modalTemplate: (
                <ViewEventSave 
                    onAddToCalendar={() => this.incrementAttendees()}
                    event={this.props.event}>
                </ViewEventSave>
            )
        })
        ReactGA.event({
            category: 'View Event',
            action: 'Opened Save Dialog'
        });
    }

    incrementAttendees = () => {
        const currEvent = { ...this.props.event };
        const newEvent = {
            ...currEvent,
            attending: currEvent.attending + 1
        }
        this.props.onAddToCalendar(this.props.match.params.eventId, newEvent);
        ReactGA.event({
            category: 'View Event',
            action: 'Saved To Calendar'
        });
    }

    onCloseModal = () => {
        this.setState({
            showModal: false,
            modalTemplate: null
        })
    }

    render() {

        if(this.props.event) {
            ReactGA.pageview(`/event/${this.props.event.id}`);
        }
       
        return (
            <React.Fragment>
                <ViewEventHeaders event={this.props.event}></ViewEventHeaders>

                <ViewEventHeaderControls
                    onShare={() => this.onShare()}
                    onSave={() => this.onSave()}>
                </ViewEventHeaderControls>

                <ViewEventImage event={this.props.event}></ViewEventImage>

                <div className="view-event__row">
                    <ViewEventContent 
                        id={this.props.match.params.eventId}
                        event={this.props.event}>
                    </ViewEventContent>
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
        event: state.event
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
        onReadEvent: id => dispatch( actions.readEvent(id) ),
        onAddToCalendar: (id, event) => dispatch( actions.updateEvent(id, event))
    };
  };

export default withRouter(connect( mapStateToProps, mapDispatchToProps )(ViewEvent));