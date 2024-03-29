import React, {useEffect} from 'react';
import style from './setupSidebar.module.sass';
import {connect} from 'react-redux';
import {
editManager
} from '../../../actions/actionCreator';
import {
    getFacebookAuthUrl,
    getVkAuthUrl,
    getQRCodeUrl
} from "../../../api/rest/restContoller";
import {InputControler} from './inputControler';

const SetupSidebar = (props) => {
    const botId = props.botSetupData.id;

    useEffect(() => {
        if (document.getElementById("sidebar")!==undefined) {
            InputControler();
        }
    })

    return(
        <aside id="sidebar" className={style.setupSidebar}>
            <div className={style.groupBlock}>
                <p className={style.groupBlock__text}>Ваш пробный период заканчивается через 14 дней.<br/><a href="">ВЫБРАТЬ ТАРИФ</a></p>
            </div>
            <div className={style.ui_vmenu_sep}>
                <div className={style.ui_vmenu__title}>
                    <p className={style.ui_vmenu__item_p}>Добавить новый канал</p>
                </div>
                <form action=""className={style.ui_vmenu_sep_form}>
                    <label className={style.ui_vmenu__item +" "}>
                        <input type="radio" name="radio" value="fb" /><span className={style.ui_vmenu__item_span}>Facebook Messenger</span>
                    </label>
                    <label className={style.ui_vmenu__item +" "}>
                        <input type="radio" name="radio" value="telegram" /><span className={style.ui_vmenu__item_span}>Telegram</span>
                    </label>
                    <label className={style.ui_vmenu__item +" "}>
                        <input type="radio" name="radio" value="vk" /><span className={style.ui_vmenu__item_span}>Вконтакте</span>
                    </label>
                    <label className={style.ui_vmenu__item +" "}>
                        <input type="radio" name="radio" value="whatsapp" /><span className={style.ui_vmenu__item_span}>Whatsapp</span>
                    </label>
                    <div className="for-fb">
                        {props.botSetupData.facebook_name!=='' ? (
                        <p className={style.ui_vmenu__item_p}>{props.botSetupData.facebook_name}</p>
                        ) : (
                        <div>
                        <p className={style.ui_vmenu__item_p}>ШАГ 1: Авторизуйтесь через ваш Facebook аккаунт. Вы должны иметь права на управление страницами Facebook. <a href="">Подробнее.</a></p>
                        <button onClick={(e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append('user_token', localStorage.getItem('token'));
                            formData.append('manager_id', botId);
                            getFacebookAuthUrl(formData).then(result => {
                                if (result.data.url) {
                                    window.open(result.data.url);
                                }
                            });
                            }} className={style.ui_vmenu_sep_button}><span>АВТОРИЗОВАТЬСЯ</span>
                        </button>
                        </div>
                        )}
                        
                    </div>
                    <div className="for-telegram" style={{display: "none;"}}>
                        {props.botSetupData.telegram_name!=='' ? (
                            <p className={style.ui_vmenu__item_p}>{props.botSetupData.telegram_name}</p>
                        ) : (
                        <div>
                        <p className={style.ui_vmenu__item_p}>ШАГ 1: Введите токен доступа скрипт ниже. <a href="">узнаете больше</a> о том, как получить токен. </p>
                        <label className={style.ui_vmenu__item}>
                            <input type="text" name="token" placeholder="Token" className={style.telegram_input}/>
                        </label>
                        <button onClick={(e) => {
                            e.preventDefault();
                            props.editManager({
                                idBot: botId,
                                telegram_token: document.querySelector('input[name=token]').value,
                                optional_params: ["telegram_token"]
                            });
                                }
                            } className={style.ui_vmenu_sep_button}>
                                    <span>ПРОДОЛЖИТЬ</span>
                        </button>
                        </div>
                        )}
                        
                        
                    </div>
                    <div className="for-vk" style={{display: "none;"}}>
                        {props.botSetupData.vk_name!=='' ? (
                            <p className={style.ui_vmenu__item_p}>{props.botSetupData.vk_name}</p>
                        ) : (
                            <div>
                        <p className={style.ui_vmenu__item_p}>ШАГ 1: Подключите свой аккаунт Вконтакте. Вам нужно иметь права администратора.</p>
                        <button onClick={(e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append('user_token', localStorage.getItem('token'));
                            formData.append('manager_id', botId);
                            getVkAuthUrl(formData).then(result => {
                                if (result.data.ok) {
                                    window.open(result.data.url);
                                }
                            });
                            }} className={style.ui_vmenu_sep_button}><span>АВТОРИЗОВАТЬСЯ</span>
                            </button>
                            </div>
                            )}
                    </div>
                    <div className="for-whatsapp" style={{display: "none;"}}>
                        <p className={style.ui_vmenu__item_p}>ШАГ 1: Откройте WhatsApp Web, наведите свой телефон чтобы считать код</p>
                        <button onClick={(e) => {
                            e.preventDefault();
                            const formData = new FormData();
                            formData.append('user_token', localStorage.getItem('token'));
                            formData.append('manager_id', botId);
                            getQRCodeUrl(formData).then(result => {
                                if (result.data.ok) {
                                    props.qrcodeurl = result.data.url
                                }
                            });
                            }} className={style.ui_vmenu_sep_button}><span>ПОЛУЧИТЬ QR КОД</span>
                        </button>
                        <div><img src={props.qrcodeurl} alt="" width="100%"/></div>
                    </div>
                </form>
            </div>
        </aside>
    )
}

const mapStateToProps = state => {
    const {botSetupData, isFetching, error} = state.botSetupReducers;

    return {
        botSetupData, isFetching, error
    }
};

const mapDispatchToProps = dispatch => ({
    editManager: (setupData) => dispatch(editManager(setupData))
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupSidebar);
