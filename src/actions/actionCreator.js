import ACTION from './actionTypes';


export const signUp = (signUpData, history) => ({
    type: ACTION.SIGN_UP_ACTION,
    signUpData,
    history
});

export const auth = (authData, history) => ({
    type: ACTION.AUTH_ACTION,
    authData,
    history
});

export const logout = (history) => ({
   type: ACTION.LOGOUT_ACTION,
   history
});

export const createBot = (createBotData) => ({
   type: ACTION.CREATE_BOT_ACTION,
   createBotData
});

export const deleteBot = (deleteBotData) => ({
   type: ACTION.DELETE_BOT_ACTION,
   deleteBotData
});

export const getAllBotsForUser = (botId) => ({
    type: ACTION.GET_ALL_BOTS_ACTION,
    botId
});

export const getAllScenariesForBot = (idBot) => ({
   type: ACTION.GET_ALL_SCENARIES,
    idBot
});

export const addNewScenario = (botId, destination, trigger_text) => ({
   type: ACTION.ADD_NEW_SCENARIO,
   botId,
    destination,
    trigger_text
});

export const changeScenarioId = (scenarioId) => ({
   type: ACTION.CHANGE_SCENARIO_ID,
   scenarioId
});

export const changeSocial = (social) => ({
   type: ACTION.CHANGE_SOCIAL,
   social
});

export const copyScenario = (scenarioData) => ({
   type: ACTION.COPY_SCENARIO,
   scenarioData
});

export const editScenario = (scenarioData) => ({
    type: ACTION.EDIT_SCENARIO,
    scenarioData
})

export const deleteScenario = (scenarioData) => ({
   type: ACTION.DELETE_SCENARIO,
    scenarioData
});

export const addNewTrigger = (triggerData) => ({
   type: ACTION.ADD_NEW_TRIGGER,
   triggerData
});

export const updateTrigger = (triggerData, updationData, changedSocial) => ({
   type: ACTION.UPDATE_TRIGGER,
   triggerData,
    updationData,
    changedSocial
});

export const deleteMessageInTrigger = (index) => ({
   type: ACTION.DELETE_MESSAGE_IN_TRIGGER,
   index
});

export const updateButtonsInTrigger = (triggerData) => ({
    type: ACTION.UPDATE_BUTTONS_IN_TRIGGER,
    triggerData
});

export const updateSocialInTrigger = (triggerData) => ({
   type: ACTION.UPDATE_SOCIAL_IN_TRIGGER,
    triggerData
});

export const getAllAutorides = (botId) => ({
   type: ACTION.GET_ALL_AUTORIDES,
   botId
});

export const getAutorideLinks = (autorideData) => ({
   type: ACTION.GET_AUTORDIDE_LINKS,
   autorideData
});

export const addNewAutoride = (managerId, trigger_text) => ({
    type: ACTION.APPEND_AUTORIDE,
    managerId,
    trigger_text
});

export const deleteAutoride = (managerId, idAutoride) => ({
   type: ACTION.DELETE_AUTORIDE,
   managerId,
   idAutoride
});

export const getAllBroadCasts = (managerId) => ({
   type: ACTION.GET_ALL_BROADCASTS,
   managerId
});

export const updateBroadCasts = (broadCastData) => ({
    type: ACTION.UPDATE_BROADCAST,
    broadCastData
});

export const appendBroadCast = (managerId) => ({
   type: ACTION.APPEND_BROADCAST,
   managerId
});


// setup

export const getManager = (idBot) => ({
   type: ACTION.GET_BOT_SETUP,
   idBot
});

export const editManager = (setupData) => ({
   type: ACTION.UPDATE_BOT_SETUP,
   setupData
});

export const getFacebookAuthUrl = (idBot) => ({
   type: ACTION.GET_FACEBOOK_AUTH_URL,
   idBot
});

export const getVkAuth = (idBot) => ({
   type: ACTION.GET_VK_AUTH_URL,
   idBot
});

export const getQRCodeUrl = (idBot) => ({
   type: ACTION.GET_WA_QR_URL,
   idBot
});