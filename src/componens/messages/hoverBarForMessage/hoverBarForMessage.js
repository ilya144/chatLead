import React from 'react';
import style from './hoverBarForMessage.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowsAltV, faTimes} from "@fortawesome/free-solid-svg-icons";
import {faClone} from "@fortawesome/free-regular-svg-icons";
import {connect} from 'react-redux';
import {updateTrigger} from "../../../actions/actionCreator";
import {withRouter} from "react-router-dom";


const HoverBarForMessage = (props) => {
    const {styleForBar, statusDraggable, index, changedTrigger} = props;

    const deleteMessage = () => {
        const messagesCopy = changedTrigger.messages.concat();

        messagesCopy.splice(index, 1);

        const updatedTrigger = {
            ...changedTrigger,
            index: index,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        props.updateTrigger(updatedTrigger);
    };

    const cloneMessage = () => {
        const messagesCopy = changedTrigger.messages.concat();

        messagesCopy.splice(index, 0, messagesCopy[index]);

        const updatedTrigger = {
            ...changedTrigger,
            index: index,
            messages: messagesCopy,
            botId: props.match.params.botId
        };
        props.updateTrigger(updatedTrigger);
    };
    //
    // const dragStartHandler = (e) => {
    //     console.log(e.pageX, e.pageY);
    // };

    // const mousemoveHanlder = (e) => {
    //     console.log(e.pageX, e.pageY)
    // };
    //
    // const dragStartHander = (e) => {
    //
    //     document.addEventListener("mousemove", mousemoveHanlder);
    // };
    //
    // const deleteListener = () => {
    //     document.removeEventListener('mousemove', mousemoveHanlder);
    // };

    return (
        <div className={style.mainContainer} style={styleForBar}>
            <p onClick={deleteMessage}><FontAwesomeIcon icon={faTimes}/></p>
            <p
                // onDragStart={() => console.log(1)}
                // onDragEnd={() => console.log(2)}
                // onDragStart={(e) => statusDraggable(true)}
                // onDragOver={(e) => console.log(e.pageX, e.pageY)}
                // onDragEnd={() => statusDraggable(false)}
            >
                <FontAwesomeIcon icon={faArrowsAltV}/>
            </p>
            <p onClick={cloneMessage}><FontAwesomeIcon icon={faClone}/></p>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    updateTrigger: (triggerData) => dispatch(updateTrigger(triggerData)),
});


export default withRouter(connect(null, mapDispatchToProps)(HoverBarForMessage));