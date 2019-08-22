import React, {useEffect} from 'react';
import style from './autoride.module.sass';
import Header from "../../componens/header/header";
import NavBar from '../../componens/navbar/navbar';
import {connect} from "react-redux";
import {getAllAutorides, getAllScenariesForBot} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import AutorideContainer from '../../componens/autorideContainer/autorideContainer';


const Autoride = (props) => {

    useEffect(() => {
        props.getAutorides(props.match.params.botId);
    }, []);

    return (
        <div className={style.mainContainer}>
            <Header/>
            <NavBar/>
            <div className={style.contentBlock}>
                <AutorideContainer/>
            </div>
        </div>
    )
};


const mapStateToProps = state => {
    const {autoridesData, isFetching, error} = state.autoridesReducers;

    return {
        autoridesData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    getAutorides: (botId) => dispatch(getAllAutorides(botId)),
    getScenaries: (botId) => dispatch(getAllScenariesForBot(botId))
});


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Autoride));