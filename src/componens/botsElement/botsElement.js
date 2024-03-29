import React, {useState} from 'react';
import style from './botsElement.module.sass';

import edit from '../../images/buttons/edit.png'
import trash from '../../images/buttons/trash.png';
import checkmark from '../../images/buttons/checkmark.png';
import cancel from '../../images/buttons/cancel.png';

import facebookIcon from '../../images/facebook-messenger-logo-big.png'
import telegramIcon from '../../images/telegram-icon-big.png'
import vkIcon from '../../images/vk-logo-big.png'
import whatsappIcon from '../../images/whatsapp-big.png'

import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createBot, deleteBot, editManager} from "../../actions/actionCreator";


const BotsElement = (props) => {
    const {id} = props;
    const [name, SetName] = useState(props.name)
    const [isEdit, setEdit] = useState(0);

    return (
        <li className={style.mainContainer}>
            {isEdit ? (
            <div className={style.nameContainer}>
                

                
                <input name="name" type="text" placeholder="Название" style={{fontSize: "27px", maxWidth: "75%"}} />
                <button className={style.bot_edit_btn+" bot-list__edit default-btn default-btn--icon-style default-btn--outline"} onClick={() => {
                    const new_name = document.querySelector('.'+style.nameContainer+' input[name=name]').value
                    props.editManager({
                        idBot: id,
                        name: new_name,
                        optional_params: ["name"]
                    });
                    SetName(new_name)
                    setEdit(0);
                }}>
                    <img src={checkmark} alt="Edit" className={style.btn_edit_img}/>
                    <span className="text-tooltip text-tooltip--top">Изменить</span>
                </button>
                <button className={style.bot_edit_btn+" bot-list__edit default-btn default-btn--icon-style default-btn--outline"} onClick={() => {
                    setEdit(0);
                }}>
                    <img src={cancel} alt="Edit" className={style.btn_edit_img}/>
                    <span className="text-tooltip text-tooltip--top">Отмена</span>
                </button>
            </div>
            ) : (
            <div className={style.nameContainer}>
                <h2>{name}</h2>
                <button className={style.bot_edit_btn+" bot-list__edit default-btn default-btn--icon-style default-btn--outline"} onClick={() => {
                    setEdit(1);
                }}>
                    <img src={edit} alt="Edit" className={style.btn_edit_img}/>
                    <span className="text-tooltip text-tooltip--top">Редактировать</span>
                </button>
            </div>
            )}
            <div className={style.socialContainer}>
                <img src={facebookIcon} alt="Facebook" />
                <img src={telegramIcon} alt="Telegram" />
                <img src={vkIcon} alt="Facebook" />
                <img src={whatsappIcon} alt="WhatsApp" />
            </div>
            <h2>Тестовый период заканчивается через <span>14 дней</span></h2>
            <div className={style.controls}>
                <Link to={`/bots/${id}/scenario`} className={style.link}>Изменить</Link>
                <img src={trash} alt="Delete" onClick={() => props.botCallback(name, id)}/>
            </div>

        </li>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteBot: (botData) => dispatch(deleteBot(botData)),
    editManager: (setupData) => dispatch(editManager(setupData))    
});

export default connect(null, mapDispatchToProps)(BotsElement);