import React, {useEffect} from 'react';
import style from '../bots/bots.module.sass';
import MainHeader from '../../componens/mainHeader/mainHeader';
import CreateBotForm from '../../componens/forms/createBotForm/createBotForm';
import {connect} from 'react-redux';
import {getAllBotsForUser} from "../../actions/actionCreator";
import BotsElement from '../../componens/botsElement/botsElement';

const Bots = (props) => {
    const {botsData} = props;

    useEffect(() => {
        props.getAllBots();
    }, [props.userData]);


    return (
        <div className={style.mainContainer}>
            <MainHeader
                isMainHeader={true}
            />
            <main className={style.botsMainContainer}>
                <CreateBotForm/>

                <ul className={style.bots}>
                    {
                        botsData && botsData.map(elem => (
                            <BotsElement
                                {...elem}
                            />
                        ))
                    }
                </ul>
            </main>
        </div>
    )
};

const mapStateToProps = state => {
    const {botsData, isFetching, error} = state.botsReducers;

    return {
        botsData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    getAllBots: () => dispatch(getAllBotsForUser())
});

export default connect(mapStateToProps, mapDispatchToProps)(Bots);