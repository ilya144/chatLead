import React from 'react';
import style from './contextMenu.module.sass';
import {buttonsTypes, defaultValuesForNewButtons} from "../../../../constants/defaultValues";
import {connect} from "react-redux";
import onClickOutside from "react-onclickoutside";
import Actions from '../actions/actions';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Select from 'react-select'
import Controls from './controls/controls';



const ContextMenu = (props) => {
    const {
        buttonEditHandler,
        typeButton,
        scenarioId,
        indexButton,
        buttonData,
        setIndexOpenButton,
        styleForContextMenu,
        changedTrigger
    } = props;
    const changedScenario = props.botScenarios.filter(elem => elem.id === scenarioId)[0];
    const changedTriggerInFastButton = typeButton === buttonsTypes.fast_buttons && (
        changedScenario.triggers.filter(elem => elem.id === buttonData.payload.trigger_id)[0]
    );

    const editButton = (e, forCaption) => {


        if(typeButton === buttonsTypes.text_buttons) {
            Object.assign(buttonData, {
                caption: e.target.value
            })
        }else if(typeButton === buttonsTypes.url_buttons) {
            if(forCaption) {
                Object.assign(buttonData, {
                    caption: e.target.value
                })
            }else {
                Object.assign(buttonData, {
                    url: e.target.value
                })
            }
        }else if(typeButton === buttonsTypes.fast_buttons) {
            if(forCaption) {
                Object.assign(buttonData, {
                    caption: e.target.value
                })
            }else {
                Object.assign(buttonData, {
                    payload: {
                        trigger_id: e.target.value
                    }
                })
            }

        }


        buttonEditHandler(typeButton, buttonData, indexButton);
    };

    const getBotScenarios = () => {
      const botScenarios = [];

      props.botScenarios.forEach(elem => {
          botScenarios.push({
              value: elem.trigger_text,
              label: elem.trigger_text
          })
      });

        return botScenarios;
    };

    const getTriggers = () => {
        const triggers = [];

        changedScenario.triggers.map(trigger => {
            triggers.push({
                value: trigger.id,
                label: trigger.caption
            })
        });

        return triggers;
    };

    const stylesForSelector = {
        control: (styles, state) => ({
            ...styles,
            boxShadow: '0 !important',
            cursor: 'pointer',
            '&:hover': {
                border: '2px solid #bdcadd !important'
            },
            border: '2px solid #bdcadd',
            borderRadius: '10px 0 0 10px',
            height: '100%',
            background: '#f1f3f5'
        }),
        option: (styles, { data, isDisabled, isFocused, isSelected }) => {
            return {
                ...styles,
                color: '#000',
                backgroundColor: isSelected ? '#f4f3f5' : 'white',
                cursor: 'pointer',
                borderRadius: '0'
            };
        }
    };



    const buttonChanger = () => {
        if(typeButton === 'empty') {
            return (
                <>
                    <div className={style.header}>
                        Редактировать кнопку
                    </div>
                    <h2>Типы кнопок: </h2>
                    <div className={style.buttonChanger}>
                        <div
                            onClick={() => {
                                buttonEditHandler(
                                    buttonsTypes.text_buttons,
                                    defaultValuesForNewButtons[buttonsTypes.text_buttons],
                                    indexButton
                                )
                            }}
                            className={style.changerElement}
                        >
                            Отправить сообщение
                        </div>
                        <div
                            onClick={() => {
                                buttonEditHandler(
                                    buttonsTypes.url_buttons,
                                    defaultValuesForNewButtons[buttonsTypes.url_buttons],
                                    indexButton
                                )
                            }}
                            className={style.changerElement}
                        >
                            Открыть веб-сайт
                        </div>

                        {
                            (changedTrigger.social === 'telegram' || changedTrigger.social === 'facebook') && (
                                <div
                                    onClick={() => {
                                        buttonEditHandler(
                                            buttonsTypes.fast_buttons,
                                            defaultValuesForNewButtons[buttonsTypes.fast_buttons],
                                            indexButton
                                        )
                                    }}
                                    className={style.changerElement}
                                >
                                    Перейти на другой тригер
                                </div>
                            )
                        }

                        <Actions
                            {...props}
                        />
                        <Controls
                            {...props}
                        />
                    </div>
                </>
            )
        }else if(typeButton === buttonsTypes.text_buttons) {
            return (
                <>
                    <div className={style.header}>
                        Редактировать кнопку
                    </div>
                    <div className={style.buttonChanger}>
                        {
                            buttonData.caption && (
                                <>
                                    <h2>Заголовок кнопки:</h2>
                                    <input
                                        type={'text'}
                                        defaultValue={buttonData.caption}
                                        placeholder={'title'}
                                        disabled={true}
                                    />
                                </>
                            )
                        }
                        <h2>Выберите команду:</h2>
                        <div className={style.inputContainer}>
                            <Select
                                placeholder={'Команда'}
                                options={getBotScenarios()}
                                defaultValue={buttonData.caption && {
                                    value: buttonData.caption,
                                    label: buttonData.caption
                                }}
                                onChange={(value) => editButton({
                                    target: {
                                        value: value.value
                                    }
                                })}
                                styles={stylesForSelector}
                                className={style.selector}
                                isSearchable={false}
                                components={{ DropdownIndicator:() => null }}
                                // arrowRenderer={() => ''}
                            />
                            <div
                                className={style.closeButton}
                                onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                                    caption: ''
                                }), indexButton, true)}
                            >
                                <FontAwesomeIcon icon={faTimes}/>
                            </div>
                        </div>
                        <Actions
                            {...props}
                        />
                        <Controls
                            {...props}
                        />

                    </div>
                </>
            )
        }else if(typeButton === buttonsTypes.url_buttons) {
            return (
                <>
                    <div className={style.header}>
                        Редактировать кнопку
                    </div>
                    <div className={style.buttonChanger}>
                        <h2>Заголовок кнопки</h2>
                        <input
                            type={'text'}
                            defaultValue={buttonData.caption}
                            placeholder={'title'}
                            onInput={(e) => editButton(e, true)}
                        />
                        <div className={style.inputContainer}>
                            <div className={style.closedButton}>Открыть веб-сайт</div>
                            <div
                                className={style.closeButton}
                                onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                                    caption: ''
                                }), indexButton, true)}
                            >
                                <FontAwesomeIcon icon={faTimes}/>
                            </div>
                        </div>
                        <h2>Адрес веб-сайта</h2>
                        <input
                            type={'text'}
                            placeholder={'URL'}
                            defaultValue={buttonData.url}
                            onInput={editButton}
                        />

                        <Actions
                            {...props}
                        />
                        <Controls
                            {...props}
                        />
                    </div>
                </>
            )
        }else if(typeButton === buttonsTypes.fast_buttons) {
           return (
              <>
                  <div className={style.header}>
                      Редактировать кнопку
                  </div>
                  <div className={style.buttonChanger}>
                      <h2>Заголовок кнопки</h2>
                      <input
                          type={'text'}
                          defaultValue={buttonData.caption}
                          title={'title'}
                          onInput={(e) => editButton(e, true)}
                      />
                      <div className={style.inputContainer}>
                          <Select
                              placeholder={'Триггер'}
                              options={getTriggers()}
                              defaultValue={buttonData.payload.trigger_id && {
                                  value: buttonData.payload.trigger_id,
                                  label: changedTriggerInFastButton.caption
                              }}
                              onChange={(value) => editButton({
                                  target: {
                                      value: value.value
                                  }
                              })}
                              styles={stylesForSelector}
                              className={style.selector}
                              isSearchable={false}
                              components={{ DropdownIndicator:() => null }}
                              // arrowRenderer={() => ''}
                          />
                          <div
                              className={style.closeButton}
                              onClick={() => buttonEditHandler(typeButton, Object.assign(buttonData, {
                                  caption: ''
                              }), indexButton, true)}
                          >
                              <FontAwesomeIcon icon={faTimes}/>
                          </div>
                      </div>
                      <Actions
                          {...props}
                      />
                      <Controls
                          {...props}
                      />
                  </div>
              </>
           )

        }
    };

    ContextMenu.handleClickOutside = () => setIndexOpenButton(false);


    return (
        <div className={style.mainContainer} style={styleForContextMenu}>
            {
                buttonChanger()
            }
        </div>
    )
};

const clickOutsideConfig = {
    handleClickOutside: () => ContextMenu.handleClickOutside
};

const mapStateToProps = state => {
    const {botScenarios, isFetching, error} = state.singleBotReducers;

    return {
        botScenarios, isFetching, error
    }
};

export default onClickOutside(connect(mapStateToProps)(ContextMenu), clickOutsideConfig);