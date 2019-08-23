import React, {useState} from 'react';
import style from './broadCastContainer.module.sass';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {connect} from "react-redux";
import {ScenarioIdContext} from "../../utils/Contexts";
import TriggersContainer from "../scenariosAndTriggers/triggersContainer/triggersContainer";
import {addNewAutoride} from "../../actions/actionCreator";
import {withRouter} from "react-router-dom";
import moment from 'moment';


const AutorideContainer = (props) => {
    const [changedScenarioId, changeScenarioId] = useState(false);
    const [changedBroadCastId, changeBroadCastId] = useState(false);
    const [chanedTypeBroadcast, changeTypeBroadcast] = useState('sended');


    if(changedScenarioId) {
        return (
            <div className={style.triggersContainer}>
                <ScenarioIdContext.Provider value={changedScenarioId}>
                    <ScenarioIdContext.Consumer>
                        {scenarioId => (
                            <TriggersContainer
                                changedScenarioId={changedScenarioId}
                                scenarioId={scenarioId}
                                broadCastId={changedBroadCastId}
                            />
                        )}
                    </ScenarioIdContext.Consumer>
                </ScenarioIdContext.Provider>
            </div>
        )
    }

    const broadCastData = () => {
      if(chanedTypeBroadcast === 'sended') {
          return (
              props.broadCastData.map((elem, index) => {
                  if(elem.sent) {
                      return (
                          <tr>
                              <td className={style.keyWord} onClick={() => {
                                  changeScenarioId(elem.scenario.id);
                                  changeBroadCastId(index);
                              }}>
                                  Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>
                              </td>
                              <td>
                                  {elem.users_count}
                              </td>
                              <td className={style.controlsImages}>
                                  {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                              </td>
                          </tr>
                      )
                  }
              })
          );
      }else {
          return (
              props.broadCastData.map((elem, index) => {
                  if(!elem.sent) {
                      return (
                          <tr>
                              <td className={style.keyWord} onClick={() => {
                                  changeScenarioId(elem.scenario.id);
                                  changeBroadCastId(index);
                              }}>
                                  Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>
                              </td>
                              <td>
                                  {elem.users_count}
                              </td>
                              <td className={style.controlsImages}>
                                  {moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}
                              </td>
                          </tr>
                      )
                  }
              })
          )
      }
    };

    {/*<div className={style.mainContainer}>*/}
    {/*<div className={style.controls}>*/}
    {/*<div className={style.createButton}>Создать рассылку</div>*/}
    {/*<div className={style.infoBlock}>*/}
    {/*<FontAwesomeIcon icon={faInfoCircle}/>*/}
    {/*<div className={style.infoText}>*/}
    {/*<p>Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.</p>*/}
    {/*<p>Перейти в руководство</p>*/}
    {/*</div>*/}
    {/*</div>*/}
    {/*</div>*/}
    {/*<div className={style.scenariosContainer}>*/}
    {/*{*/}
    {/*props.broadCastData.map((elem, index) => (*/}
    {/*<div className={style.broadCastElement}>*/}
    {/*<h2*/}
    {/*onClick={() => {*/}
    {/*changeScenarioId(elem.scenario.id);*/}
    {/*changeBroadCastId(index);*/}
    {/*}}*/}
    {/*>*/}
    {/*{elem.scenario.trigger_text}*/}
    {/*</h2>*/}
    {/*<img src={trashImage} alt={'trash'} onClick={() => props.deleteScenario({*/}
    {/*botId: props.match.params.botId,*/}
    {/*idScenario: elem.id*/}
    {/*})}/>*/}
    {/*</div>*/}
    {/*))*/}
    {/*}*/}
    {/*</div>*/}
    {/*</div>*/}
    //
    // const newAutoride = () => {
    //     props.appendAutoride(props.match.params.botId);
    // };


    return (
        <div className={style.mainContainer}>
            <div className={style.controls}>
                <div className={style.createButton}>Создать рассылку</div>
                <div className={style.hardLine} />
                <div className={style.infoBlock}>
                    <FontAwesomeIcon icon={faInfoCircle}/>
                    <div className={style.infoText}>
                        <p>Ответы на популярные вопросы и уроки по настройке бота находятся в Руководстве.</p>
                        <span>Перейти в руководство</span>
                    </div>
                </div>
            </div>
            <div className={style.scenariosContainer}>
                <div className={style.inputContainer}>
                    <h2>Рассылка</h2>
                    <ul className={style.navbar}>
                        <li
                            onClick={() => changeTypeBroadcast('sended')}
                            className={chanedTypeBroadcast === 'sended' ? style.navElementActive : style.navElement}
                        >
                            Отправленные
                        </li>
                        <li
                            onClick={() => changeTypeBroadcast('ordered')}
                            className={chanedTypeBroadcast === 'sended' ? style.navElement : style.navElementActive}>
                            Отложенные
                        </li>
                    </ul>
                </div>
                <table>
                    <tr>
                        <td>Сообщение</td>
                        <td>Получателей</td>
                        <td>Дата</td>
                    </tr>
                    {broadCastData()}
                    {/*{*/}
                        {/*props.broadCastData.map((elem, index) => (*/}
                            {/*<tr>*/}
                                {/*<td className={style.keyWord} onClick={() => {*/}
                                    {/*changeScenarioId(elem.scenario.id);*/}
                                    {/*changeBroadCastId(index);*/}
                                {/*}}>*/}
                                    {/*Сообщение в точности совпадает с <span>{elem.scenario.trigger_text}</span>*/}
                                {/*</td>*/}
                                {/*<td>*/}
                                    {/*{elem.users_count}*/}
                                {/*</td>*/}
                                {/*<td className={style.controlsImages}>*/}
                                    {/*{moment(elem.time * 1000).format('YYYY-MM-DD hh:mm')}*/}
                                {/*</td>*/}
                            {/*</tr>*/}
                        {/*))*/}
                    {/*}*/}
                </table>

            </div>
        </div>
    )
};

const mapStateToProps = state => {
    const {broadCastData, isFetching, error} = state.broadCastReducers;

    return {
        broadCastData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    appendAutoride: (managerId) => dispatch(addNewAutoride(managerId))
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AutorideContainer));